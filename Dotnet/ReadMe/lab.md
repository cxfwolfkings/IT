# 实验室管理系统总结

## 目录

1. [mvc](mvc)
   - [过滤器](#过滤器)
   - [登录](#登录)
   - [公用方法](#公用方法)
2. [EF Core](#EFCore)
   - [数据库上下文](#数据库上下文)
   - [工作单元](#工作单元)
   - [仓储](#仓储)
   - [领域模型](#领域模型)
   - [领域服务](#领域服务)
   - [应用服务](#应用服务)
3. [MemoryCache](#MemoryCache)
   - [本机缓存](#本机缓存)
   - [分布式缓存](#分布式缓存)
     - [Redis](#Redis)
       - [StackExchange.Redis](#StackExchange.Redis)
4. [前端vue](#前端vue)
5. [部署](#部署)

## mvc

### 过滤器

- 异常过滤器

```C#
public class LaboratoryAuthorizeFilter : IAuthorizationFilter
{
    /// <summary>
    /// 判断是否Ajax请求，jQuery有效，
    /// Vue、Angular等要手动在请求头中添加标识
    /// </summary>
    /// <param name="filterContext"></param>
    /// <returns></returns>
    private bool IsAjax(ActionExecutingContext filterContext)
    {
        if (filterContext == null)
        {
            throw new ArgumentNullException("filterContext");
        }
        return filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
    }

    /// <summary>
    /// 判断是否不需要权限
    /// </summary>
    /// <param name="filers"></param>
    /// <returns></returns>
    private static bool IsHaveAllow(IList<IFilterMetadata> filers)
    {
        for (int i = 0; i < filers.Count; i++)
        {
            if (filers[i] is IAllowAnonymousFilter)
            {
                return true;
            }
        }
        return false;
    }

    /// <summary>
    ///  请求验证
    /// </summary>
    /// <param name="context">请求内容信息</param>
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (IsHaveAllow(context.Filters))
        {
            return;
        }
        int status = context.HttpContext.Response.StatusCode;
        // 检测是否包含'Authorization'请求头
        if (!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
        {
            throw new Exception("请先登录系统！");
        }
        // 通过ActionContext类的RouteData属性获取Controller的名称：Home
        string controllerName = context.RouteData.Values["Controller"].ToString();
        // 通过ActionContext类的RouteData属性获取Action的名称：Index
        string actionName = context.RouteData.Values["Action"].ToString();
        /**
         *  通过ActionContext类的ActionDescriptor属性，也可以获取Action的名称
         *  不过这样获取到的是Action的完全限定名：
         *  AspNetCoreFilterContext.Controllers.HomeController.Index (AspNetCoreFilterContext)，
         *  可以看到其中还包含Controller的类名、命名空间和程序集名称
         */
        string fullActionName = context.ActionDescriptor.DisplayName;

        // 解析url
        var url = context.HttpContext.Request.Path.Value;
        if (string.IsNullOrWhiteSpace(url))
        {
            return;
        }
        var list = url.Split("/");
        if (list.Length <= 0 || url == "/")
        {
            return;
        }
        controllerName = list[1].ToString().Trim();
        actionName = list[2].ToString().Trim();
    }
}
```

- 异常过滤器

```C#
public class LaboratoryExceptionFilter : IExceptionFilter
    {
        private LogHelper logger = new LogHelper();

        public void OnException(ExceptionContext context)
        {
            string message = string.Format("消息类型：{0}\t\n消息内容：{1}\t\n引发异常的方法：{2}\t\n引发异常源：{3}"
                , context.Exception.GetType().Name
                , context.Exception.Message
                 , context.Exception.TargetSite
                 , context.Exception.Source + context.Exception.StackTrace
                 );
            logger.Error(context.Exception.GetType(), message);

            // 分别处理common request和ajax request
            if (LabHelper.IsAjax(context.HttpContext))
            {
                // Because its a exception raised after ajax invocation, Lets return Json
                context.Result = new JsonResult(new ResultViewModel
                {
                    Msg = context.Exception.Message,
                    Code = (int)HttpStatusCode.InternalServerError
                });
                context.ExceptionHandled = true;
                context.HttpContext.Response.Clear();
            }
            else
            {
                // 重定向到错误页面
                context.ExceptionHandled = true;
                context.Result = new RedirectResult("~/Error/Error?msg=" + HttpUtility.UrlEncode("系统发生未知错误，请稍后重试。如果错误持续发生，请联系IT Service Desk:  +86-21-28922999转1。"));
            }
        }
    }
```

### 登录

- 生成token码（待验证）

```C#
// push the user's name into a claim, so we can identify the user later on.
var claims = new[] { new Claim(ClaimTypes.Name, username) };
// sign the token using a secret key.This secret will be shared between your API and anything that needs to check that the token is legit.
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
// .NET Core's JwtSecurityToken class takes on the heavy lifting and actually creates the token.
var token = new JwtSecurityToken(
    issuer: _configuration["JWT:Issuer"],
    audience: _configuration["JWT:Audience"],
    claims: claims,
    expires: DateTime.Now.AddSeconds(5),
    signingCredentials: creds);
string jwtStr = new JwtSecurityTokenHandler().WriteToken(token);
```

- 登录方法

```C#
[Route("Login")]
[HttpPost]
[AllowAnonymous]
public ActionResult Login([FromForm]string username, [FromForm]string password)
{
    if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
    {
        throw new Exception("用户名或密码不能为空！");
    }
    AccountViewModel accountViewModel = _accountService.GetAcount(username, password);

    // 将用户id和角色名，作为单独的自定义变量封装进 token 字符串中。
    TokenModelJwt tokenModel = new TokenModelJwt { Uid = accountViewModel.Id, Role = accountViewModel.Role.RoleName };
    string jwtStr = JwtHelper.IssueJwt(tokenModel);//登录，获取到一定规则的 Token 令牌

    // 将登录信息保存到session中
    // HttpContext.Session.SetString("Account", JsonHelper.GetJSON<AccountViewModel>(accountViewModel));
    return Ok(new ResultViewModel
    {
        Code = 200,
        Data = new
        {
            token = jwtStr,
            profile = accountViewModel
        }
    });
}
```

- 权限控制示例

```C#
[Route("AddAssetModel")]
[HttpPost]
[Authorize(Roles = "系统管理员,实验室管理员")]
public ActionResult AddAssetModel([FromForm]AssetModelInputDto input)
{
    _assetService.AddAssetModel(input);
    return Ok(new ResultViewModel
    {
        Code = (int)HttpStatusCode.OK
    });
}
```

### 公用方法

```C#
/// <summary>
/// 判断是否Ajax请求，jQuery有效，
/// Vue、Angular等要手动在请求头中添加标识
/// </summary>
/// <param name="context"></param>
/// <returns></returns>
public static bool IsAjax(HttpContext context)
{
    return context.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
}
```

## EFCore

### 数据库上下文

```C#
/// <summary>
/// 数据库上下文
/// </summary>
public class LaboratoryDbContext : DbContext
{
    public DbSet<Account> Accounts { get; set; } // 账号信息
    public DbSet<LaboratoryEntity> Laboratories { get; set; } // 实验室
    public DbSet<AssetCategory> AssetCategories { get; set; } // 固定资产类别
    // ...

    /// <summary>
    /// 配置时
    /// </summary>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // 从 appsetting.json 中获取配置信息
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        // 延迟加载使用 MySQL 数据库
        optionsBuilder.UseLazyLoadingProxies().UseMySql(config.GetConnectionString("DefaultConnection"));
    }

    /// <summary>
    /// 模型创建时
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder) 
    {
        // 应用设置
        modelBuilder.ApplyConfiguration(new LabAdminMap());
        // 创建数据
        modelBuilder.Entity<Account>().HasData(
            new Account { 
                Id = 1, 
                AccountNo = "00000", 
                AccountName = "Admin", 
                Password = MD5Helper.MD5Encrypt32("123456"), 
                RecentLogin = DateTime.Parse("2019-08-01"), 
                DepartmentNo = (int)Dept.Electrical + "" },
            new Account { 
                Id = 2, 
                AccountNo = "-00001", 
                AccountName = "User1", 
                Password = MD5Helper.MD5Encrypt32("123456"), 
                RecentLogin = DateTime.Parse("2019-08-01"), 
                DepartmentNo = (int)Dept.Electrical + "" },
        );
        // 调用基类方法
        base.OnModelCreating(modelBuilder);
    }
}

/// <summary>
/// 实验室管理员表的具体设置
/// </summary>
public class LabAdminMap : IEntityTypeConfiguration<LaboratoryAdmin>
{
    public void Configure(EntityTypeBuilder<LaboratoryAdmin> builder)
    {
        // 创建外键
        builder.HasOne(m => m.AdminUser)
            .WithMany(m => m.AdminUsers)
            .HasForeignKey(m => m.AdminAccountId);
        // 创建外键
        builder.HasOne(m => m.Laboratory)
            .WithMany(m => m.AdminLabs)
            .HasForeignKey(m => m.LaboratoryId);
        // 创建索引
        builder.HasKey(m => new { m.AdminAccountId, m.LaboratoryId });
        // 应用到表
        builder.ToTable("bas_lab_admin");
    }
}
```

### 工作单元

```C#
/// <summary>
/// 工作单元接口
/// </summary>
public interface IUnitOfWork : IDisposable
{
    // 数据库上下文
    DbContext DbContext { get; }
    // 是否提交成功
    bool Commit();
}

/// <summary>
/// 工作单元类
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    // 数据库上下文实例
    public DbContext DbContext { get; }
    // 构造函数注入
    public UnitOfWork(LaboratoryDbContext context)
    {
        DbContext = context;
    }
    // 上下文提交
    public bool Commit()
    {
        return DbContext.SaveChanges() > 0;
    }
    // 垃圾回收
    public void Dispose()
    {
        DbContext.Dispose();
        GC.SuppressFinalize(this);
    }
}
```

### 仓储

```C#
/// <summary>
/// 定义泛型仓储接口，并继承IDisposable，显式释放资源
/// </summary>
/// <typeparam name="TEntity"></typeparam>
public interface IRepository<TEntity> where TEntity : class
{
    // 添加
    TEntity Add(TEntity obj, bool IsCommit = true);
    // 根据id获取对象
    TEntity GetById(long id);
    // 获取列表
    IQueryable<TEntity> GetAll();
    // 获取列表（数据跟踪：内存和数据库的连接未断）
    IQueryable<TEntity> GetAllAsTracking();
    // 根据对象进行更新
    void Update(TEntity obj, bool IsCommit = true);
    // 更新多项
    void UpdateRange(IEnumerable<TEntity> objs, bool IsCommit = true);
    // 根据id删除
    void Remove(long id, bool IsCommit = true);
    // 查询列表
    IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
    // 查询单项
    TEntity FindOne(Expression<Func<TEntity, bool>> predicate);
    // 判断是否存在
    bool Exists(Expression<Func<TEntity, bool>> predicate);
    // 添加多项
    void AddRange(IEnumerable<TEntity> objs, bool IsCommit = true);
    // 添加多项（异步）
    Task AddRangeAsync(IEnumerable<TEntity> objs, bool IsCommit = true);
    void Remove(TEntity obj, bool IsCommit = true);
    void RemoveRange(IEnumerable<TEntity> entities, bool IsCommit = true);
}

/// <summary>
/// 泛型仓储，实现泛型仓储接口
/// </summary>
/// <typeparam name="TEntity"></typeparam>
public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    protected readonly LaboratoryDbContext Db;
    // 仓储容器
    protected readonly DbSet<TEntity> DbSet;
    protected IUnitOfWork UnitOfWork;

    public Repository(IUnitOfWork unitOfWork)
    {
        Db = unitOfWork.DbContext as LaboratoryDbContext;
        DbSet = Db.Set<TEntity>();
        this.UnitOfWork = unitOfWork;
    }
    public virtual TEntity Add(TEntity obj, bool IsCommit = true)
    {
        TEntity entity = DbSet.Add(obj).Entity;
        if (IsCommit) UnitOfWork.Commit();
        return entity;
    }
    public void AddRange(IEnumerable<TEntity> objs, bool IsCommit = true)
    {
        DbSet.AddRange(objs);
        if (IsCommit) UnitOfWork.Commit();
    }
    public virtual async Task AddRangeAsync(IEnumerable<TEntity> objs, bool IsCommit = true)
    {
        await DbSet.AddRangeAsync(objs);
        if (IsCommit) UnitOfWork.Commit();
    }
    public virtual TEntity GetById(long id)
    {
        return DbSet.Find(id);
    }
    public virtual IQueryable<TEntity> GetAll()
    {
        return DbSet.AsNoTracking();
    }
    public virtual IQueryable<TEntity> GetAllAsTracking()
    {
        return DbSet.AsTracking();
    }
    public virtual void Update(TEntity obj, bool IsCommit = true)
    {
        // 有数据跟踪时，直接更新
        //DbSet.Update(obj);
        // 没有数据跟踪时，需要绑定，标记更新状态
        DbSet.Attach(obj);
        Db.Entry(obj).State = EntityState.Modified;
        if (IsCommit) UnitOfWork.Commit();
    }
    public virtual void UpdateRange(IEnumerable<TEntity> objs, bool IsCommit = true)
    {
        DbSet.AttachRange(objs);
        foreach (var obj in objs)
        {
            Db.Entry(obj).State = EntityState.Modified;
        }
        if (IsCommit) UnitOfWork.Commit();
    }
    public virtual void Remove(long id, bool IsCommit = true)
    {
        DbSet.Remove(DbSet.Find(id));
        if (IsCommit) UnitOfWork.Commit();
    }
    public virtual void RemoveRange(IEnumerable<TEntity> entities, bool IsCommit = true)
    {
        DbSet.RemoveRange(entities);
        if (IsCommit) UnitOfWork.Commit();
    }
    public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
    {
        return DbSet.Where(predicate);
    }
    public TEntity FindOne(Expression<Func<TEntity, bool>> predicate)
    {
        return DbSet.FirstOrDefault(predicate);
    }
    public bool Exists(Expression<Func<TEntity, bool>> predicate)
    {
        return DbSet.Any(predicate);
    }
    public void Remove(TEntity obj, bool IsCommit = true)
    {
        DbSet.Remove(obj);
        if (IsCommit) UnitOfWork.Commit();
    }
}
```

### 领域模型

```C#
/// <summary>
/// 实验室管理员
/// </summary>
[Table("bas_lab_admin")]
public class LaboratoryAdmin
{
    [Column("lab_id")]
    public long LaboratoryId { get; set; }
    [Column("admin_account_id")]
    public long AdminAccountId { get; set; }
    [Column("authority_depts", TypeName = "varchar(200)")]
    public string AuthorityDepts { get; set; }
    [Column("created_time")]
    public DateTime CreatedTime { get; set; }
    [ForeignKey("LaboratoryId")]
    public virtual LaboratoryEntity Laboratory { get; set; }
    [ForeignKey("AdminAccountId")]
    public virtual Account AdminUser { get; set; }
}
```

### 领域服务

```C#
public interface IAccountRepository : IRepository<Account>
{

}

public class AccountRepository : Repository<Account>, IAccountRepository
{
    public AccountRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { }
}
```

### 应用服务

```C#
/// <summary>
/// 基础服务抽象类
/// </summary>
public abstract class BaseSevice<TViewModel, TEntity> where TViewModel : BaseViewModel
        where TEntity : RootEntity
{
    protected abstract IRepository<TEntity> Repository { get; }
    private readonly IMapper _mapper;

    public BaseSevice(IMapper mapper)
    {
        this._mapper = mapper;
    }

    public IEnumerable<TViewModel> GetAll()
    {
        return _mapper.Map<IEnumerable<TViewModel>>(Repository.GetAll());
    }

    public TViewModel GetById(long id)
    {
        return _mapper.Map<TViewModel>(Repository.GetById(id));
    }

    public void Remove(long id)
    {
        Repository.Remove(id);
    }

    public void Save(TViewModel viewModel)
    {
        var dataEntity = _mapper.Map<TEntity>(viewModel);
        if (dataEntity.Id == 0) Repository.Add(dataEntity);
        else Repository.Update(dataEntity);
    }
}

/// <summary>
/// CRUD操作接口
/// </summary>
public interface IService<T> where T : BaseViewModel
{
    IEnumerable<T> GetAll();
    T GetById(long id);
    void Save(T viewModel);
    void Remove(long id);
}

/// <summary>
/// 资产应用服务接口
/// </summary>
public interface IAssetService : IService<AssetViewModel>
{
    /// <summary>
    /// 获取部件
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    Task<PageModel<AssetViewModel>> GetAssetsAsync(AssetInputDto input);
}

/// <summary>
/// 资产应用服务实现类
/// </summary>
public class AssetService : BaseSevice<AssetViewModel, Asset>, IAssetService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly IAssetRepository _assetRepository;

    /// <summary>
    /// 构造器注入
    /// </summary>
    public AssetService(IMapper mapper
            , IUnitOfWork unitOfWork
            , IConfiguration configuration
            , IAssetRepository assetRepository) : base(mapper)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _configuration = configuration;

        _assetRepository = assetRepository;
    }

    public async Task<PageModel<AssetViewModel>> GetAssetsAsync(AssetInputDto input)
    {
        var query = _assetRepository.GetAllAsTracking();
        // 主键Id
        if (input.Id > 0)
        {
            query = query.Where(_ => _.Id == input.Id);
        }
        // 型号
        if (input.ModelId > 0)
        {
            query = query.Where(_ => _.ModelId == input.ModelId);
        }
        // 内部编号
        if (!string.IsNullOrEmpty(input.InternalNo))
        {
            query = query.Where(_ => _.InternalNo.Contains(input.InternalNo));
        }
        // 查询
        var list = await query
               .OrderBy(x => x.Id)
               .Skip((input.PageIndex - 1) * input.PageSize).Take(input.PageSize)
               .ToListAsync();
        var total = await query.CountAsync();
        // 返回
        return new PageModel<AssetViewModel>()
        {
            Total = total,
            Data = _mapper.Map<List<AssetViewModel>>(list)
        };
    }
}
```

<b style="color:yellow">提示：</b>Queryable的常用方法可以查看[示例](#示例)。

## MemoryCache

### 本机缓存

本机缓存是比较基本的数据缓存方式，将数据存在Web Application的內存中。

如果是单一站点构架，没有要同步缓存数据，用本机缓存应该都能满足需求。

使用本机缓存的方式很简单，只要在Startup.ConfigureServices调用AddMemoryCache，就能通过注入IMemoryCache使用本机缓存。如下：

Startup.cs

```C#
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMemoryCache();
        // ...
    }
}
```

Controllers\HomeController.cs

```C#
using Microsoft.Extensions.Caching.Memory;
//...
public class HomeController: Controller
{
    private static IMemoryCache _memoryCache;

    public HomeController(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public IActionResult Index()
    {
        _memoryCache.Set("Sample", new UserModel()
        {
            Id = 1,
            Name = "John"
        });
        var model = _memoryCache.Get<UserModel>("Sample");
        return View(model);
    }
}
```

用Get/Set方法，就可以透过Key做为取值的识别，存放任何型别的数据。

### 分布式缓存

当ASP.NET Core网站有横向扩充，架设多个站点需求时，分布式缓存就是一个很好的同步缓存数据解决方案。

基本上就是NoSQL的概念，把分布式缓存的数据位置，指向外部的储存空间，如：SQL Server、Redis等等。只要继承IDistributedCache，就可以被当作分布式缓存的服务使用。

本机缓存及分布式缓存构架，如图：

![x](./Resource/3.jpg)

在 Startup.ConfigureServices 注入 IDistributedCache 使用分散式快取。如下：

Startup.cs

```C#
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDistributeMemoryCache();
        // ...
    }
}
```

AddDistributeMemoryCache是通过操作分布式缓存的IDistributedCache，将数据存于本机内存中。

Controllers\HomeController.cs

```C#
using Microsoft.Extensions.Caching.Memory;
//...
public class HomeController: Controller
{
    private static IDistributedCache _distributeCache;

    public HomeController(IDistributedCache distributeCache)
    {
        _distributeCache = distributeCache;
    }

    public IActionResult Index()
    {
        _distributeCache.Set("Sample", ObjectToByteArray(new UserModel()
        {
            Id = 1,
            Name = "John"
        }));
        var model = ByteArrayToObject<UserModel>(_distributeCache.Get("Sample"));
        return View(model);
    }

    private byte[] ObjectToByteArray(object obj)
    {
        var binaryFormatter = new BinaryFormatter();
        using(var memoryStream = new MemoryStream())
        {
            binaryFormatter.Serialize(memoryStream, obj);
            return memoryStream.ToArray();
        }
    }

    private T ByteArrayToObject(byte[] bytes)
    {
        using(var memoryStream = new MemoryStream())
        {
            var binaryFormatter = new BinaryFormatter();
            memoryStream.Write(bytes, 0, bytes.Length);
            memoryStream.Seek(0, SeekOrigin.Begin);
            var obj = binaryFormatter.Deserialize(memoryStream);
            return (T)obj;
        }
    }
}
```

IDistributedCache的Get/Set不像IMemoryCache可以存取任意型别，IDistributedCache的Get/Set只能存取`byte[]`型别，如果要将物件存入分布式缓存，就必须将物件转换成byte[]型别，或转成字串型别用GetString/SetString存取于分布式缓存。

如果要将物件透过MemoryStream串行化，记得在物件加上[Serializable]。

#### Redis

下载免安装的Redis版本。下载地址：[https://github.com/MicrosoftArchive/redis/releases](https://github.com/MicrosoftArchive/redis/releases)

在解压文件夹下运行命令：`./redis-server.exe redis.windows.conf`

将redis安装成服务。运行 `./redis-server.exe --service-install redis.windows.conf`

使用命令行操作redis

- set：保存数据或修改数据，例 `set name lily`
- get：取数据，例 `get name`

更多请参考：[https://www.cnblogs.com/zqr99/p/7899701.html](https://www.cnblogs.com/zqr99/p/7899701.html)

开源Redis可视化软件

AnotherRedisDesktopManager: [https://github.com/qishibo/AnotherRedisDesktopManager](https://github.com/qishibo/AnotherRedisDesktopManager)

Redis Desktop Manager: [https://github.com/uglide/RedisDesktopManager/](https://github.com/uglide/RedisDesktopManager/)

安装套件

如果要在`ASP.NET Core`中使用的Redis Cache，可以安装Microsoft提供的套件Microsoft.Extensions.Caching.Redis.Core。

透过.NET Core CLI在项目文件夹执行安装指令：

设定Redis Cache

安装完成后，将Startup.ConfigureServices注册的分布式缓存服务，从AddDistributedMemoryCache改成AddDistributedRedisCache。如下：

Startup.cs

```C#
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // services.AddDistributeMemoryCache();
        services.AddDistributedRedisCache(options =>
        {
            // Redis Server 的 IP 和 Port
            options.Configuration = "10.30.47.131:6379";
        });
        // ...
    }
}
```

这样就完成将分布式缓存指向Redis Cache，Session的注册方式不变。

只要设定AddDistributedRedisCache就可以使用Redis Session了，轻松简单。

***`ASP.NET MVC`比较***

`ASP.NET Core`的Redis Session跟`ASP.NET MVC`普遍用的StackExchange.Redis的运行方式有很大的差异。

`ASP.NET MVC Redis Session`

StackExchange.Redis在使用Redis时，是把Website的Session备份到Redis，读取还是在Website的內存，写入的话会再度备份到Redis。

也就是说Session会存在于Website及Redis Cache中，HA的概念。

可以试着把Redis Cache中Session清掉，当使用者下一个Requset来的时候，又会重新出现在Redis Cache中。

`ASP.NET Core Redis Session`

IDistributedCache运做方式变成Session直接在Redis Cache存取，如果把Redis Cache中Session清掉，当使用者下一个Requset来的时候，就会发现Session被清空了。

##### StackExchange.Redis

1. 安装依赖包：`Nugget: StackExchange.Redis`
2. 新建RedisHelper类

   ```C#
   public class RedisHelper
   {
       private ConnectionMultiplexer Redis { get; set; }
       private IDatabase DB { get; set; }

       public RedisHelper(string connection)
       {
           Redis = ConnectionMultiplexer.Connect(connection);
           DB = Redis.GetDatabase();
       }

       /// <summary>
       /// 增加/修改
       /// </summary>
       /// <param name="key"></param>
       /// <param name="value"></param>
       /// <returns></returns>
       public bool SetValue(string key, string value)
       {
           return DB.StringSet(key, value);
       }

       /// <summary>
       /// 查询
       /// </summary>
       /// <param name="key"></param>
       /// <returns></returns>
       public string GetValue(string key)
       {
           return DB.StringGet(key);
       }

       /// <summary>
       /// 删除
       /// </summary>
       /// <param name="key"></param>
       /// <returns></returns>
       public bool DeleteKey(string key)
       {
           return DB.KeyDelete(key);
       }
   }
   ```

3. 在控制台中使用

   ```C#
   RedisHelper redisHelper = new RedisHelper("127.0.0.1:6379");
   string value = "测试数据";
   bool testValue = redisHelper.SetValue("key", value);
   string saveValue = redisHelper.GetValue("key");

   Console.WriteLine(saveValue);

   bool newValue = redisHelper.SetValue("key", "NewValue");
   saveValue = redisHelper.GetValue("key");

   Console.WriteLine(saveValue);

   bool deleteKey = redisHelper.DeleteKey("key");
   string empty = redisHelper.GetValue("key");

   Console.WriteLine(empty);

   Console.ReadKey();
   ```

## 前端vue

## 部署

部署在IIS服务器上

代码部分：`UseIIS()`

![x](./Resource/47.png)

发布配置：IIS（也可以文件系统）

![x](./Resource/48.png)

生成的配置文件 web.config：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\LeadChina.Laboratory.Api.dll" stdoutLogEnabled="false" hostingModel="InProcess" stdoutLogFile=".\logs\stdout">
        <environmentVariables>
          <environmentVariable name="ASPNETCORE_ENVIRONMENT" value="Development" />
          <environmentVariable name="COMPLUS_ForceENC" value="1" />
        </environmentVariables>
      </aspNetCore>
    </system.webServer>
  </location>
</configuration>
```

IIS配置：

![x](./Resource/49.png)

[前端Vue部署](../../../2015/Frontend/ReadMe/vue.md#部署)

<b style="color:red">刷新404</b>

```txt
环境：
  IIS URLRewrite vue单页应用程序（history模式）
行为：
  当我们进入到某个路由之后，按F5刷新页面会出现404错误：
解决方法：
  IIS下部署后的解决方案一般是使用 "URLRewrite"
  1. 首先要安装 "URLRewrite"，网址：https://www.iis.net/downloads/microsoft/url-rewrite
     问题：
       Windows10中的IIS10.0安装php manager和IIS URL 重写2.0组件会提示“必须安装IIS7以上才可以”
     解决方法：
       打开regedit，找到：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\W3SVC\Parameters
       右侧的 MajorVersion 是DWORD值，它的值十进制是10，把它改成9。
       再找到：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\InetStp
       也是 MajorVersion 项，这个也是 dword 值 10（注意是十进制），把它改成9！
       然后安装程序即可顺利安装上了！记得装完之后改回来。（URL重写2.0组件只需要第二步即可）
  2. 安装完 "URL重写工具2.0" 后在IIS上添加重写规则
```

![x](./Resource/50.png)

现在再刷新就不会404了，web.config配置文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="Vue页面刷新404">
                    <match url=".*" />
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/index.html" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```
