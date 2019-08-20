# ABP框架

一直想写一些技术文章，但是总觉得自己学的不甚满意，想等到钻研透彻之后再动笔。结果就是，到现在也没有拿起笔来。静下心来想想，任何成就（包括写一篇高质量的技术文）都不是一蹴而就的，总要经过反复审阅，修改。现在不着手练起，以后也不会有打通任督二脉的一天。那何不现在就动笔呢，即使写得不好，也可以多改改嘛。

最近在学习领域驱动设计，看了不少理论文章，虽然看的时候大意都懂，但是总是不能深入其思想，得其精髓。毕竟脱离了实践，就像纸上谈兵（好歹赵括还能根据兵书夸夸其谈，如果让我讲一下领域驱动，估计能讲满3分钟就不错了）。

鉴于自己现在是一个.NET程序猿（其实本人是一个想做科学家的工程师...），就想在.NET环境下寻找一个比较好的实现领域驱动的解决方案。不久，大名鼎鼎的ABP框架以不可阻挡之势闯进了我的猿生。

ABP的官方文档都是英文版，而英语是我现在亟需提高的技能，那么，理所当然地，先翻译几篇重要的教程练练手（当然，我不是逐字翻译，我会尽量使用简洁的语言将文档中的意思表述清楚）。

下面，开始！

## 目录

1. [简述](#简述)
   - [一个快速示例](#一个快速示例)
   - [入门](#入门)
   - [社区](#社区)
   - [使用ASP.NET Core和Entity Framework Core](#使用ASP.NET&nbsp;Core和EntityFramework&nbsp;Core)
     - [创建应用程序](#创建应用程序)
     - [开发应用程序](#开发应用程序)
     - [自动化测试任务列表页面](#自动化测试任务列表页面)
     - [源代码](#源代码)
   - [模块系统](#模块系统)
   - [多租户](#多租户)

## 简述

ASP.NET Boilerplate(ABP)是一个开源的应用框架，同时又不仅仅是一个框架，它提供一个基于领域驱动设计的强架构模型，包含了作者认为的最佳实践。

ABP既支持最新版的ASP.NET Core和EF Core，也支持ASP.NET MVC 5.x和EF 6.x。

### 一个快速示例

让我们研究一个简单的类来看看ABP框架的好处：

```C#
public class TaskAppService : ApplicationService, ITaskAppService
{
    private readonly IRepository<Task> _taskRepository;

    public TaskAppService(IRepository<Task> taskRepository)
    {
        _taskRepository = taskRepository;
    }

    [AbpAuthorize(MyPermissions.UpdateTasks)]
    public async Task UpdateTask(UpdateTaskInput input)
    {
        Logger.Info("Updating a task for input: " + input);

        var task = await _taskRepository.FirstOrDefaultAsync(input.TaskId);
        if (task == null)
        {
            throw new UserFriendlyException(L("CouldNotFindTheTaskMessage"));
        }

        input.MapTo(task);
    }
}
```

这是一个简单的应用服务方法，在领域驱动模式中，应用服务直接被展示层使用，来展现应用用例。UpdateTask可以想象为一个被js的ajax调用的方法。
让我们看一下ABP的一些好处：

- 依赖注入：ABP使用了传统的依赖注入。此示例是一个应用服务类，按惯例我们将它以transient（每次请求都创建一个新实例）方式注册进DI容器中，它能简单地注入任何依赖项（比如本例中`IRepository<Task>`，通过构造器注入）
- 仓储：ABP会给每个实体(entity)创建一个默认的仓储(repository)，例如本例中的`IRepository<Task>`。默认的repository类提供很多有用的方法（本例中的FirstOrDefault），当然，为了满足需求，我们也可以自定义类继承它。Repositories封装了DBMS（数据库管理服务）和ORMs（对相关系映射），从而简化了数据获取的逻辑。
- 权限认证：ABP可以使用“属性声明”验证权限，如果当前用户没有"update tasks"权限或者没有登录就无法访问UpdateTask方法。当然也有其它验证权限的方法
- 表单验证：ABP可以自动验证输入是否为null，也会验根据声明属性和自定义验证规则验证所有输入数据。如果验证不通过，会抛出一个对应的验证异常，并在客户端处理
- 审计日志：每次请求的用户，浏览器，IP地址，正在调用的服务，方法，参数，调用时间，执行过程，以及其它信息都会基于协议和配置自动保存
- 工作单元：在ABP中，每个应用服务方法都被默认设置为一个工作单元。它自动创建连接，开启事务，成功执行后提交事务，关闭连接。即使这个方法使用了不同的仓储和方法，它们都是原子性的（事务化）。事务提交时，实体上的所有变化都会自动保存，甚至不需要调用_repository.Update(task)方法
- 异常处理：在ABP框架搭建的Web应用中，我们几乎不需要手动处理异常！所有异常都默认会处理。当发生异常时，ABP框架会自动记录日志，然后返回合适的结果给客户端。举例来说，如果这是一个ajax请求，它会返回一个JSON对象到客户端指示发生了错误。对客户端它会隐藏真正的异常信息除非异常被声明为UserFriendlyException类型。它也能理解和处理客户端的错误，给客户显示友好的信息
- 日志：我们可以使用基类中定义的Logger对象写日志，默认使用Log4Net，当然也可以自行配置
- 本地化：注意我们写异常消息的时候用了'L'方法？这样就可以自动本地化用户的语言。
- 自动映射：在最后一行，我们使用ABP的MapTo扩展方法来映射输入属性到实体属性。它使用了AutoMapper 类库来实现映射。使用命名协议我们可以简单地从一个对象映射属性到另一个对象
- 动态API层：事实上，TaskAppService是一个简单的类。一般来说，我们必须写一个API Controller的包装类来暴露方法给js客户端，但是ABP框架在运行时自动做了这一步，这样我们就能从客户端直接使用应用服务方法。
- 动态JavaScript AJAX代理：ABP框架在客户端创建了代理方法，使得调用应用服务层方法和调用js方法一样简单。

我们可以从这个简单的类中看到ABP框架的优势。所有这些任务通常需要很长时间，但是由框架自动处理了。

除了这个简单的例子，ABP为模块化，多租户，缓存，后台作业，数据过滤器，设置管理，领域事件，单元和集成测试等提供了强大的基础架构和开发模型 ......您只需要专注于您的业务代码而不需要重复做这些事！

### 入门

从启动模板直接创建一个现代化的启动项目：[https://aspnetboilerplate.com/Templates](https://aspnetboilerplate.com/Templates)

### 社区

这是一个开源项目，对社区的贡献开放。

- 使用[GitHub存储库](https://github.com/aspnetboilerplate/aspnetboilerplate)访问最新的源代码，创建问题并发送拉取请求。
- 在stackoverflow上使用[aspnetboilerplate](https://stackoverflow.com/questions/tagged/aspnetboilerplate)标记来询问有关用法的问题。
- 在Twitter上关注[aspboilerplate](https://twitter.com/aspboilerplate)以了解发生的事情。

### 使用ASP.NET&nbsp;Core和EntityFramework&nbsp;Core

在本文中，我将展示使用以下工具创建一个简单的跨平台分层 Web应用程序：

- .Net Core作为基础跨平台应用程序开发框架。
- ASP.NET Boilerplate(ABP)作为启动模板和应用程序框架。
- ASP.NET Core作为Web框架。
- Entity Framework Core作为ORM框架。
- Twitter Bootstrap作为HTML和CSS框架。
- jQuery作为客户端AJAX/DOM库。
- xUnit和Shouldly 用于服务器端单元/集成测试。

我还将使用默认包含在ABP 启动模板中的Log4Net和AutoMapper。我们将使用以下技术：

- 分层架构
- 领域驱动设计（DDD）
- 依赖注入（DI）
- 集成测试

这里将开发的项目是一个简单的任务管理应用程序，可以将任务分配给人员。我不会逐层开发应用程序，而是随着应用程序的增长而转向垂直深入并更改层。随着应用程序的增长，我将根据需要介绍ABP和其他框架的一些功能。

#### 创建应用程序

我使用ABP的[启动模板](http://www.aspnetboilerplate.com/Templates)创建了一个名为"Acme.SimpleTaskApp"的新Web应用程序。创建模板时，公司名称（此处为"Acme"）是可选的。我还选择了多页面Web应用程序，因为我不想在本文中使用SPA，因为我想要最基本的启动模板，所以我禁用了身份验证：

它创建了一个分层解决方案，包括6个项目，以我作为项目名称输入的名称开头：

- .Core项目用于域/业务层（实体，域服务......）
- .Application项目适用于应用层（DTO，应用服务......）
- .EntityFramework项目用于EF Core集成（从其他层抽象EF Core）。
- .Web项目适用于ASP.NET MVC层。
- .Tests项目用于单元和集成测试（直到应用层，不包括web层）
- .Web.Tests项目用于ASP.NET Core集成测试（包括web层的完整集成测试）。

#### 开发应用程序

***创建任务实体***

我想从一个简单的Task实体开始。由于实体是域层的一部分，我将其添加到.Core项目中：

```C#
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;

namespace Acme.SimpleTaskApp.Tasks
{
    [Table("AppTasks")]
    public class Task : Entity, IHasCreationTime
    {
        public const int MaxTitleLength = 256;
        public const int MaxDescriptionLength = 64 * 1024; //64KB

        [Required]
        [StringLength(MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(MaxDescriptionLength)]
        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public TaskState State { get; set; }

        public Task()
        {
            CreationTime = Clock.Now;
            State = TaskState.Open;
        }

        public Task(string title, string description = null)
            : this()
        {
            Title = title;
            Description = description;
        }
    }

    public enum TaskState : byte
    {
        Open = 0,
        Completed = 1
    }
}
```

- 我派生自ABP的基本Entity类，默认情况下包括Id属性为int。我们可以使用通用版本 `Entity<TPrimaryKey>` 来选择不同的PK类型。
- IHasCreationTime是一个简单的接口，只定义CreationTime属性（最好使用CreationTime的标准名称）。
- 任务实体定义了必需的标题和可选的描述。
- TaskState是一个简单的枚举，用于定义任务的状态。
- Clock.Now默认返回DateTime.Now。但它提供了抽象，因此如果需要，我们可以轻松切换到功能中的DateTime.UtcNow。在使用ABP框架时，始终使用Clock.Now而不是DateTime.Now。
- 我想将Task实体存储到数据库中的AppTasks表中。

***将任务添加到DbContext***

.EntityFrameworkCore项目包含一个预定义的DbContext。我要补充一个DbSet的任务实体到的DbContext：

```C#
public class SimpleTaskAppDbContext : AbpDbContext
{
    public DbSet<Task> Tasks { get; set; }

    public SimpleTaskAppDbContext(DbContextOptions<SimpleTaskAppDbContext> options
        : base(options)
    {

    }
}
```

现在，EF Core知道我们有一个Task实体。

***创建第一个数据库迁移***

我们将创建一个初始数据库迁移来创建数据库和AppTasks表。我从Visual Studio打开包管理器控制台并运行Add-Migration命令（默认项目必须是.EntityFrameworkCore项目）：

![x](./Resource/13.png)

自动生成的“初始”迁移类如下所示：

```C#
public partial class Initial : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AppTasks",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                CreationTime = table.Column<DateTime>(nullable: false),
                Description = table.Column<string>(maxLength: 65536, nullable: true),
                State = table.Column<byte>(nullable: false),
                Title = table.Column<string>(maxLength: 256, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AppTasks", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AppTasks");
    }
}
```

当我们执行到数据库的迁移时，此代码用于创建AppTasks表（有关迁移的更多信息，请参阅entity framework文档）。

***创建数据库***

要创建数据库，从Package Manager控制台运行Update-Database命令：

![x](./Resource/14.png)

此命令在本地SQL Server中创建了一个名为SimpleTaskAppDb的数据库并执行了迁移（目前，只有一个“初始”迁移）：

现在，在数据库中有一个Task实体和相应的表。在表格中输入了一些示例任务

*请注意，数据库连接字符串在.Web应用程序中的appsettings.json中定义。*

***任务申请服务***

Application Services用于将域逻辑公开给表示层。从表示层调用应用程序服务，其中数据传输对象(DTO)作为参数（如果需要），使用域对象执行某些特定业务逻辑并将DTO返回到表示层（如果需要）。
我正在将第一个应用程序服务TaskAppService创建到.Application项目中，以执行与任务相关的应用程序逻辑。首先，我想为应用服务定义一个接口：

```C#
public interface ITaskAppService : IApplicationService
{
    Task<ListResultDto<TaskListDto>> GetAll(GetAllTasksInput input);
}
```

不需要定义接口，但建议使用。按照惯例，所有应用服务都应该在ABP中实现IApplicationService接口（它只是一个空标记接口）。我创建了一个GetAll方法来查询任务。为此，我还定义了以下DTO：

```C#
public class GetAllTasksInput
{
    public TaskState? State { get; set; }
}

[AutoMapFrom(typeof(Task))]
public class TaskListDto : EntityDto, IHasCreationTime
{
    public string Title { get; set; }

    public string Description { get; set; }

    public DateTime CreationTime { get; set; }

    public TaskState State { get; set; }
}
```

- GetAllTasksInput DTO定义GetAll应用服务方法的输入参数。我没有直接将状态定义为方法参数，而是将其添加到DTO对象中。因此，我可以在不破坏现有客户端的情况下将其他参数添加到此DTO中（我们可以直接向该方法添加状态参数）。
- TaskListDto用于返回Task数据。它来自EntityDto，它只定义了Id属性（我们可以将Id添加到我们的Dto而不是从EntityDto派生）。我们定义了[AutoMapFrom]属性来创建从Task实体到TaskListDto的AutoMapper映射。此属性在Abp.AutoMapper nuget包中定义。
- 最后，ListResultDto是一个包含项列表的简单类（我们可以直接返回`List<TaskListDto>`）。
现在，我们可以实现ITaskAppService，如下所示：

```C#
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Acme.SimpleTaskApp.Tasks.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Acme.SimpleTaskApp.Tasks
{
    public class TaskAppService : SimpleTaskAppAppServiceBase, ITaskAppService
    {
        private readonly IRepository<Task> _taskRepository;

        public TaskAppService(IRepository<Task> taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<ListResultDto<TaskListDto>> GetAll(GetAllTasksInput input)
        {
            var tasks = await _taskRepository
                .GetAll()
                .WhereIf(input.State.HasValue, t => t.State == input.State.Value)
                .OrderByDescending(t => t.CreationTime)
                .ToListAsync();

            return new ListResultDto<TaskListDto>(
                ObjectMapper.Map<List<TaskListDto>>(tasks)
            );
        }
    }
}
```

- TaskAppService派生自启动模板中包含的SimpleTaskAppAppServiceBase（它源自ABP的ApplicationService类）。这不是必需的，app服务可以是普通类。但是ApplicationService基类有一些预注入的服务（比如这里使用的ObjectMapper）。
- 我使用依赖注入来获取存储库。
- 存储库用于抽象实体的数据库操作。ABP为每个实体创建一个预定义的存储库（如`IRepository<Task>`），以执行常见任务。IRepository。这里使用的GetAll()返回一个IQueryable来查询实体。
- WhereIf是ABP的扩展方法，用于简化IQueryable.Where方法的条件使用。
- ObjectMapper（其中一些来自ApplicationService基类并默认通过AutoMapper实现）用于将Task对象列表映射到TaskListDtos对象列表。

***测试TaskAppService***

在进一步创建用户界面之前，我想测试TaskAppService。如果您对自动化测试不感兴趣，可以跳过本节。

启动模板包含.Tests项目来测试我们的代码。它使用EF Core的InMemory数据库提供程序而不是SQL Server。因此，我们的单元测试可以在没有真正的数据库的情形下为每个测试创建一个单独的数据库。因此，测试彼此隔离。在运行测试之前，我们可以使用TestDataBuilder类将一些初始测试数据添加到InMemory数据库中。我更改了TestDataBuilder，如下所示：

```C#
public class TestDataBuilder
{
    private readonly SimpleTaskAppDbContext _context;

    public TestDataBuilder(SimpleTaskAppDbContext context)
    {
        _context = context;
    }

    public void Build()
    {
        _context.Tasks.AddRange(
            new Task("Follow the white rabbit", "Follow the white rabbit in order to know the reality."),
            new Task("Clean your room") { State = TaskState.Completed }
            );
    }
}
```

您可以查看示例项目的源代码，以了解TestDataBuilder的使用位置和方式。我向dbcontext添加了两个任务（其中一个已完成）。所以，我可以编写我的测试，假设数据库中有两个任务。我的第一个集成测试测试了我们上面创建的TaskAppService.GetAll方法。

```C#
public class TaskAppService_Tests : SimpleTaskAppTestBase
{
    private readonly ITaskAppService _taskAppService;

    public TaskAppService_Tests()
    {
        _taskAppService = Resolve<ITaskAppService>();
    }

    [Fact]
    public async System.Threading.Tasks.Task Should_Get_All_Tasks()
    {
        //Act
        var output = await _taskAppService.GetAll(new GetAllTasksInput());

        //Assert
        output.Items.Count.ShouldBe(2);
    }

    [Fact]
    public async System.Threading.Tasks.Task Should_Get_Filtered_Tasks()
    {
        //Act
        var output = await _taskAppService.GetAll(new GetAllTasksInput { State = TaskState.Open });

        //Assert
        output.Items.ShouldAllBe(t => t.State == TaskState.Open);
    }
}
```

我创建了两个不同的测试来测试GetAll方法，如上所示。现在，我可以打开测试资源管理器（从VS的主菜单中的Test\Windows\Test Explorer）并运行单元测试。

*请注意; ABP启动模板附带xUnit，默认情况下应该安装。所以，我们用它们来编写我们的测试。*

***任务列表视图***

现在，我知道TaskAppService正常工作。我可以开始创建一个列出所有任务的页面。

**添加新菜单项：**

首先，我在顶部菜单中添加了一个新项目：

```C#
public class SimpleTaskAppNavigationProvider : NavigationProvider
{
    public override void SetNavigation(INavigationProviderContext context)
    {
        context.Manager.MainMenu
            .AddItem(
                new MenuItemDefinition(
                    "Home",
                    L("HomePage"),
                    url: "",
                    icon: "fa fa-home"
                    )
            ).AddItem(
                new MenuItemDefinition(
                    "About",
                    L("About"),
                    url: "Home/About",
                    icon: "fa fa-info"
                    )
            ).AddItem(
                new MenuItemDefinition(
                    "TaskList",
                    L("TaskList"),
                    url: "Tasks",
                    icon: "fa fa-tasks"
                    )
            );
    }

    private static ILocalizableString L(string name)
    {
        return new LocalizableString(name, SimpleTaskAppConsts.LocalizationSourceName);
    }
}
```

启动模板有两个页面：Home和About，如上所示。我们可以更改它们或创建新页面。我现在暂时离开它们并创建一个新的菜单项。

***创建 TaskController 和 ViewModel***

我正在.Web项目中创建一个新的控制器类TasksController，如下所示：

```C#
public class TasksController : SimpleTaskAppControllerBase
{
    private readonly ITaskAppService _taskAppService;

    public TasksController(ITaskAppService taskAppService)
    {
        _taskAppService = taskAppService;
    }

    public async Task<ActionResult> Index(GetAllTasksInput input)
    {
        var output = await _taskAppService.GetAll(input);
        var model = new IndexViewModel(output.Items);
        return View(model);
    }
}
```

- 我派生自SimpleTaskAppControllerBase（派生自AbpController），它包含此应用程序中控制器的公共基本代码。
- 我注入了ITaskAppService以获取任务列表。
我没有直接将GetAll方法的结果传递给视图，而是在.Web项目中创建了一个IndexViewModel类，如下所示：

```C#
public class IndexViewModel
{
    public IReadOnlyList<TaskListDto> Tasks { get; }

    public IndexViewModel(IReadOnlyList<TaskListDto> tasks)
    {
        Tasks = tasks;
    }

    public string GetTaskLabel(TaskListDto task)
    {
        switch (task.State)
        {
            case TaskState.Open:
                return "label-success";
            default:
                return "label-default";
        }
    }
}
```

这个简单的视图模型在它的构造函数中获取任务列表（由ITaskAppService提供）。它还具有GetTaskLabel方法，该方法将在视图中用于为给定任务选择Bootstrap标签类。

**任务列表页面：**

最后，索引视图如下所示：

```html
@model Acme.SimpleTaskApp.Web.Models.Tasks.IndexViewModel

@{
    ViewBag.Title = L("TaskList");
    ViewBag.ActiveMenu = "TaskList"; //Matches with the menu name in SimpleTaskAppNavigationProvider to highlight the menu item
}

<h2>@L("TaskList")</h2>

<div class="row">
    <div>
        <ul class="list-group" id="TaskList">
            @foreach (var task in Model.Tasks)
            {
                <li class="list-group-item">
                    <span class="pull-right label @Model.GetTaskLabel(task)">@L($"TaskState_{task.State}")</span>
                    <h4 class="list-group-item-heading">@task.Title</h4>
                    <div class="list-group-item-text">
                        @task.CreationTime.ToString("yyyy-MM-dd HH:mm:ss")
                    </div>
                </li>
            }
        </ul>
    </div>
</div>
```

我们只使用给定的模型使用Bootstrap的列表组件来呈现视图。在这里，我们使用了IndexViewModel。GetTaskLabel()方法获取任务的标签类型。

***本土化***

我们在来自ABP框架的视图中使用了 `L` 方法。它用于本地化字符串。我们定义的本地化字符串在.Core项目中Localization/Source文件夹的.json文件里。英语本地化如下所示：

```json
{
  "culture": "en",
  "texts": {
    "HelloWorld": "Hello World!",
    "ChangeLanguage": "Change language",
    "HomePage": "HomePage",
    "About": "About",
    "Home_Description": "Welcome to SimpleTaskApp...",
    "About_Description": "This is a simple startup template to use ASP.NET Core with ABP framework.",
    "TaskList": "Task List",
    "TaskState_Open": "Open",
    "TaskState_Completed": "Completed"
  }
}
```

大多数文本来自启动模板，可以删除。我刚刚添加了最后3行并在上面的视图中使用。虽然使用ABP的本地化非常简单，但您可以查看本地化文档以获取有关本地化系统的更多信息。

***过滤任务***

如上所示，TaskController实际上获得了一个可用于过滤任务的GetAllTasksInput。因此，我们可以在任务列表视图中添加一个下拉列表来过滤任务。首先，我在视图中添加了下拉列表（我在标题中添加了）：

```html
<h2>
    @L("TaskList")
    <span class="pull-right">
        @Html.DropDownListFor(
           model => model.SelectedTaskState,
           Model.GetTasksStateSelectListItems(LocalizationManager),
           new
           {
               @class = "form-control",
               id = "TaskStateCombobox"
           })
    </span>
</h2>
```

然后我更改了IndexViewModel以添加SelectedTaskState属性和GetTasksStateSelectListItems方法：

```C#
public class IndexViewModel
{
    //...

    public TaskState? SelectedTaskState { get; set; }

    public List<SelectListItem> GetTasksStateSelectListItems(ILocalizationManager localizationManager)
    {
        var list = new List<SelectListItem>
        {
            new SelectListItem
            {
                Text = localizationManager.GetString(SimpleTaskAppConsts.LocalizationSourceName, "AllTasks"),
                Value = "",
                Selected = SelectedTaskState == null
            }
        };

        list.AddRange(Enum.GetValues(typeof(TaskState))
                .Cast<TaskState>()
                .Select(state =>
                    new SelectListItem
                    {
                        Text = localizationManager.GetString(SimpleTaskAppConsts.LocalizationSourceName, $"TaskState_{state}"),
                        Value = state.ToString(),
                        Selected = state == SelectedTaskState
                    })
        );

        return list;
    }
}
```

我们应该在控制器中设置SelectedTaskState：

```C#
public async Task<ActionResult> Index(GetAllTasksInput input)
{
    var output = await _taskAppService.GetAll(input);
    var model = new IndexViewModel(output.Items)
    {
        SelectedTaskState = input.State
    };
    return View(model);
}
```

现在，我们可以运行应用程序来查看视图右上角的组合框

我添加了组合框，但它还不能用。当组合框值更改时，我将编写一个简单的JavaScript代码来重新请求/刷新任务列表页面。所以，我在.Web项目中创建wwwroot\js\views\tasks\index.js文件：

```js
(function ($) {
    $(function () {

        var _$taskStateCombobox = $('#TaskStateCombobox');

        _$taskStateCombobox.change(function() {
            location.href = '/Tasks?state=' + _$taskStateCombobox.val();
        });

    });
})(jQuery);
```

在将此JavaScript文件包含到我的视图中之前，我使用了Bundler和Minifier VS扩展（这是在`ASP.NET Core`项目中缩小文件的默认方式）来缩小脚本：

![x](./Resource/15.png)

这将以下行添加到.Web项目中的bundleconfig.json文件中：

```json
{
  "outputFileName": "wwwroot/js/views/tasks/index.min.js",
  "inputFiles": [
    "wwwroot/js/views/tasks/index.js"
  ]
}
```

并创建一个缩小版本的脚本：

![x](./Resource/16.png)

每当我更改index.js时，都会自动重新生成index.min.js。现在，我可以将JavaScript文件包含到我的页面中：

```html
@section scripts
{
    <environment names="Development">
        <script src="~/js/views/tasks/index.js"></script>
    </environment>

    <environment names="Staging,Production">
        <script src="~/js/views/tasks/index.min.js"></script>
    </environment>
}
```

使用此代码，我们的视图将在开发中使用index.js，在生产中使用index.min.js（缩小版本）。这是ASP.NET Core MVC项目中的常用方法。

#### 自动化测试任务列表页面

我们可以创建集成测试，该测试也集成到`ASP.NET Core MVC`基础结构中。因此，我们可以完全测试我们的服务器端代码。如果您对自动化测试不感兴趣，可以跳过本节。

ABP启动模板包含一个.Web.Tests项目。我创建了一个简单的测试来请求TaskController.Index并检查响应：

```C#
public class TasksController_Tests : SimpleTaskAppWebTestBase
{
    [Fact]
    public async System.Threading.Tasks.Task Should_Get_Tasks_By_State()
    {
        //Act

        var response = await GetResponseAsStringAsync(
            GetUrl<TasksController>(nameof(TasksController.Index), new
                {
                    state = TaskState.Open
                }
            )
        );

        //Assert

        response.ShouldNotBeNullOrWhiteSpace();
    }
}
```

GetResponseAsStringAsync和GetUrl方法是ABP 的AbpAspNetCoreIntegratedTestBase类提供的一些辅助方法。我们可以直接使用Client（HttpClient的一个实例）属性来发出请求。但使用这些快捷方法可以更轻松。有关更多信息，请参阅`ASP.NET Core`的[集成测试文档](https://docs.asp.net/en/latest/testing/integration-testing.html)。

当我调试测试时，我可以看到响应HTML：

![x](./Resource/17.png)

这表明Index页面返回了一个没有任何异常的响应。但是......我们可能想要更多，并检查返回的HTML是否符合我们的预期。有一些库可用于解析HTML。AngleSharp就是其中之一，并且预先安装在ABP启动模板的.Web.Tests项目中。所以，我用它来检查创建的HTML代码：

```C#
public class TasksController_Tests : SimpleTaskAppWebTestBase
{
    [Fact]
    public async System.Threading.Tasks.Task Should_Get_Tasks_By_State()
    {
        //Act

        var response = await GetResponseAsStringAsync(
            GetUrl<TasksController>(nameof(TasksController.Index), new
                {
                    state = TaskState.Open
                }
            )
        );

        //Assert

        response.ShouldNotBeNullOrWhiteSpace();

        //Get tasks from database
        var tasksInDatabase = await UsingDbContextAsync(async dbContext =>
        {
            return await dbContext.Tasks
                .Where(t => t.State == TaskState.Open)
                .ToListAsync();
        });

        //Parse HTML response to check if tasks in the database are returned
        var document = new HtmlParser().Parse(response);
        var listItems = document.QuerySelectorAll("#TaskList li");

        //Check task count
        listItems.Length.ShouldBe(tasksInDatabase.Count);

        //Check if returned list items are same those in the database
        foreach (var listItem in listItems)
        {
            var header = listItem.QuerySelector(".list-group-item-heading");
            var taskTitle = header.InnerHtml.Trim();
            tasksInDatabase.Any(t => t.Title == taskTitle).ShouldBeTrue();
        }
    }
}
```

您可以更深入，更详细地检查HTML。但在大多数情况下，检查基本标签就足够了。

***创建人员实体***

我将Person概念添加到应用程序以将任务分配给人员。所以，我定义了一个简单的Person实体：

```C#
[Table("AppPersons")]
public class Person : AuditedEntity<Guid>
{
    public const int MaxNameLength = 32;

    [Required]
    [StringLength(MaxNameLength)]
    public string Name { get; set; }

    public Person()
    {

    }

    public Person(string name)
    {
        Name = name;
    }
}
```

这一次，我将Id（主键）类型设置为Guid，用于演示。我也派生自AuditedEntity（具有CreationTime，CreaterUserId，LastModificationTime和LastModifierUserId属性）而不是基本实体类。

***将人员与任务实体相关联***

我还将AssignedPerson属性添加到Task实体（仅在此处共享更改的部分）：

```C#
[Table("AppTasks")]
public class Task : Entity, IHasCreationTime
{
    //...
    [ForeignKey(nameof(AssignedPersonId))]
    public Person AssignedPerson { get; set; }
    public Guid? AssignedPersonId { get; set; }

    public Task(string title, string description = null, Guid? assignedPersonId = null)
        : this()
    {
        Title = title;
        Description = description;
        AssignedPersonId = assignedPersonId;
    }
}
```

AssignedPerson是可选的。因此，任务可以分配给一个人或可以取消分配。

***将人员添加到DbContext***

最后，我将新的Person实体添加到DbContext类：

```C#
public class SimpleTaskAppDbContext : AbpDbContext
{
    public DbSet<Person> People { get; set; }

    //...
}
```

***为人员实体添加新迁移***

现在，我在Package Manager控制台中运行以下命令：

![x](./Resource/18.png)

它在项目中创建了一个新的迁移类：

```C#
public partial class Added_Person : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AppPersons",
            columns: table => new
            {
                Id = table.Column<Guid>(nullable: false),
                CreationTime = table.Column<DateTime>(nullable: false),
                CreatorUserId = table.Column<long>(nullable: true),
                LastModificationTime = table.Column<DateTime>(nullable: true),
                LastModifierUserId = table.Column<long>(nullable: true),
                Name = table.Column<string>(maxLength: 32, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AppPersons", x => x.Id);
            });

        migrationBuilder.AddColumn<Guid>(
            name: "AssignedPersonId",
            table: "AppTasks",
            nullable: true);

        migrationBuilder.CreateIndex(
            name: "IX_AppTasks_AssignedPersonId",
            table: "AppTasks",
            column: "AssignedPersonId");

        migrationBuilder.AddForeignKey(
            name: "FK_AppTasks_AppPersons_AssignedPersonId",
            table: "AppTasks",
            column: "AssignedPersonId",
            principalTable: "AppPersons",
            principalColumn: "Id",
            onDelete: ReferentialAction.SetNull);
    }

    //...
}
```

我刚刚将ReferentialAction.Restrict更改为ReferentialAction.SetNull。它这样做：如果我删除一个人，分配给该人的任务将被取消分配。这在此演示中并不重要。但我想表明，如果需要，您可以更改迁移代码。实际上，在将其应用于数据库之前，您始终会查看生成的代码。之后，我们可以将迁移应用到我们的数据库：`update-database`

当我们打开数据库时，我们可以看到新的表和列并添加一些测试数据。

***返回任务列表中的已分配人员***

我将更改TaskAppService以返回指定的人员信息。首先，我要向TaskListDto添加两个属性：

```C#
[AutoMapFrom(typeof(Task))]
public class TaskListDto : EntityDto, IHasCreationTime
{
    //...

    public Guid? AssignedPersonId { get; set; }

    public string AssignedPersonName { get; set; }
}
```

并将Task.AssignedPerson属性包含在查询中。刚刚添加了包含行：

```C#
public class TaskAppService : SimpleTaskAppAppServiceBase, ITaskAppService
{
    //...

    public async Task<ListResultDto<TaskListDto>> GetAll(GetAllTasksInput input)
    {
        var tasks = await _taskRepository
            .GetAll()
            .Include(t => t.AssignedPerson)
            .WhereIf(input.State.HasValue, t => t.State == input.State.Value)
            .OrderByDescending(t => t.CreationTime)
            .ToListAsync();

        return new ListResultDto<TaskListDto>(
            ObjectMapper.Map<List<TaskListDto>>(tasks)
        );
    }
}
```

因此，GetAll方法将返回具有任务的Assigned person信息。由于我们使用了AutoMapper，因此新属性也将自动复制到DTO。

***更改单元测试以测试指定人员***

此时，我们可以更改单元测试，以查看在获取任务列表时是否检索到已分配的人员。首先，我更改了TestDataBuilder类中的初始测试数据，以将人员分配给任务：

```C#
public class TestDataBuilder
{
    //...

    public void Build()
    {
        var neo = new Person("Neo");
        _context.People.Add(neo);
        _context.SaveChanges();

        _context.Tasks.AddRange(
            new Task("Follow the white rabbit", "Follow the white rabbit in order to know the reality.", neo.Id),
            new Task("Clean your room") { State = TaskState.Completed }
            );
    }
}
```

然后我正在更改TaskAppService_Tests.Should_Get_All_Tasks()方法以检查其中一个检索到的任务是否已分配人员（请参阅最后一行添加）：

```C#
[Fact]
public async System.Threading.Tasks.Task Should_Get_All_Tasks()
{
    //Act
    var output = await _taskAppService.GetAll(new GetAllTasksInput());

    //Assert
    output.Items.Count.ShouldBe(2);
    output.Items.Count(t => t.AssignedPersonName != null).ShouldBe(1);
}
```

注意：Count扩展方法需要使用 `System.Linq;` 声明。

***在任务列表页面中显示分配的人员姓名***

最后，我们可以更改Tasks\Index.cshtml以显示AssignedPersonName：

```html
@foreach (var task in Model.Tasks)
{
    <li class="list-group-item">
        <span class="pull-right label label-lg @Model.GetTaskLabel(task)">@L($"TaskState_{task.State}")</span>
        <h4 class="list-group-item-heading">@task.Title</h4>
        <div class="list-group-item-text">
            @task.CreationTime.ToString("yyyy-MM-dd HH:mm:ss") | @(task.AssignedPersonName ?? L("Unassigned"))
        </div>
    </li>
}
```

当我们运行应用程序时，我们可以在任务列表中看到它。

***任务创建的新应用服务方法***

我们可以列出任务，但我们还没有任务创建页面。首先，将Create方法添加到ITaskAppService接口：

```C#
public interface ITaskAppService : IApplicationService
{
    //...

    System.Threading.Tasks.Task Create(CreateTaskInput input);
}
```

并在TaskAppService类中实现它：

```C#
public class TaskAppService : SimpleTaskAppAppServiceBase, ITaskAppService
{
    private readonly IRepository<Task> _taskRepository;

    public TaskAppService(IRepository<Task> taskRepository)
    {
        _taskRepository = taskRepository;
    }

    //...

    public async System.Threading.Tasks.Task Create(CreateTaskInput input)
    {
        var task = ObjectMapper.Map<Task>(input);
        await _taskRepository.InsertAsync(task);
    }
}
```

Create方法自动将给定输入映射到Task实体并使用存储库插入数据库。CreateTaskInput DTO是这样的：

```C#
using System;
using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;

namespace Acme.SimpleTaskApp.Tasks.Dtos
{
    [AutoMapTo(typeof(Task))]
    public class CreateTaskInput
    {
        [Required]
        [StringLength(Task.MaxTitleLength)]
        public string Title { get; set; }

        [StringLength(Task.MaxDescriptionLength)]
        public string Description { get; set; }

        public Guid? AssignedPersonId { get; set; }
    }
}
```

配置为将其映射到任务实体（使用AutoMapTo属性）并添加数据注释以应用验证。我们使用Task实体中的常量来使用相同的最大长度。

***测试任务创建服务***

我在TaskAppService_Tests类中添加了一些集成测试来测试Create方法：

```C#
using Acme.SimpleTaskApp.Tasks;
using Acme.SimpleTaskApp.Tasks.Dtos;
using Shouldly;
using Xunit;
using System.Linq;
using Abp.Runtime.Validation;

namespace Acme.SimpleTaskApp.Tests.Tasks
{
    public class TaskAppService_Tests : SimpleTaskAppTestBase
    {
        private readonly ITaskAppService _taskAppService;

        public TaskAppService_Tests()
        {
            _taskAppService = Resolve<ITaskAppService>();
        }

        //...

        [Fact]
        public async System.Threading.Tasks.Task Should_Create_New_Task_With_Title()
        {
            await _taskAppService.Create(new CreateTaskInput
            {
                Title = "Newly created task #1"
            });

            UsingDbContext(context =>
            {
                var task1 = context.Tasks.FirstOrDefault(t => t.Title == "Newly created task #1");
                task1.ShouldNotBeNull();
            });
        }

        [Fact]
        public async System.Threading.Tasks.Task Should_Create_New_Task_With_Title_And_Assigned_Person()
        {
            var neo = UsingDbContext(context => context.People.Single(p => p.Name == "Neo"));

            await _taskAppService.Create(new CreateTaskInput
            {
                Title = "Newly created task #1",
                AssignedPersonId = neo.Id
            });

            UsingDbContext(context =>
            {
                var task1 = context.Tasks.FirstOrDefault(t => t.Title == "Newly created task #1");
                task1.ShouldNotBeNull();
                task1.AssignedPersonId.ShouldBe(neo.Id);
            });
        }

        [Fact]
        public async System.Threading.Tasks.Task Should_Not_Create_New_Task_Without_Title()
        {
            await Assert.ThrowsAsync<AbpValidationException>(async () =>
            {
                await _taskAppService.Create(new CreateTaskInput
                {
                    Title = null
                });
            });
        }
    }
}
```

第一个测试创建一个带有标题的任务，第二个测试创建一个带有标题和已分配人员的任务，最后一个尝试创建一个无效任务来显示例外情况。

***任务创建页面***

我们知道TaskAppService.Create正常工作。现在，我们可以创建一个页面来添加新任务。
首先，我向TaskController 添加了一个Create动作：

```C#
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Acme.SimpleTaskApp.Tasks;
using Acme.SimpleTaskApp.Tasks.Dtos;
using Acme.SimpleTaskApp.Web.Models.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Linq;
using Acme.SimpleTaskApp.Common;
using Acme.SimpleTaskApp.Web.Models.People;

namespace Acme.SimpleTaskApp.Web.Controllers
{
    public class TasksController : SimpleTaskAppControllerBase
    {
        private readonly ITaskAppService _taskAppService;
        private readonly ILookupAppService _lookupAppService;

        public TasksController(
            ITaskAppService taskAppService,
            ILookupAppService lookupAppService)
        {
            _taskAppService = taskAppService;
            _lookupAppService = lookupAppService;
        }

        //...

        public async Task<ActionResult> Create()
        {
            var peopleSelectListItems = (await _lookupAppService.GetPeopleComboboxItems()).Items
                .Select(p => p.ToSelectListItem())
                .ToList();

            peopleSelectListItems.Insert(0, new SelectListItem { Value = string.Empty, Text = L("Unassigned"), Selected = true });

            return View(new CreateTaskViewModel(peopleSelectListItems));
        }
    }
}
```

我注入了用于获取人们组合框项目的ILookupAppService。虽然我可以在这里直接注入和使用IRepository<Person，Guid>，但我更喜欢这样做以实现更好的分层和可重用性。ILookupAppService.GetPeopleComboboxItems在应用层中定义，如下所示：

```C#
public interface ILookupAppService : IApplicationService
{
    Task<ListResultDto<ComboboxItemDto>> GetPeopleComboboxItems();
}

public class LookupAppService : SimpleTaskAppAppServiceBase, ILookupAppService
{
    private readonly IRepository<Person, Guid> _personRepository;

    public LookupAppService(IRepository<Person, Guid> personRepository)
    {
        _personRepository = personRepository;
    }

    public async Task<ListResultDto<ComboboxItemDto>> GetPeopleComboboxItems()
    {
        var people = await _personRepository.GetAllListAsync();
        return new ListResultDto<ComboboxItemDto>(
            people.Select(p => new ComboboxItemDto(p.Id.ToString("D"), p.Name)).ToList()
        );
    }
}
```

ComboboxItemDto是一个简单的类（在ABP中定义），用于传输组合框项目数据。TaskController.Create方法只使用此方法并将返回的列表转换为SelectListItem列表（在AspNet Core中定义）并使用CreateTaskViewModel类传递给视图：

```C#
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Acme.SimpleTaskApp.Web.Models.People
{
    public class CreateTaskViewModel
    {
        public List<SelectListItem> People { get; set; }

        public CreateTaskViewModel(List<SelectListItem> people)
        {
            People = people;
        }
    }
}
```

创建视图如下所示：

```html
@using Acme.SimpleTaskApp.Web.Models.People
@model CreateTaskViewModel

@section scripts
{
    <environment names="Development">
        <script src="~/js/views/tasks/create.js"></script>
    </environment>

    <environment names="Staging,Production">
        <script src="~/js/views/tasks/create.min.js"></script>
    </environment>
}

<h2>
    @L("NewTask")
</h2>

<form id="TaskCreationForm">

    <div class="form-group">
        <label for="Title">@L("Title")</label>
        <input type="text" name="Title" class="form-control" placeholder="@L("Title")" required maxlength="@Acme.SimpleTaskApp.Tasks.Task.MaxTitleLength">
    </div>

    <div class="form-group">
        <label for="Description">@L("Description")</label>
        <input type="text" name="Description" class="form-control" placeholder="@L("Description")" maxlength="@Acme.SimpleTaskApp.Tasks.Task.MaxDescriptionLength">
    </div>

    <div class="form-group">
        @Html.Label(L("AssignedPerson"))
        @Html.DropDownList(
            "AssignedPersonId",
            Model.People,
            new
            {
                @class = "form-control",
                id = "AssignedPersonCombobox"
            })
    </div>

    <button type="submit" class="btn btn-default">@L("Save")</button>

</form>
```

我包括了这样定义的create.js：

```js
(function($) {
    $(function() {

        var _$form = $('#TaskCreationForm');

        _$form.find('input:first').focus();

        _$form.validate();

        _$form.find('button[type=submit]')
            .click(function(e) {
                e.preventDefault();

                if (!_$form.valid()) {
                    return;
                }

                var input = _$form.serializeFormToObject();
                abp.services.app.task.create(input)
                    .done(function() {
                        location.href = '/Tasks';
                    });
            });
    });
})(jQuery);
```

让我们看看这段JavaScript代码做了些什么：

- 准备表单的验证（使用jquery验证插件）并在Save按钮的单击上验证它。
- 使用serializeFormToObject jquery插件（在解决方案中的jquery-extensions.js中定义）将表单数据转换为JSON对象（我将jquery-extensions.js包含在_Layout.cshtml中作为最后一个脚本文件）。
- 使用abp.services.task.create方法调用TaskAppService.Create方法。这是ABP的重要特征之一。我们可以使用JavaScript代码中的应用程序服务，就像在代码中调用JavaScript方法一样。查看详情。

这是jquery-extensions.js的内容：

```js
(function ($) {
    //serializeFormToObject plugin for jQuery
    $.fn.serializeFormToObject = function () {
        //serialize to array
        var data = $(this).serializeArray();

        //add also disabled items
        $(':disabled[name]', this)
            .each(function () {
                data.push({ name: this.name, value: $(this).val() });
            });

        //map to object
        var obj = {};
        data.map(function (x) { obj[x.name] = x.value; });

        return obj;
    };
})(jQuery);
```

最后，我在任务列表页面添加了一个“添加任务”按钮，以便导航到任务创建页面：

```html
<a class="btn btn-primary btn-sm" asp-action="Create">@L("AddNew")</a>
```

***删除Home页和About页面***

如果我们不需要，我们可以从应用程序中删除Home和About页面。要做到这一点，首先像这样更改HomeController：

```C#
using Microsoft.AspNetCore.Mvc;

namespace Acme.SimpleTaskApp.Web.Controllers
{
    public class HomeController : SimpleTaskAppControllerBase
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Tasks");
        }
    }
}
```

然后删除Views/Home文件夹并从SimpleTaskApp NavigationProvider类中删除菜单项。您还可以从本地化JSON文件中删除不必要的密钥。

### 源代码

你可以在这里获得最新的[源代码](https://github.com/aspnetboilerplate/aspnetboilerplate-samples/tree/master/SimpleTaskSystem-Core)

## 模块系统

- `ASP.NET Boilerplate`提供了构建模块的基础结构，并将它们组合在一起以创建应用程序。模块可以依赖于另一个模块。通常，组件被视为模块。如果创建具有多个程序集的应用程序，则建议您为每个程序集创建一个模块定义。

  模块系统目前专注于服务器端而不是客户端。

### 模块定义

- 模块定义有一个类，该类派生自ABP包中的`AbpModule`。假设我们正在开发一个可以在不同应用程序中使用的Blog模块。最简单的模块定义如下所示：

  ```C#
  public class MyBlogApplicationModule : AbpModule
  {
      public override void Initialize()
      {
          IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
      }
  }
  ```
  
  如果需要，模块定义类负责通过依赖注入来注册其类 （它可以按常规方式完成，如上所示）。它还可以配置应用程序和其他模块，为应用程序添加新功能，等等......

### 生命周期方法

- `ASP.NET Boilerplate`在应用程序启动和关闭时调用某些特定的模块方法。您可以覆盖这些方法以执行某些特定任务。
  
  `ASP.NET Boilerplate`调用依赖项排序的这些方法。如果模块A依赖于模块B，则模块B在模块A之前初始化。

  启动方法的确切顺序：PreInitialize-B，PreInitialize-A，Initialize-B，Initialize-A，PostInitialize-B 和 PostInitialize-A。所有依赖图都是如此。该关闭方法也相似，但在相反的顺序。

#### 预初始化

- 当应用程序启动时，首先调用此方法。这是在初始化之前配置框架和其他模块的首选方法。

  您还可以在此处编写一些特定代码，以便在依赖注入注册之前运行。例如，如果您创建传统的注册类，则应使用IocManager.AddConventionalRegisterer方法在此处注册它。

#### 初始化

- 这是应该进行依赖注入注册的地方。它通常使用`IocManager.RegisterAssemblyByConvention`方法完成。如果要定义自定义依赖项注册，请参阅依赖项注入文档。

#### 初始化完成

- 此方法在启动过程中最后调用。在这里解决依赖是安全的。

#### 关闭

- 应用程序关闭时调用此方法。

### 模块依赖性

- 模块可以依赖于另一个模块。您需要使用 `DependsOn` 属性显式声明依赖项，如下所示：

  ```C#
  [DependsOn(typeof(MyBlogCoreModule))]
  public class MyBlogApplicationModule : AbpModule
  {
      public override void Initialize()
      {
          IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
      }
  }
  ```

  在这里，我们向`ASP.NET Boilerplate`声明`MyBlogApplicationModule`依赖于`MyBlogCoreModule`，而`MyBlogCoreModule`应该在`MyBlogApplicationModule`之前初始化。

  ABP可以从启动模块开始递归地解析依赖关系并相应地初始化它们。启动模块初始化为最后一个模块。

### 插件模块

## 多租户

**什么是多租户？**

- 软件多租户是指软件架构，其中单个软件实例在服务器上运行并为多个租户提供服务。
  
  租户是一组用户，他们共享具有软件实例特定权限的公共访问权限。
  
  使用多租户架构，软件应用程序旨在为每个租户提供实例的专用共享，包括其数据，配置，用户管理，租户个人功能和非功能属性。
  
  多租户与多实例架构形成对比，其中单独的软件实例代表不同的操作租户。
  
  简而言之，多租户是一种用于创建SaaS （软件即服务）应用程序的技术。

***数据库和部署架构***

- 有一些不同的多租户数据库和部署方法：

  - 多部署 - 多个数据库

    实际上这不是多租户，但如果我们为每个客户（租户）运行一个应用程序实例并使用单独的数据库，我们可以在一台服务器上为多个租户提供服务。我们只需要确保应用程序的多个实例在同一服务器环境中不会相互冲突。

    对于未设计为多租户的现有应用程序，这也是可能的。由于应用程序不了解多租户，因此创建此类应用程序更容易。但是，这种方法存在设置，利用和维护问题。

  - 单一部署 - 多个数据库

    在这种方法中，我们在服务器上运行应用程序的单个实例。我们有一个主（主机）数据库来存储租户元数据（如租户名称和子域）以及每个租户的单独数据库。一旦我们识别出当前的租户（例如，来自子域或来自用户登录表单），我们就可以切换到该租户的数据库来执行操作。

    在这种方法中，应用程序应该在某种程度上被设计为多租户，但是大多数应用程序可以保持独立于它。

    我们为每个租户创建和维护一个单独的数据库，包括数据库迁移。如果我们有许多具有专用数据库的客户，则在应用程序更新期间迁移数据库模式可能需要很长时间。由于每个租户都有一个单独的数据库，因此我们可以将其数据库与其他租户分开备份。如果租户需要，我们还可以将租户数据库移动到更强大的服务器。

  - 单一部署 - 单个数据库

    这是最理想的多租户架构：我们只将单个数据库的单个应用程序实例部署到单个服务器上。我们在每个表（对于RDBMS）中都有一个TenantId（或类似）字段，用于将租户的数据与其他人隔离。

    这种类型的应用程序易于设置和维护，但更难创建。这是因为我们必须阻止租户阅读或写入其他租户数据。我们可以为每个数据库读取（选择）操作添加一个TenantId过滤器。我们也可以在每次写作时检查它，看看这个实体是否与当前租户有关。这很乏味且容易出错。但是，`ASP.NET Boilerplate`通过使用自动数据过滤来帮助我们。

    如果我们有许多拥有大量数据集的租户，这种方法可能会出现性能问题。我们可以使用表分区或其他数据库功能来解决此问题。

  - 单一部署 - 混合数据库

    我们可能希望将租户正常存储在单个数据库中，但可能希望为所需租户创建单独的数据库。例如，我们可以将拥有大数据的租户存储在他们自己的数据库中，但将所有其他租户存储在一个数据库中。

  - 多部署 - 单/多/混合数据库

    最后，我们可能希望将我们的应用程序部署到多个服务器（如Web场），以获得更好的应用程序性能，高可用性和可伸缩性。这与数据库方法无关。
