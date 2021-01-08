# 武器库

> 工欲善其事，必先利其器

1. 开发工具
   - [代码生成器](#代码生成器)
   - [EditPlus](#EditPlus)
   - [UltraEdit](#UltraEdit)
   - [Notepad++](#Notepad++)
   - [VSCode](#VSCode)
   - [VSStudio](#VSStudio)

   - [JetBrain](#JetBrain)

   - [Make](#make)
   - [Cygwin & MinGW](#Cygwin&MinGW)
2. 运维工具

   - [vmware](#vmware)
- [Sunny-Ngrok](#Sunny-Ngrok)
   - [Vagrant](#Vagrant)
   - [Log查看器](#Log查看器)
3. 管理工具
   - [git](#git)
   - [svn](#svn)
4. 文档工具
   - [XMind](#XMind)
   - [Markdown](#Markdown)



## 开发工具



### 代码生成器

> 项目负责人要有意识的提高团队的开发效率！

老的代码生成器的地址：https://www.cnblogs.com/skyme/archive/2011/12/22/2297592.html

#### 懒猴子CG

懒猴子CG支持在线搭建dubbo、springboot、springcloud等框架，支持在线生成swagger实体类等，支持自定义模版，支持多种语言的代码生成。这款生成器是国人研发的，站长迭代速度快，社区活跃，文档齐全。是一款及其灵活的生成器！推荐使用！

官方网址：http://cg.lazy-monkey.com/ 免费

#### IT猿网

在线代码生成器，好处就是方便。重点是连验证码都能在线调试好生成java代码直接使用。

官方网址：https://tool.ityuan.com/captcha 免费

#### listcode

一个超级强大的代码生成器网站，这个代码生成器非常完善， java，php，python，nodejs都支持，前后端分离，翻页，联合查询都做了，当之无愧的代码生成器中的战斗机。

官网地址：https://www.listcode.cn/ 收费

#### magicalcoder

机械的增删改查基础代码和界面功能，自由拖拽定制，面向零基础，拖拽式编程，赋能企业，前后端代码一键生成，能够有效的提升效率。先不讲东西好不好，但他们的理念很贴心：把简单的重复劳动交给我们，把高大上的智力输出交给您，最终提高个人和团队的整体开发效率；我们希望您省下来的时间能多陪陪家人。

官网：http://bbs.magicalcoder.com/ 免费

#### MyBatis-Plus

官网：[MyBatis-Plus](https://baomidou.com/)

#### code-generation

一个小型的业务项目，通常不需要很复杂的架构，一般就是通过单个或两个项目来实现。我们先来看下最基础的开发流程：

1. 了解需求（项目负责人）
2. 设计表结构（项目负责人）
3. 创建基础框架（项目负责人）
4. 制定开发计划，按模块分配任务（项目负责人）
5. 进行模块开发（程序员A、B、C）
6. 测试、上线

程序员进行模块开发的方式有以下几种：

1. 根据表结构设计，手工创建model，然后copy UserDao改名为CompanyDao，copy UserServiceImpl改名为CompanyServiceImpl，并修改引用的UserDao为CompanyDao等；
2. 根据表结构设计，使用工具生成model，后续步骤同1。

如果不细心，总是要修改个两三遍才能让一个模块有一个架子，然后再开始进行真正关心的业务开发，而这时候时间可能已经过去了一个小时，或许更久。

程序员在开发时应该“懒”一点，如果类似的代码多次出现，不要在copy了，提取为公共的方法；如果类似的copy、修改的操作重复的出现的一个项目、不同的项目里，那就写个代码生成器吧，一键完成你手工几十步的操作。

代码生成器是用来生成有规律的代码的，就如controller、service、serviceImpl、dao、daoImpl、model、jsp的结构，用户、角色、权限等等模块都有类似的结构，代码生成器可以代替我们的copy操作，自动生成这些不同业务对象的模板代码。

**代码生成器怎么实现？**

代码生成器的实现由很多种，我们以从mysql数据库表结构生成对应代码为例来说明如何实现一个代码生成器。有以下几个重点：

1. 提前搭建好项目基础框架，因为生成的就是基础框架的模板代码
2. 获取某个数据库内的表及表结构信息，用于生成model及其他代码
3. 使用freemarker进行模板生成

**1、提取基础框架**

如公司项目都是前后端分离的，那我就提取了一个[rest-base](https://link.jianshu.com?t=https://github.com/q7322068/rest-base)项目作为基础框架，该框架满足绝大部分公司项目开发所需的基础功能

**2、获取数据库表结构**

```sql
-- 获取所有库
select DISTINCT(TABLE_SCHEMA) from information_schema.`TABLES`;
-- 获取所有表
SELECT TABLE_NAME as tableName,TABLE_COMMENT as tableComment 
from information_schema.`TABLES` 
where TABLE_SCHEMA='test';
-- 获取某个表的结构
select COLUMN_NAME as columnName,COLUMN_TYPE as columnType,COLUMN_DEFAULT as columnDefault
    ,COLUMN_COMMENT as columnComment,CHARACTER_MAXIMUM_LENGTH as columnCharacterMaximumLength 
from information_schema.columns 
where table_schema = 'test' 
  and table_name = 'rule'; 
```

通过查询information_schema库内的TABLES、columns表，可以获取数据内的表、表字段属性等。然后就可以以此来确定model的内容，如表user_role对应的实体就是UserRole，表字段和实体属性可以根据类型和规则进行映射。

**freemarker生成模板代码**

先大致讲下思路：

1. 根据表名，按规则获取实体名称，从而也确认了dao、service等的类名；
2. 将表字段转为map结构，作为参数传入model对于的模板内，从而生成对应的model类；
3. 依次传入参数，通过模板生成dao、service等代码

需要会一点freemarker的语法，基本上看个一小时就达到了写简单模板的程度了。

**接口：**

```java
public interface GeneratorHelperService {

    /**
     * 设置公共参数，如
     * projectPath 要生成代码的项目的路径：  D:/workspace/code-generator
     * packagePath 要生成代码的项目的包的根路径：/src/main/java/com/hexun/bdc/generator
     * templetePath 本项目内代码模板路径： /src/main/resources/code-templete
     */
    boolean setProperty(Map<String, String> map);

    /**
     * 生成某个库内所有表对应的代码
     * @author yangwenkui
     * @time 2017年10月29日 下午8:22:35
     * @param dbname 数据库名称
     * @return
     */
    boolean allTables(String dbname);

    /**
     * 生成某个库内某个表对应的代码
     * @author yangwenkui
     * @time 2017年10月29日 下午8:22:35
     * @param dbname 数据库名称
     * @param tableName 表名称
     * @return
     */
    boolean oneTable(String dbname, String tableName);

}
```

**实现：**

```java
@Service("generatorHelperService")
public class GeneratorHelperServiceImpl implements GeneratorHelperService {

    private static Logger logger = LoggerFactory.getLogger(GeneratorHelperServiceImpl.class);

    private static Map<String, String> propertyMap = Maps.newConcurrentMap();

    @Autowired
    GeneratorHelperDao generatorHelperDao;
    
    @Value("${generator.project.path}")
    private String localProjectPath;

    @Override
    public boolean setProperty(Map<String, String> map) {
        propertyMap.putAll(map);
        return true;
    }

    @Override
    public boolean allTables(String dbname) {
        List<Object> tables = generatorHelperDao.listAllTable(dbname);
        for (Object item : tables) {
            Object[] arr = (Object[]) item;
            TableInfo tableInfo = new TableInfo(arr);
            boolean success = generateCode(dbname, tableInfo);
            if (!success) {
                logger.error("generator code table=[{}] fail", item.toString());
            }
        }
        return true;
    }

    @Override
    public boolean oneTable(String dbname, String tableName) {
        Object entity = generatorHelperDao.findTableInfo(dbname, tableName);
        Object[] arr = (Object[]) entity;
        TableInfo tableInfo = new TableInfo(arr);
        return generateCode(dbname, tableInfo);
    }

    private boolean generateCode(String dbname, TableInfo item) {
        List<Object> list = generatorHelperDao.listColumInfos(dbname, item.getTabelName());
        List<ColumnInfo> columnInfos = new ArrayList<ColumnInfo>(list.size());
        String idType = "String";
        for (Object obj : list) {
            Object[] arr = (Object[]) obj;
            ColumnInfo columnInfo = new ColumnInfo(arr);
            columnInfos.add(columnInfo);
            if("id".equals(arr[0])){
                if("int".equals(columnInfo.getModelType())){
                    idType = "Integer";
                } else if("long".equals(columnInfo.getModelType())){
                    idType = "Long";
                }
            }
        }
        item.setIdType(idType);
        createModel(item, columnInfos);
        createOther(item,"dao");
        createOther(item,"service");
        createOther(item,"serviceImpl");
        createOther(item,"controller");
        return true;
    }

    
    private void createModel(TableInfo item, List<ColumnInfo> columnInfos) {
        String path = getUpPath();
        String dir = String.format("%s/domain",path);
        File file = new File(dir);
        if(!file.exists()){
            file.mkdirs();
        }
        String templetePath = String.format("%s%s", localProjectPath,propertyMap.get("templetePath"));
        String filePath = String.format("%s/%s.java", dir,item.getModleName());
        
        Map<String, Object> data = Maps.newHashMap();
        data.put("proList", columnInfos);
        data.put("modelParam", String.format("%s%s",item.getModleName().substring(0, 1).toLowerCase(),item.getModleName().substring(1)));
        data.put("modellower", item.getModleName().toLowerCase());
        data.put("tableInfo", item);
        data.put("packagePath", Joiner.on(".").join(propertyMap.get("packagePath").split("/")).substring(15));
        createTempleteFile(filePath,templetePath,"domain.flt",data);
        
    }

    private void createTempleteFile(String filename, String templetePath,String templeteName,
            Map<String, Object> data) {
        try {
            Configuration cfg = new Configuration();  
            cfg.setDirectoryForTemplateLoading(new File(templetePath)); 
            cfg.setObjectWrapper(new DefaultObjectWrapper());  
              
            //设置字符集  
            cfg.setDefaultEncoding("UTF-8");  
              
            //设置尖括号语法和方括号语法,默认是自动检测语法  
            //  自动 AUTO_DETECT_TAG_SYNTAX  
            //  尖括号 ANGLE_BRACKET_TAG_SYNTAX  
            //  方括号 SQUARE_BRACKET_TAG_SYNTAX  
            cfg.setTagSyntax(Configuration.AUTO_DETECT_TAG_SYNTAX);  
  
            Writer out = new OutputStreamWriter(new FileOutputStream(filename),"UTF-8");  
            Template temp = cfg.getTemplate(templeteName);  
            temp.process(data, out); 
            out.flush();
            out.close();
        }catch (Exception e) {
            logger.error("process due to erro",e);
        }  
    }


    private String getUpPath() {
        return String.format("%s/%s", propertyMap.get("projectPath"),
                propertyMap.get("packagePath"));
    }

    private void createOther(TableInfo item,String type) {
        String path = getUpPath();
        String lastDir = type;
        if("serviceImpl".equals(type)){
            lastDir = "service/impl";
        }
        
        String dir = String.format("%s/%s",path,lastDir);
        File file = new File(dir);
        if(!file.exists()){
            file.mkdirs();
        }
        String templetePath = String.format("%s%s", localProjectPath,propertyMap.get("templetePath"));
        String filePath = String.format("%s/%s.java", dir,item.getModleName()+type.substring(0,1).toUpperCase()+type.substring(1));
        
        Map<String, Object> data = Maps.newHashMap();
        data.put("modelParam", String.format("%s%s",item.getModleName().substring(0, 1).toLowerCase(),item.getModleName().substring(1)));
        data.put("modellower", item.getModleName().toLowerCase());
        data.put("item", item);
        data.put("packagePath", Joiner.on(".").join(propertyMap.get("packagePath").split("/")).substring(15));
        
        createTempleteFile(filePath,templetePath,String.format("%s.flt", type),data);
    }

}
```

**model模板(domain.flt)：**

```java
package ${packagePath}.domain;

import io.swagger.annotations.ApiModelProperty;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

/**
 * ${tableInfo.tableComment}
 */
@Entity
@Table(name = "${tableInfo.tabelName}")
public class  ${tableInfo.modleName} {
    
<#list proList as item>
<#if item.modelName == "id">

    @ApiModelProperty(value="主键")
    @Id
    <#if item.modelType == "int">
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    </#if>
    <#if item.modelType == "long">
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    </#if>
    <#if item.modelType == "String">
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid",strategy="uuid")
    @Column(length=${item.modelCharacterMaximumLength})
    private String id;//主键
    
    </#if>
<#else>
    @ApiModelProperty(value="${item.modelComment}") 
    @Column(name="${item.columnName}"<#if (item.modelCharacterMaximumLength?exists && item.modelType == "String" && item.modelCharacterMaximumLength?number<=255)>,length=${item.modelCharacterMaximumLength}</#if><#if item.modelDefault?exists && item.modelDefault != "">,columnDefinition="${item.modelDefault}"</#if>)
    private ${item.modelType} ${item.modelName};
    
</#if>
</#list>
<#list proList as item>
    public ${item.modelType} get${item.modelNameFirstUpper}() {
        return ${item.modelName};
    }

    public void set${item.modelNameFirstUpper}(${item.modelType} ${item.modelName}) {
        this.${item.modelName} = ${item.modelName};
    }
    
</#list>

    @Override
    public String toString() {
        return String.format("${tableInfo.modleName} [<#list proList as item>, ${item.modelName}=%s</#list>]"
                      <#list proList as item>, ${item.modelName}</#list>);
    }

}
```

**dao模板(dao.flt)：**

```java
package ${packagePath}.dao;

import com.hexun.bdc.base.component.common.BaseDao;
import ${packagePath}.domain.${item.modleName};

public interface ${item.modleName}Dao extends BaseDao<${item.modleName}, ${item.idType}>{

}
```

代码逻辑不复杂，service提供了三个接口，setProperty用于设置要生成的代码的路径及包名等，allTables用于初次生成，一次生成一个库内所有表对应的代码；oneTable用于生成指定表对应的代码，注意代码开发一段时间后，不要在上传至svn之前给覆盖了。
完整代码在[code-generation](https://link.jianshu.com?t=https://github.com/q7322068/code-generation)，在此基础上，你可以很快修改出适合你公司的代码生成器！

**参考：**

- [开源中国](https://www.oschina.net/project/tag/407/code-generator)



### VSCode

#### 环境搭建

**调试C#控制台应用**

- A-[环境安装](https://www.microsoft.com/net/download)

  下载 [.NET Core SDK Installer](https://www.microsoft.com/net/download/core)

  [VSCode](https://code.visualstudio.com/)

  VSCode C#插件：可以在安装好的VSCode里的插件扩展中搜索安装：

  ![x](E:/WorkingDir/Office/Arts/Resource/5.png)

- B-创建项目

  1. 先打开VSCode
  2. 在CTRL+R，输入CMD调出控制台程序（或者在VSCode中的终端cmd输入框中），并输入命令：cd 文件目录 （转到创建项目的文件夹）
  3. 然后输入命令：dotnet new --help （会出现创建新项目命令的提示信息）
  4. 然后创建一个简单控制台程序如：dotnet new console （创建控制台应用程序，.net core2.02版本已经可以在创建程序时，自动还原所需的nuget包了，也就是自动执行了命令： dotnet restore）
     使用命令：dotnet run   （可以在控制台运行创建的控制台程序）
  5. 最后通过VS Code打开项目所在文件夹，会自动下载`.NET Core Debugger`，等待下载安装（安装调式插件）
  6. 安装成功。 重新使用VSCode打开我们的创建项目的目录文件夹。

  VS Code是可以自动配置的，注意刚打开项目的时候有条提示：

  ![x](E:/WorkingDir/Office/Arts/Resource/6.png)

  点击yes自动配置，再点击Restore

  .net core2.02版本已经可以在创建程序时，自动还原所需的nuget包了，也就是自动执行了命令： dotnet restore，因此编译这一步就可以省略了...

- C-调试

  F5运行之后使用浏览器访问程序：[http://localhost:5000/](http://localhost:5000/)。（如果想调试的话需要配置launch.json和tasks.json）或者 安装图形操作就可以了：

  ![x](E:/WorkingDir/Office/Arts/Resource/7.png)

- D-备注

  推荐两个开发C#非常实用的插件：

  1. XML Documentation Comments Support for Visual Studio Code

     这个插件是实现和vs一样的xml注释。比如按三下///自动补全

  2. .NET Core Project Manager (Nuget)

     这个插件是可以搜索Nuget包并自动向project.json添加

  目前Visual Studio Code里官方C#插件只支持.NET Core编译调试。暂不支持Mono和传统.NET Framework

- E-发布

  准备发布 部署.net core项目到iis服务器

  1. 需要下载安装window server hosting：[https://www.microsoft.com/net/download/core#/runtime](https://www.microsoft.com/net/download/core#/runtime)；
  2. 安装完成以后，在vs终端运行命令  dotnet publish -c release，回车即可在当前项目文件夹bin/release/下生成可部署文件夹publish；
  3. 在iis服务器上添加网站，地址指定到刚才生成的可部署文件夹，运行站点，即可看到.net core开发的第一个站点运行起来啦；

  注：Microsoft弃用了project.json，转回使用.csproj文件

### 调试.NET&nbsp;Core&nbsp;WebApi

1、安装Visual Studio Code

安装好之后, 可以选择把vscode添加到Path:

使用command+option+p(mac)或者ctrl+shift+p(win)打开命令板, 输入path, 选择install code command in path.

![x](E:/WorkingDir/Office/Arts/Resource/9.png)

然后打开命令行 输入 code. 如果vscode能打开当前目录, 那么说明操作成功了.

2、安装.net core sdk

到官网下载并安装相应平台的.net core sdk: `https://dotnet.github.io`

安装好之后, 打开命令行: 执行dotnet --version, 可以看到版本号, 这就说明安装成功了.

3、编写Demo程序

```sh
dotnet new webapi --初始化项目
dotnet run --运行项目
```

## git配置

### git集成

vscode中对git进行了集成，很多操作只需点击就能操作，无需写一些git指令。

不过这就需要你对vscode进行配置。下面我会讲到git的配置与免密码上传github

首先需要你的电脑上已经安装了git，且window电脑里git添加到环境变量中去了。

![x](E:/WorkingDir/Office/Arts/Resource/10.png)

这样你的电脑就可以使用git了，但是想要在vccode中使用git还要配置git.path。

git.path是git中的一个exe文件路径，找到你的电脑git的安装目录，找到里面的cmd文件夹。里面的git.exe文件把该文件的完整路径复制下来。

![x](E:/WorkingDir/Office/Arts/Resource/11.png)

点击设置在设置里找到git设置里面的git.path选项。将设置复制到右边的用户默认设置

![x](E:/WorkingDir/Office/Arts/Resource/12.png)

把git.exe文件的路径复制到这里就可以了。

### git使用

![x](E:/WorkingDir/Office/Arts/Resource/13.png)

先输入指令git init在文件夹创建git相关配置文件，然后执行上面几句，当前分支就是主分支，上传到github上了

这样每次上传是都需要输入git仓库的用户名和密码（这里也就是github的用户名和密码）

### github免密上传

git的免密码上传的设置为，找到文件夹的.git文件夹里面配置文件config

![x](E:/WorkingDir/Office/Arts/REsource/14.png)

里面的url本来为`https://github.com/****/****.git`

替换为`https://github用户名:github密码@github.com/****/****.git`，这样每次推送到github仓库就不需要输入账户和密码了

## 快捷键

Ctrl+P 查找插件，Ctrl+`打开命令行

主命令框

F1 或 Ctrl+Shift+P: 打开命令面板。在打开的输入框内，可以输入任何命令，例如：

- 按一下 Backspace 会进入到 Ctrl+P 模式
- 在 Ctrl+P 下输入 > 可以进入 Ctrl+Shift+P 模式

在 Ctrl+P 窗口下还可以:

- 直接输入文件名，跳转到文件
- ? 列出当前可执行的动作
- ! 显示 Errors或 Warnings，也可以 Ctrl+Shift+M
- : 跳转到行数，也可以 Ctrl+G 直接进入
- @ 跳转到 symbol（搜索变量或者函数），也可以 Ctrl+Shift+O 直接进入
- @ 根据分类跳转 symbol，查找属性或函数，也可以 Ctrl+Shift+O 后输入:进入
- `#` 根据名字查找 symbol，也可以 Ctrl+T

编辑器与窗口管理

1. 打开一个新窗口： Ctrl+Shift+N
2. 关闭窗口： Ctrl+Shift+W
3. 同时打开多个编辑器（查看多个文件）
4. 新建文件 Ctrl+N
5. 文件之间切换 Ctrl+Tab
6. 切出一个新的编辑器（最多 3 个） Ctrl+\，也可以按住 Ctrl 鼠标点击 Explorer 里的文件名
7. 左中右 3 个编辑器的快捷键 Ctrl+1 Ctrl+2 Ctrl+3
8. 3 个编辑器之间循环切换 Ctrl+
9. 编辑器换位置， Ctrl+k然后按 Left或 Right

格式调整

1. 代码行缩进 Ctrl+[ 、 Ctrl+]
2. Ctrl+C、Ctrl+V 复制或剪切当前行/当前选中内容
3. 代码格式化：Shift+Alt+F 或 Ctrl+Shift+P 后输入 format code
4. 上下移动一行： Alt+Up 或 Alt+Down
5. 向上向下复制一行： Shift+Alt+Up 或 Shift+Alt+Down
6. 在当前行下边插入一行 Ctrl+Enter
7. 在当前行上方插入一行 Ctrl+Shift+Enter

光标相关

1. 移动到行首： Home
2. 移动到行尾： End
3. 移动到文件结尾： Ctrl+End
4. 移动到文件开头： Ctrl+Home
5. 移动到定义处： F12
6. 定义处缩略图：只看一眼而不跳转过去 Alt+F12
7. 移动到后半个括号： Ctrl+Shift+]
8. 选择从光标到行尾： Shift+End
9. 选择从行首到光标处： Shift+Home
10. 删除光标右侧的所有字： Ctrl+Delete
11. 扩展/缩小选取范围： Shift+Alt+Left 和 Shift+Alt+Right
12. 多行编辑(列编辑)：Alt+Shift+鼠标左键，Ctrl+Alt+Down/Up
13. 同时选中所有匹配： Ctrl+Shift+L
14. Ctrl+D 下一个匹配的也被选中 (在 sublime 中是删除当前行，后面自定义快键键中，设置与 Ctrl+Shift+K 互换了)
15. 回退上一个光标操作： Ctrl+U

重构代码

1. 找到所有的引用： Shift+F12
2. 同时修改本文件中所有匹配的： Ctrl+F12
3. 重命名：比如要修改一个方法名，可以选中后按 F2，输入新的名字，回车，会发现所有的文件都修改了
4. 跳转到下一个 Error 或 Warning：当有多个错误时可以按 F8 逐个跳转
5. 查看 diff： 在 explorer 里选择文件右键 Set file to compare，然后需要对比的文件上右键选择 Compare with file_name_you_chose

查找替换

1. 查找 Ctrl+F
2. 查找替换 Ctrl+H
3. 整个文件夹中查找 Ctrl+Shift+F

显示相关

1. 全屏：F11
2. zoomIn/zoomOut：Ctrl +/-
3. 侧边栏显/隐：Ctrl+B
4. 显示资源管理器 Ctrl+Shift+E
5. 显示搜索 Ctrl+Shift+F
6. 显示 Git Ctrl+Shift+G
7. 显示 Debug Ctrl+Shift+D
8. 显示 Output Ctrl+Shift+U

其他

- 自动保存：File -> AutoSave ，或者 Ctrl+Shift+P，输入 auto

修改默认快捷键

打开默认键盘快捷方式设置：

File -> Preferences -> Keyboard Shortcuts，或者：Alt+F -> p -> k

修改 keybindings.json：

```json
// Place your key bindings in this file to overwrite the defaults
[
    // ctrl+space 被切换输入法快捷键占用
    {
        "key": "ctrl+alt+space",
        "command": "editor.action.triggerSuggest",
        "when": "editorTextFocus"
    },
    // ctrl+d 删除一行
    {
        "key": "ctrl+d",
        "command": "editor.action.deleteLines",
        "when": "editorTextFocus"
    },
    // 与删除一行的快捷键互换
    {
        "key": "ctrl+shift+k",
        "command": "editor.action.addSelectionToNextFindMatch",
        "when": "editorFocus"
    },
    // ctrl+shift+/多行注释
    {
        "key":"ctrl+shift+/",
        "command": "editor.action.blockComment",
        "when": "editorTextFocus"
    },
    // 定制与 sublime 相同的大小写转换快捷键，需安装 TextTransform 插件
    {
        "key": "ctrl+k ctrl+u",
        "command": "uppercase",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+k ctrl+l",
        "command": "lowercase",
        "when": "editorTextFocus"
    }
]
```

前端开发必备插件

- PostCSS Sorting
- stylelint
- stylefmt
- ESLint
- javascript standard format
- beautify
- Babel ES6/ES7
- Debugger for Chrome
- Add jsdoc comments
- javascript(ES6) code snippets
- vue
- weex
- Reactjs code snippets
- React Native Tools
- Npm Intellisense
- Instant Markdown
- Markdown Shortcuts
- TextTransform

自定义设置参考

vscode 自定义配置参考：

```json
{
    "editor.fontSize": 18,
    "files.associations": {
        "*.es": "javascript",
        "*.es6": "javascript"
    },
    // 控制编辑器是否应呈现空白字符
    "editor.renderWhitespace": true,
    // 启用后，将在保存文件时剪裁尾随空格。
    "files.trimTrailingWhitespace": true,
    // File extensions that can be beautified as javascript or JSON.
    "beautify.JSfiles": [
        "",
        "es",
        "es6",
        "js",
        "json",
        "jsbeautifyrc",
        "jshintrc"
    ]
}
```

相关参考

官方快捷键大全：

[https://code.visualstudio.com/docs/customization/keybindings](https://code.visualstudio.com/docs/customization/keybindings)

[http://blog.csdn.net/u010019717/article/details/50443970](http://blog.csdn.net/u010019717/article/details/50443970)

## 配置项

```json
{
  "jshint.enable": false,
  // 添加 vue 支持
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    {
      "language": "html",
      "autoFix": true
    }
  ],
  "files.associations": {
    "*.vue": "vue"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  // #每次保存的时候将代码按eslint格式进行修复
  "eslint.autoFixOnSave": true,
  //  #让prettier使用eslint的代码格式进行校验
  "prettier.eslintIntegration": true,
  //  #去掉代码结尾的分号
  "prettier.semi": false,
  //  #使用带引号替代双引号
  "prettier.singleQuote": true,
  //  #让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // #这个按用户自身习惯选择
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // #让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
      // #vue组件中html代码格式化样式
    }
  },
  // 格式化stylus, 需安装Manta's Stylus Supremacy插件
  "stylusSupremacy.insertColons": false, // 是否插入冒号
  "stylusSupremacy.insertSemicolons": false, // 是否插入分好
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "editor.tabSize": 2,
  "workbench.activityBar.visible": true,
  "workbench.statusBar.visible": true,
  "window.menuBarVisibility": "default",
  "editor.minimap.enabled": false, // 两个选择器中是否换行
  "markdown.extension.tableFormatter.enabled": false, // 表格格式化
  "markdownlint.config": {
    "MD033": false // 是否允许插入html
  },
  "search.followSymlinks": false
}
```

## 问题

### rg.exe占用CPU过高

解决方法：添加如下配置

```json
"search.followSymlinks": false
```



# VSStudio

## vs2019使用.NETCore3.0

![x](./Resource/8.png)



# Notepad++

## 环境配置

### Java

1. 安装JDK

   为了能够在控制台窗口中方便的使用JDK中的工具，需要在Windows系统环境变量PATH中追加JDK二进制（bin）文件所在的路径，在控制台窗口中执行如下命令，更新PATH环境变量。

   ```sh
   set path=.;%path%;E:/Program Files/Java/jdk1.6.0_02/bin
   ```

2. 安装Notepad++

   Notepad++是运行在Windows操作系统下的一款代码编辑器软件，能够对绝大多数的编程语言进行语法着色，为自由软件，遵循GPL。

3. 配置Notepad++

   3.1 单词自动补全功能配置

   (何为单词自动补全：你的源文件以前输入过的单词，即token，会缓存下来， 当你输入一个字符后会显示出来，按回车选中) Notepad++提供了一系列编程相关的功能，如自动识别源代码类型，支持自动缩进，语法着色，支持单词/函数名称自动补全功能等。Notepad++ 默认设置支持了大部分代码编写功能，下面将使Notepad++支持“单词自动补全”功能。

   点击“设置”菜单，选择“首选项”菜单项，弹出“首选项对话框”，选中“备份与自动完成”，在此标签页底部中选中“所有输入均启用自动完成”复选框，并选择“单词自动完成”。

   3.2 Notepad++的插件NppExec实现Console Dialog，此插件可以完成Windows控制台基本功能，如可以在此窗口中进行编译、运行Java程序；Notepad++还能够运行外部程序，通过 菜单项与外部程序建立映射关系，支持为外部程序输入参数等。

   3.3 Console Dialog作为Java开发环境

   显示Console Dialog对话框

   点击“插件”主菜单，在其下拉菜单中选中“NppExec”，在二级菜单中选中“Show Console Dialog”。

   默认在编辑器的底部出现Console Dialog。

   编辑Java源文件

   新建一个Java源文件HelloNpp.java，在编辑器中输入如下内容：

   ```java
   public class HelloNpp{
       public static void main(String[] args){
           System.out.println("Hello Notepad++!");
       }
   }
   
   3.4 编译运行Java程序
   
   notepad有两个运行代码的功能，一个是Run(F5)，另一个是Plugins -> NppExec(F6),用前者实现比较困难，所以选择后者，他带的命令行模拟非常好用。
   
   首先按F6，会弹出执行命令的对话框，在Command(s)中输入下列三行：
   
   ​```sh
   npp_save //转载注：保存文件
   cd "$(CURRENT_DIRECTORY)"
   D:/jdk1.6.0_10/bin/Javac.exe "$(FILE_NAME)"// 转载注：java PATH已经设置好了，可以直接使用:Javac.exe "$(FILE_NAME)"
   D:/jdk1.6.0_10/bin/java.exe "$(NAME_PART)"// java.exe "$(NAME_PART)"
   javaRunWin:
   cd "$(CURRENT_DIRECTORY)"
   jar -cvfe "$(NAME_PART)".jar "$(NAME_PART)" *.class
   java与package:
   npp_save
   cd "$(CURRENT_DIRECTORY)"
   Javac -d . "$(FILE_NAME)"
   ```

   这里解释一下notepad++的环境变量，CURRENT_DIRECTORY表示当前路径，就是当前编辑文件的路径。然后另存为BuildAndRun脚本，表示编译然后运行。以后F6，可以直接选择该脚本，而不必输入命令了。

   在Console Dialog中编译器输出结果如下面的清单，绿色字体表示用户输入的命令和系统提示，黑色字体为Console Dialog的输出信息，与Windows 命令行程序相比多输出一些信息，表示程序执行的开始与结束，最后输出的信息表示Console Dialog处于等待新的命令状态。

   ```sh
   CD: D:/Java
   Current directory: D:/Java
   D:/jdk1.6.0_10/bin/Javac.exe "HelloWorld.java"
   Process started >>>
   <<< Process finished.
   D:/jdk1.6.0_10/bin/java.exe "HelloWorld"
   Process started >>>
   Hello World!
   b=true
   l=2000
   f=1.2
   <<< Process finished.
   ================ READY ================
   ```

4. 配置Java外部工具

   4.1 Notepad++环境变量

   表1为Notepad++定义的这些环境，可以作为参数传递给外部工具

   | 变量名称          | 含义                   | 例子                  |
   | ----------------- | ---------------------- | --------------------- |
   | FULL_CURRENT_PATH | 文件路径名称           | E:/java/HelloNpp.java |
   | CURRENT_DIRECTORY | 文件目录（不含文件名） | E:/java/              |
   | FILE_NAME         | 文件全名称             | HelloNpp.java         |
   | NAME_PART         | 文件名称（不含ext）    | HelloNpp              |
   | EXT_PART          | 文件扩展名             | java                  |

   4.2 创建外部工具

   这两个外部工具为javac和java，增加了暂停功能，可以在编译或运行Java程序时通过控制台窗口显示输出信息。

   4.2.1 javacnpp.bat：编译当前Java源文件，需要一个指定Java源文件作为参数，运行后屏幕处于暂停状态，并显示编译程序的执行结果。以下为javacnpp.bat代码：

   ```sh
   @echo on
   javac %1
   pause
   ```

   4.2.2 Javanpp.bat：运行Java的class二进制文件，需要指定两个参数，第一个参数为class文件所在的目录；第二个参数为Java程序名称。运行后屏幕处于暂停状态，显示程序执行的结果。以下为javanpp.bat代码：

   ```sh
   @echo on
   java -cp %1 %2
   pause
   ```

   4.3 创建javac菜单

   此菜单项用来编译Java源代码，生成class文件。选择主菜单“运行”，在下拉菜单中选择“运行...”或使用快捷键F5，显示“运行”对话框,输入如下运行程序名

   "E:/Program Files/Notepad++/javacnpp.bat" $(FULL_CURRENT_PATH)

   javacnpp.bat为上述创建的外部工具，$(FULL_CURRENT_PATH)为当前编辑的Java源代码文件。

   点击“保存”按钮，在名称编辑框中输入此外部工具名称，如javac；在快捷方式对话框中选择执行此外部程序对应的快捷键，选中(Control+Shift+J)作为编译Java源代码的快捷方式。

   4.4 创建java菜单

   java菜单用来运行java程序，创建的方式与javac菜单相同，但各自使用不同的外部工具，在“运行”对话框中输入运行程序名称：

   "E:/Program Files/Notepad++/javanpp.bat" $(CURRENT_DIRECTORY) $(NAME_PART)

   javanpp.bat为上述创建的外部工具，$(CURRENT_DIRECTORY)为Java class文件所在的目录，$(NAME_PART)为文件名称（不包含扩展名）。

   点击“保存”按钮，在名称编辑框中输入此外部工具名称，如java；在快捷方式对话框中选择执行此外部程序对应的快捷键，选中(Control+Shift+X)作为运行Java程序的快捷方式。

   建立这两个外部工具后，在“运行”菜单中会增加两个菜单项：javac和java，分别用来编译Java源代码和运行Java程序。在代码编辑区完成编写 工作后，执行javac命令（或使用快捷键Ctrl+Shift+J）编译当前Java源代码文件；编译通过后再执行java(或使用快捷键 Ctrl+Shift+X）运行编译后的Java程序。

5. 小结

本文介绍了如何使用Notepad++与JDK集成作为一个简单的Java IDE，适合与Java初学者。文中将所有的Java源文件都放置到缺省包（package）中，没有使用自定义包(package），如果使用 import/package关键字，按照本文描述的配置执行javac或java，则会在运行时会出现“ java.lang.NoClassDefFoundError:”错误，建议采用Console Dialog中执行

### C

1. 打开菜单栏中的运行，点击其中的运行，或者按F5。弹出设置对话框。

2. 在弹出的设置对话框中填准确信息：

   cmd /k gcc -o "D:\study\$(NAME_PART).exe" "$(FULL_CURRENT_PATH)" & PAUSE & EXIT然后名字为编译c，快捷键自己设置。

   同样第二个：cmd /k "D:\study\$(NAME_PART)" & PAUSE & EXIT名字为运行c，快捷键自己设置。

   设置好以后关闭对话框即可。

3. 然后在软件简单地测试程序，检验是否通过。示例：

   ```C
   #include <stdio.h>
   int main(void)
   {
       int i1=1,i2=2;
       int sum=i1+i2;
       printf("%d\n",sum);
       return 0;
   }
   ```

4. 然后依次点击编译c和运行c，最终测试通过。恭喜大家可以使用这个编译器编程了。

   注意：D:\study为程序输出位置，这个需要自己设置。

   我自己设置的快捷键（如果快捷键无效，一般是因为快捷键冲突）：

   编译C：Ctrl+Shift+O

   运行C：Ctrl+Shift+G



# UltraEdit

## 环境搭建

### C & C++

1．在“我的电脑——属性——高级——环境变量”中，添加如下变量：

```sh
INCLUDE：$Home$\VC2008\include;$Home$\VC2008\PlatformSDK\Include
LIB：$Home$\VC2008\lib;$Home$\VC2008\PlatformSDK\Lib
PATH：$Home$\VC2008\bin
```

如果已经存在这些变量，则把以上值分别加在对应的变量值的后面，注意在添加前用分号隔开。

2．“高级——工具配置”，插入编译和运行命令

![x](E:/WorkingDir/Office/Arts/Resource/15.png)

![x](E:/WorkingDir/Office/Arts/Resource/16.png)

### 配置文件高亮显示

1. 首先从ue官方网站下载wordfile扩展文件包：ALL WORDFILES IN ONE PACKAGE，([http://www.ultraedit.com/files/wf/wf.zip](http://www.ultraedit.com/files/wf/wf.zip))

2. 打开UltraEdit，点击菜单“高级”-“配置”，打开配置对话框。点击“编辑器显示”----“语法着色”，在右侧“字词列表完整路径”处找到uew配置文件路径

   C:\Users\userpathxxxx\AppData\Roaming\IDMComp\UltraEdit\wordfiles。

   假设要让.sh文件高亮显示：

3. 将下载的wf.zip解压缩，找到unixshell.uew文件复制到上述路径

   并在上述ultraedit的高级配置界面中选择打开，此时能够看到“语言选择中”多了选项 Unix Shell Scripts类型，再直接打开.sh文件，此时就可以看到shell脚本中关键字的已经以不同的颜色显示了。

# EditPlus

## EditPlus帮助手册

步骤：【工具】-->【配置用户工具】-->【添加工具】，选择php的chm帮助文件。  

这样在php相应的函数上按ctrl+1（或者你定义的数字键）就可以跳到相应的函数解释，就像VC中在函数上按F1跳到MSDN上一样。

![x](E:/WorkingDir/Office/Arts/Resource/17.png)

## EditPlus调试工具

### php

- 选择：【工具】->【配置用户工具】，在弹出的窗口中选择：【添加工具】->【程序】，在【菜单文本】中输入"Debug PHP"。

- 点击【命令】右边的按钮，找到你的php.exe所在的路径，我的电脑上是"D:\wamp\bin\php\php5.2.6\php.exe "。

- 再点击【参数】右边的下拉按钮选择【文件路径】，再点击【起始目录】右边的下拉按钮选择【文件目录】，最后再把【捕捉输出】前面的复选框选上，这样就可以开始调试PHP程序了。

  ![x](E:/WorkingDir/Office/Arts/Resource/18.png)

- 点击【输出模式】按钮，会弹出一个定义输出模式的窗体，把【使用默认输出方式】前面的复选框去掉，在【规则表达式】这一项的文本框中输入`^.+ in (.+) line ([0-9]+)`（不包括引号）。

- 然后，在下面的【文件名称】下拉菜单中选择【表达式标记1】，即上边正则表达式中的第一个参数，【行】下拉菜单项选择【表达式标记2】，【列】下拉项保持为空。然后保存设置。

- 这一步设置好后，当你调试PHP时输出窗口报错时，你只要双击报错信息，就能找到出错的PHP代码了，非常方便。

  ![x](E:/WorkingDir/Office/Arts/Resource/19.png)

- 确定后查看【工具】菜单，如下图，红色的为新添加的工具，后面对应的是快捷键：

  ![x](E:/WorkingDir/Office/Arts/Resource/20.png)

### python

![x](E:/WorkingDir/Office/Arts/Resource/p.png)

## 函数自动完成

去[http://editplus.com/html.html](http://editplus.com/html.html)，下载你需要的自动补全插件。推荐下载这个：[http://www.editplus.com/dn.cgi?php_acp3.zip](http://www.editplus.com/dn.cgi?php_acp3.zip)

说明：acp就是自动补全，stx是语法文件。

打开【工具】->【参数】，选择【设置与语法】->【文件类型】选择【PHP】，点击【自动完成】后面的【...】按钮，弹出文件选择框，将下好的php.acp复制到该目录下，并选中php.acp然后点击【打开】。

如果你不想使用Editplus的自动完成功能，你只要勾选禁用自动完成功能即可。最后重启下Editplus即可使用了。

使用Editplus的PHP自动完成功能时，注意在PHP文件中务必输入完整的PHP语句或PHP函数，然后按下空格即可启动自动完成功能，如果只输入了一部分，按空格是启动不了Editplus的PHP自动完成功能的

## 添加模板

在参数设置里建一个php的模板，使得在“文件-->新建”出现php模板，当然也可以继续点击“文件-->新建-->其它-->php”，来实现新建一个空白php模板。其它模板文件就是一个代码片段。

 首先打开Editplus，点击“文件-->新建-->其它-->php”，然后写代码片段后命名为template.php，保存在Editplus的根目录下。接下来我们开始在“工具-->参数-->模板-->添加”，选择刚才你保存的template.php文件。在“菜单文本”输入"php"，点击“载入”，然后“确定”。效果如图所示。

![x](E:/WorkingDir/Office/Arts/Resource/21.png)

## 代码美化

PHP代码美化就是方便那些不按照合理的格式写代码的童鞋们，或者是看别人写的乱七八糟的代码的时候直接格式美化后看就舒服多了。配置过程和第二步相似，不同的是代码美化需要下载一个应用程序（phpCB.exe文件），然后设置动作为“运行为文本过滤器(替换)”即可。不得不说这一版的PHP代码美化已经比之前的好看了，看来还是自己先写的标准一点的好。配置如图所示。

![x](E:/WorkingDir/Office/Arts/Resource/23.png)

## 函数提醒

这一步其实只是作为使用Editplus调试PHP时，函数自动完成的补充功能，当你记不清具体的函数名时，函数提醒功能是非常有必要的。

首先，请下载素材文件，即php.ctl文件，然后将解压的php.ctl文件放到Editplus安装目录下，然后选中左侧的素材文件，右键刷新即可。当你要使用Editplus的PHP函数提醒功能时，只要选择相应的PHP素材文件，在PHP文件中输入函数名的一部分，然后按F2，就会模糊列出相应的函数，最后选择你需要使用的PHP函数即可。

OK，至此配置Editplus调试PHP程序的所有步骤就介绍完了，经过上述步骤的配置，就可以很好的使用Editplus编写和调试PHP了。当然你如果有一定的基础，你也可以整理php.ctl文件，或者根据自己的使用习惯整理PHP的自动完成规则文件acp。总的来说配置 Editplus非常灵活，作为轻量级的PHP开发工具优势还是很明显的。 





### JetBrain

#### JetBrain快捷键

```txt
查找/代替：
ctrl+F 文件内查找
ctrl+shift+F 指定目录内查找
F3 查找下一个
shift+F3 查找上一个
ctrl+R 查找替换
ctrl+shift+R 指定目录查找替换
ctrl+shift+N 通过文件名快速查找文件
ctrl+shift+alt+N 通过字符快速查找位置
ctrl+shift+A 查找并使用编辑器所有功能
shift+shift 查找所有地方

界面操作：
alt+[0-9] 拆合功能界面模块
双击界面tab 最大或最小化目标界面
alt+←/→ 切换选项卡

编辑：
ctrl+C 复制
ctrl+shift+C 复制路径
ctrl+V 粘贴
ctrl+shift+V 多选粘贴
ctrl+X 剪切
ctrl+Z 退回
ctrl+shift+Z 重做
ctrl+D 复制当前行
ctrl+W 切换选中单词
ctrl+←/→ 以单词为边界跳光标位置
ctrl+alt+L 格式化代码
tab 扩大缩进（这是放在句首起作用。有时候代码输了一部分后按tab可以自动补全代码）
shift+tab 减小缩进
ctrl+Y 删除一行
shift+enter 重新开始新一行
ctrl+shift+enter 完成语句
ctrl+shift+up 切换大小写
ctrl+ -/+ 展开或闭合代码块
ctrl+shift+ -/+ 全部展开或闭合代码块
ctrl+backspace 按单词删除
ctrl+J 查看一些模板快捷方式
alt+shift+C 最近的修改
ctrl+shift+space 自动补全
ctrl+space 提示
ctrl+/ 注释
ctrl+shift+/ 取消注释

导航：
esc 进入编辑区
home 到行首
end 到行尾
ctrl+home 到文件首
ctrl+end 到文件尾
ctrl+]/[ 光标到块的前面或后面
alt+↑/↓ 上一个/下一个方法
ctrl+alt+←/→ 上一个/下一个光标位置
ctrl+鼠标左键 跳到详细
ctrl+Q 显示注释文档
alt+F1 查找代码所在位置
ctrl+E 最近编辑的文件
ctrl+tab 上一个窗口
ctrl+shift+tab 下一个窗口
[shift] + F2 错误或警告定位
ctrl + F12 文件内快速定位

调试：
shift+F9 调试
shift+F10 运行
F8 步过
F7 步入
alt+F9 运行至光标处
ctrl+F2 停止

重构：
ctrl+alt+shift+T 弹出重构菜单
```

怎么找快捷键？在快捷键设置里面，在菜单上有提示，`ctrl+shift+A` 查找快捷键。

#### JetBrain激活

补丁下载地址：[点击这里](https://pan.baidu.com/s/1h0I_hBW86g4M6EA-zWrcHA)

提取码: mekx

- 下载补丁后，找到安装目录，将文件复制到 bin 文件夹。
- 在安装目录的 \bin 目录下有两个文件 xxx.exe.vmoptions 和 xxx64.exe.vmoptions
- （打开文件，最后面加入：`-javaagent:文件路径`）
  2019.02 版本必须在 idea 配置中添加才可以（也就是用户 config 选项下的 idea 配置）
- 保存退出，**重启**，首次打开会提示激活，选择 Activation code，移除以前的license（remove license，没有就跳过）输入code，点击 OK，即可激活成功。

1、第1个code

```txt
A82DEE284F-eyJsaWNlbnNlSWQiOiJBODJERUUyODRGIiwibGljZW5zZWVOYW1lIjoiaHR0cHM6Ly96aGlsZS5pbyIsImFzc2lnbmVlTmFtZSI6IiIsImFzc2lnbmVlRW1haWwiOiIiLCJsaWNlbnNlUmVzdHJpY3Rpb24iOiJVbmxpbWl0ZWQgbGljZW5zZSB0aWxsIGVuZCBvZiB0aGUgY2VudHVyeS4iLCJjaGVja0NvbmN1cnJlbnRVc2UiOmZhbHNlLCJwcm9kdWN0cyI6W3siY29kZSI6IklJIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUlMwIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiV1MiLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJSRCIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IlJDIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiREMiLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJEQiIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IlJNIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiRE0iLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJBQyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkRQTiIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkdPIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUFMiLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJDTCIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IlBDIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUlNVIiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In1dLCJoYXNoIjoiODkwNzA3MC8wIiwiZ3JhY2VQZXJpb2REYXlzIjowLCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-5epo90Xs7KIIBb8ckoxnB/AZQ8Ev7rFrNqwFhBAsQYsQyhvqf1FcYdmlecFWJBHSWZU9b41kvsN4bwAHT5PiznOTmfvGv1MuOzMO0VOXZlc+edepemgpt+t3GUHvfGtzWFYeKeyCk+CLA9BqUzHRTgl2uBoIMNqh5izlDmejIwUHLl39QOyzHiTYNehnVN7GW5+QUeimTr/koVUgK8xofu59Tv8rcdiwIXwTo71LcU2z2P+T3R81fwKkt34evy7kRch4NIQUQUno//Pl3V0rInm3B2oFq9YBygPUdBUbdH/KHROyohZRD8SaZJO6kUT0BNvtDPKF4mCT1saWM38jkw==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5ndaik1GD0nyTdqkZgURQZGW+RGxCdBITPXIwpjhhaD0SXGa4XSZBEBoiPdY6XV6pOfUJeyfi9dXsY4MmT0D+sKoST3rSw96xaf9FXPvOjn4prMTdj3Ji3CyQrGWeQU2nzYqFrp1QYNLAbaViHRKuJrYHI6GCvqCbJe0LQ8qqUiVMA9wG/PQwScpNmTF9Kp2Iej+Z5OUxF33zzm+vg/nYV31HLF7fJUAplI/1nM+ZG8K+AXWgYKChtknl3sW9PCQa3a3imPL9GVToUNxc0wcuTil8mqveWcSQCHYxsIaUajWLpFzoO2AhK4mfYBSStAqEjoXRTuj17mo8Q6M2SHOcwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQBonMu8oa3vmNAa4RQP8gPGlX3SQaA3WCRUAj6Zrlk8AesKV1YSkh5D2l+yUk6njysgzfr1bIR5xF8eup5xXc4/G7NtVYRSMvrd6rfQcHOyK5UFJLm+8utmyMIDrZOzLQuTsT8NxFpbCVCfV5wNRu4rChrCuArYVGaKbmp9ymkw1PU6+HoO5i2wU3ikTmRv8IRjrlSStyNzXpnPTwt7bja19ousk56r40SmlmC04GdDHErr0ei2UbjUua5kw71Qn9g02tL9fERI2sSRjQrvPbn9INwRWl5+k05mlKekbtbu2ev2woJFZK4WEXAd/GaAdeZZdumv8T2idDFL7cAirJwcrbfpawPeXr52oKTPnXfi0l5+g9Gnt/wfiXCrPElX6ycTR6iL3GC2VR4jTz6YatT4Ntz59/THOT7NJQhr6AyLkhhJCdkzE2cob/KouVp4ivV7Q3Fc6HX7eepHAAF/DpxwgOrg9smX6coXLgfp0b1RU2u/tUNID04rpNxTMueTtrT8WSskqvaJd3RH8r7cnRj6Y2hltkja82HlpDURDxDTRvv+krbwMr26SB/40BjpMUrDRCeKuiBahC0DCoU/4+ze1l94wVUhdkCfL0GpJrMSCDEK+XEurU18Hb7WT+ThXbkdl6VpFdHsRvqAnhR2g4b+Qzgidmuky5NUZVfEaZqV/g==
```

2、第2个code

```txt
3AGXEJXFK9-eyJsaWNlbnNlSWQiOiIzQUdYRUpYRks5IiwibGljZW5zZWVOYW1lIjoiaHR0cHM6Ly96aGlsZS5pbyIsImFzc2lnbmVlTmFtZSI6IiIsImFzc2lnbmVlRW1haWwiOiIiLCJsaWNlbnNlUmVzdHJpY3Rpb24iOiIiLCJjaGVja0NvbmN1cnJlbnRVc2UiOmZhbHNlLCJwcm9kdWN0cyI6W3siY29kZSI6IklJIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkFDIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkRQTiIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJQUyIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJHTyIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJETSIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJDTCIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJSUzAiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUkMiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUkQiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUEMiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUk0iLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiV1MiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiREIiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiREMiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiUlNVIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9XSwiaGFzaCI6IjEyNzk2ODc3LzAiLCJncmFjZVBlcmlvZERheXMiOjcsImF1dG9Qcm9sb25nYXRlZCI6ZmFsc2UsImlzQXV0b1Byb2xvbmdhdGVkIjpmYWxzZX0=-WGTHs6XpDhr+uumvbwQPOdlxWnQwgnGaL4eRnlpGKApEEkJyYvNEuPWBSrQkPmVpim/8Sab6HV04Dw3IzkJT0yTc29sPEXBf69+7y6Jv718FaJu4MWfsAk/ZGtNIUOczUQ0iGKKnSSsfQ/3UoMv0q/yJcfvj+me5Zd/gfaisCCMUaGjB/lWIPpEPzblDtVJbRexB1MALrLCEoDv3ujcPAZ7xWb54DiZwjYhQvQ+CvpNNF2jeTku7lbm5v+BoDsdeRq7YBt9ANLUKPr2DahcaZ4gctpHZXhG96IyKx232jYq9jQrFDbQMtVr3E+GsCekMEWSD//dLT+HuZdc1sAIYrw==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5ndaik1GD0nyTdqkZgURQZGW+RGxCdBITPXIwpjhhaD0SXGa4XSZBEBoiPdY6XV6pOfUJeyfi9dXsY4MmT0D+sKoST3rSw96xaf9FXPvOjn4prMTdj3Ji3CyQrGWeQU2nzYqFrp1QYNLAbaViHRKuJrYHI6GCvqCbJe0LQ8qqUiVMA9wG/PQwScpNmTF9Kp2Iej+Z5OUxF33zzm+vg/nYV31HLF7fJUAplI/1nM+ZG8K+AXWgYKChtknl3sW9PCQa3a3imPL9GVToUNxc0wcuTil8mqveWcSQCHYxsIaUajWLpFzoO2AhK4mfYBSStAqEjoXRTuj17mo8Q6M2SHOcwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQBonMu8oa3vmNAa4RQP8gPGlX3SQaA3WCRUAj6Zrlk8AesKV1YSkh5D2l+yUk6njysgzfr1bIR5xF8eup5xXc4/G7NtVYRSMvrd6rfQcHOyK5UFJLm+8utmyMIDrZOzLQuTsT8NxFpbCVCfV5wNRu4rChrCuArYVGaKbmp9ymkw1PU6+HoO5i2wU3ikTmRv8IRjrlSStyNzXpnPTwt7bja19ousk56r40SmlmC04GdDHErr0ei2UbjUua5kw71Qn9g02tL9fERI2sSRjQrvPbn9INwRWl5+k05mlKekbtbu2ev2woJFZK4WEXAd/GaAdeZZdumv8T2idDFL7cAirJwcrbfpawPeXr52oKTPnXfi0l5+g9Gnt/wfiXCrPElX6ycTR6iL3GC2VR4jTz6YatT4Ntz59/THOT7NJQhr6AyLkhhJCdkzE2cob/KouVp4ivV7Q3Fc6HX7eepHAAF/DpxwgOrg9smX6coXLgfp0b1RU2u/tUNID04rpNxTMueTtrT8WSskqvaJd3RH8r7cnRj6Y2hltkja82HlpDURDxDTRvv+krbwMr26SB/40BjpMUrDRCeKuiBahC0DCoU/4+ze1l94wVUhdkCfL0GpJrMSCDEK+XEurU18Hb7WT+ThXbkdl6VpFdHsRvqAnhR2g4b+Qzgidmuky5NUZVfEaZqV/g==
```

3、第3个code

```txt
KNBB2QUUR1-eyJsaWNlbnNlSWQiOiJLTkJCMlFVVVIxIiwibGljZW5zZWVOYW1lIjoiZ2hib2tlIiwiYXNzaWduZWVOYW1lIjoiIiwiYXNzaWduZWVFbWFpbCI6IiIsImxpY2Vuc2VSZXN0cmljdGlvbiI6IiIsImNoZWNrQ29uY3VycmVudFVzZSI6ZmFsc2UsInByb2R1Y3RzIjpbeyJjb2RlIjoiSUkiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiQUMiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In0seyJjb2RlIjoiRFBOIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IlBTIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkdPIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkRNIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IkNMIiwiZmFsbGJhY2tEYXRlIjoiMjA4OS0wNy0wNyIsInBhaWRVcFRvIjoiMjA4OS0wNy0wNyJ9LHsiY29kZSI6IlJTMCIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJSQyIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJSRCIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJQQyIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJSTSIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJXUyIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJEQiIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJEQyIsImZhbGxiYWNrRGF0ZSI6IjIwODktMDctMDciLCJwYWlkVXBUbyI6IjIwODktMDctMDcifSx7ImNvZGUiOiJSU1UiLCJmYWxsYmFja0RhdGUiOiIyMDg5LTA3LTA3IiwicGFpZFVwVG8iOiIyMDg5LTA3LTA3In1dLCJoYXNoIjoiMTI3OTY4NzcvMCIsImdyYWNlUGVyaW9kRGF5cyI6NywiYXV0b1Byb2xvbmdhdGVkIjpmYWxzZSwiaXNBdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlfQ==-1iV7BA/baNqv0Q5yUnAphUmh66QhkDRX+qPL09ICuEicBqiPOBxmVLLCVUpkxhrNyfmOtat2LcHwcX/NHkYXdoW+6aS0S388xe1PV2oodiPBhFlEaOac42UQLgP4EidfGQSvKwC9tR1zL5b2CJPQKZ7iiHh/iKBQxP6OBMUP1T7j3Fe1rlxfYPc92HRZf6cO+C0+buJP5ERZkyIn5ZrVM4TEnWrRHbpL8SVNq4yqfc+NwoRzRSNC++81VDS3AXv9c91YeZJz6JXO7AokIk54wltr42FLNuKbozvB/HCxV9PA5vIiM+kZY1K0w5ytgxEYKqA87adA7R5xL/crpaMxHQ==-MIIElTCCAn2gAwIBAgIBCTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE4MTEwMTEyMjk0NloXDTIwMTEwMjEyMjk0NlowaDELMAkGA1UEBhMCQ1oxDjAMBgNVBAgMBU51c2xlMQ8wDQYDVQQHDAZQcmFndWUxGTAXBgNVBAoMEEpldEJyYWlucyBzLnIuby4xHTAbBgNVBAMMFHByb2QzeS1mcm9tLTIwMTgxMTAxMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5ndaik1GD0nyTdqkZgURQZGW+RGxCdBITPXIwpjhhaD0SXGa4XSZBEBoiPdY6XV6pOfUJeyfi9dXsY4MmT0D+sKoST3rSw96xaf9FXPvOjn4prMTdj3Ji3CyQrGWeQU2nzYqFrp1QYNLAbaViHRKuJrYHI6GCvqCbJe0LQ8qqUiVMA9wG/PQwScpNmTF9Kp2Iej+Z5OUxF33zzm+vg/nYV31HLF7fJUAplI/1nM+ZG8K+AXWgYKChtknl3sW9PCQa3a3imPL9GVToUNxc0wcuTil8mqveWcSQCHYxsIaUajWLpFzoO2AhK4mfYBSStAqEjoXRTuj17mo8Q6M2SHOcwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQBonMu8oa3vmNAa4RQP8gPGlX3SQaA3WCRUAj6Zrlk8AesKV1YSkh5D2l+yUk6njysgzfr1bIR5xF8eup5xXc4/G7NtVYRSMvrd6rfQcHOyK5UFJLm+8utmyMIDrZOzLQuTsT8NxFpbCVCfV5wNRu4rChrCuArYVGaKbmp9ymkw1PU6+HoO5i2wU3ikTmRv8IRjrlSStyNzXpnPTwt7bja19ousk56r40SmlmC04GdDHErr0ei2UbjUua5kw71Qn9g02tL9fERI2sSRjQrvPbn9INwRWl5+k05mlKekbtbu2ev2woJFZK4WEXAd/GaAdeZZdumv8T2idDFL7cAirJwcrbfpawPeXr52oKTPnXfi0l5+g9Gnt/wfiXCrPElX6ycTR6iL3GC2VR4jTz6YatT4Ntz59/THOT7NJQhr6AyLkhhJCdkzE2cob/KouVp4ivV7Q3Fc6HX7eepHAAF/DpxwgOrg9smX6coXLgfp0b1RU2u/tUNID04rpNxTMueTtrT8WSskqvaJd3RH8r7cnRj6Y2hltkja82HlpDURDxDTRvv+krbwMr26SB/40BjpMUrDRCeKuiBahC0DCoU/4+ze1l94wVUhdkCfL0GpJrMSCDEK+XEurU18Hb7WT+ThXbkdl6VpFdHsRvqAnhR2g4b+Qzgidmuky5NUZVfEaZqV/g==
```

使用任何一个code都行！

#### 修改Maven镜像

C:\Users\23907\.m2\settings.xml

```xml
<settings
    xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                        https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
      <mirrorOf>central</mirrorOf>
    </mirror>  
  </mirrors>
</settings>
```

![x](./Resources/jetbrain1.JPG)

注意：右下角的“覆盖”选项！

### Sunny-Ngrok

内网穿透工具，让公网可以访问本机！

隧道管理：[https://www.ngrok.cc/user.html](https://www.ngrok.cc/user.html)

申请一个免费隧道，然后下载客户端工具，打开，输入隧道Id即可！

### shadowsocks

Shadowsocks是一个轻量级socks5代理，最初用 Python 编写。

**服务端设置**

登录到ssh界面，切换到root用户。运行命令：

```sh
wget —no-check-certificatehttps://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
```

耐心等待运行结束，运行命令：

```sh
chmod +x shadowsocks.sh
```

耐心等待运行结束，运行命令：

```sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```

中间会提示你输入你的SS SERVER的密码，和端口，加密模式。不输入就是默认。跑完命令后会出来你的SS客户端的信息。

特别注意，由于iphone端的的wingy目前只支持到cfb，所以我们选择aes-256-cfb，即7
请立即copy下来加以保存。

上面的命令全部回车执行后，如果没有报错，即为执行成功，出现确认提示的时候，输入 y 后，回车即可。

安装完成后，脚本提示如下：

```sh
Congratulations, shadowsocks install completed!
Your Server IP:45.76.197.221
Your Server Port:9666
Your Password:Cxf5609757
Your Local IP:127.0.0.1
Your Local Port:1080
Your Encryption Method:aes-256-cfb
```

记录保存好你的上述信息：Server IP、Server Port、Password、Encryption Method这时你的专属ss已经搭好了，开始使用吧。

**多用户多端口配置文件**

配置文件路径及代码：

```sh
vi /etcconfig.json
```

或者

```sh
cd /etc/shadowsocks/
vi config.json
```

复制代码

按i编辑，esc退出编辑，然后按Shift+Q编辑状态输入wq保存

```json
{
    "port_password": {
      "8989": "password0",
      "9001": "password1",
      "9002": "password2",
      "9003": "password3",
      "9004": "password4"
    },
    "method": "aes-256-cfb",
    "timeout": 600
}
```

**Shadowsocks使用命令**

- 启动：/etc/init.d/shadowsocks start
- 停止：/etc/init.d/shadowsocks stop
- 重启：/etc/init.d/shadowsocks restart
- 查看状态：/etc/init.d/shadowsocks status
- 卸载：./shadowsocks.sh uninstall

**客户端设置**

1、iphone下载wingy（免费的），app store里搜wingy（中国app store已经下架，可以换到美国账户下载）

[https://itunes.apple.com/us/app/wingy-proxy-for-http-s-socks5/id1178584911?mt=8](https://itunes.apple.com/us/app/wingy-proxy-for-http-s-socks5/id1178584911?mt=8)

点击选择线路—新增线路—shadowsocks—依次填入刚才记录的信息就好—保存—点击连接就可以了

这样就成功了

2、windows下载

windows客户端更新（170925）：[https://github.com/shadowsocks/shadowsocks-windows/releases](https://github.com/shadowsocks/shadowsocks-windows/releases)

下载Shadowsocks-4.0.6.zip

3、android

建议android参考下面这篇文章：[https://www.dou-bi.co/androidkxsw/](https://www.dou-bi.co/androidkxsw/)

![x](./Resources/Shadowsocks.png)

**参考**

- [http://www.525.life/article?id=1510739742371](http://www.525.life/article?id=1510739742371)

### Vagrant

官网：[https://www.vagrantup.com](https://www.vagrantup.com)

Vagrant是一种在单个工作流程中构建和管理虚拟机环境的工具。通过易于使用的工作流程并专注于自动化，Vagrant降低了开发环境的设置时间，提高了生产效率，并使“在我的机器上能工作”成为过去式。

#### 为什么选择Vagrant？

Vagrant提供易于配置，可重复和便携的工作环境，基于行业标准技术构建，并由单一一致的工作流程控制，以帮助您和您的团队最大限度地提高生产力和灵活性。

为了实现其魔力，Vagrant站在巨人的肩膀上。在VirtualBox，VMware，AWS或任何其他提供商之上配置计算机。然后，行业标准 配置工具 （如shell脚本，Chef或Puppet）可以在虚拟机上自动安装和配置软件。

**对于开发人员**

如果您是开发人员，Vagrant将在一个一致的，一致的环境中隔离依赖关系及其配置，而不会牺牲您习惯使用的任何工具（编辑器，浏览器，调试器等）。一旦您或其他人创建了单个 Vagrant 文件，您只需要vagrant up安装并配置所有内容即可使用。团队的其他成员使用相同的配置创建他们的开发环境，因此无论您是在 Linux，Mac OS X 还是 Windows 上工作，您的所有团队成员都在同一环境中运行代码，针对相同的依赖项，所有组件都配置相同办法。告别“在我的机器上工作”的错误。

**对于运营商**

如果您是运营工程师或DevOps工程师，Vagrant为您提供一次性环境和一致的工作流程，用于开发和测试基础架构管理脚本。您可以使用VirtualBox或VMware等本地虚拟化快速测试shell脚本，Chef cookbook，Puppet模块等内容。然后，使用相同的配置，您可以使用相同的工作流在远程云（如AWS或RackSpace）上测试这些脚本。抛弃自定义脚本以回收EC2实例，停止将SSH提示交给各种机器，并开始使用Vagrant为您的生活带来理智。

**对于设计师**

如果您是设计师，Vagrant会自动设置该Web应用程序所需的所有内容，以便您专注于做您最擅长的事情：设计。一旦开发人员配置了Vagrant，您就不必担心如何让该应用程序再次运行。不再困扰其他开发人员来帮助您修复环境，以便您可以测试设计。只需查看代码 vagrant up，然后开始设计。

**适合所有人**

Vagrant是为每个人设计的，是创建虚拟化环境的最简单，最快捷的方式！

#### Vagrant与其它软件

Vagrant不是管理虚拟机和开发环境的唯一工具。本节将Vagrant与其他软件选择进行比较。

**Vagrant vs CLI工具**

VirtualBox 和 VMware 等虚拟化软件带有命令行实用程序，用于管理其平台上机器的生命周期。许多人利用这些实用程序编写自己的自动化。Vagrant实际上在内部使用了许多这些实用程序。

这些 CLI 工具与 Vagrant 之间的区别在于 Vagrant 以多种方式构建在这些实用程序之上，同时仍提供一致的工作流程。Vagrant 支持多个同步文件夹类型，多个配置程序来设置机器，自动 SSH 设置，在您的开发环境中创建 HTTP 隧道等等。所有这些都可以使用一个简单的配置文件进行配置。

即使您忽略了 Vagrant 提供的所有更高级功能，Vagrant 仍然会对手动脚本进行一些改进。虚拟化软件提供的命令行实用程序通常会更改每个版本或具有解决方法的细微错误。Vagrant 会自动检测版本，使用正确的标志，并可以解决已知问题。因此，如果您使用的是一个版本的 VirtualBox，并且同事正在使用不同的版本，那么 Vagrant 仍然可以保持一致。

对于不经常更改的高度特定的工作流，维护自定义脚本仍然是有益的。Vagrant 的目标是构建开发环境，但一些高级用户仍然使用下面的 CLI 工具来执行其他手动操作。

**Vagrant vs Docker**

Vagrant 是一个专注于跨多个操作系统提供一致的开发环境工作流的工具。Docker 是一种容器管理，只要存在容器化系统，就可以始终如一地运行软件。

容器通常比虚拟机更轻，因此启动和停止容器非常快。Docker 在 macOS，Linux 和 Windows 上使用本机容器化功能。

目前，Docker 缺乏对某些操作系统（如BSD）的支持。如果您的目标部署是这些操作系统之一，Docker 将不会提供与 Vagrant 之类的工具相同的生产奇偶校验。Vagrant 还允许您在 Mac 或 Linux 上运行 Windows 开发环境。

对于微服务繁重的环境，Docker 可能很有吸引力，因为您可以轻松启动单个 Docker VM 并快速启动多个容器。这是 Docker 的一个很好的用例。Vagrant 也可以使用 Docker 提供程序执行此操作。Vagrant 的主要好处是一致的工作流程，但在很多情况下，纯 Docker 工作流程确实有意义。

Vagrant 和 Docker 都拥有庞大的社区贡献 "images" 或 "boxes" 库供您选择。

**Vagrant vs Terraform**

Vagrant 和 Terraform 都是 HashiCorp 的项目。Vagrant 是一个专注于管理开发环境的工具，Terraform 是一个用于构建基础架构的工具。

Terraform 可以描述本地或远程存在的复杂基础设施集。它专注于随着时间的推移建立和改变基础设施。虚拟机生命周期的最小方面可以在 Terraform 中重现，有时会导致与 Vagrant 的混淆。

Vagrant 提供了许多 Terraform 没有的更高级功能。同步文件夹，自动网络，HTTP 隧道等是 Vagrant 提供的功能，可以简化开发环境的使用。由于 Terraform 专注于基础架构管理而非开发环境，因此这些功能超出了该项目的范围。

Terraform 的主要用途是用于管理云提供商（如AWS）中的远程资源。Terraform 旨在管理跨越多个云提供商的超大型基础架构。Vagrant 主要设计用于最多只使用少量虚拟机的本地开发环境。

Vagrant 适用于开发环境。Terraform 用于更一般的基础架构管理。
入门
Vagrant入门指南将引导您完成第一个Vagrant项目，并展示Vagrant提供的主要功能的基础知识。
入门指南将使用Vagrant和VirtualBox，因为它是免费的，可在每个主要平台上使用，并内置于Vagrant。阅读本指南后，不要忘记Vagrant可以与许多其他提供商合作。
    在深入了解您的第一个项目之前，请安装最新版本的Vagrant。因为我们将使用VirtualBox作为入门指南的提供者，所以也请安装它。
启动并运行
    $ vagrant init hashicorp/precise64
    $ vagrant up
运行上述两个命令后，您将在运行Ubuntu 12.04 LTS 64位的VirtualBox中拥有一个完全运行的虚拟机。您可以使用SSH连接到此计算机vagrant ssh，当您完成游戏时，可以终止虚拟机vagrant destroy。
现在想象一下你曾经做过的每个项目都能这么容易地设置！使用Vagrant，只要vagrant up命令就能让您处理任何项目，包括安装项目所需的每个依赖项，以及设置任何网络或同步文件夹，这样您就可以在像在自己的机器上一样工作。
本指南的其余部分将引导您完成一个更完整的项目，涵盖Vagrant的更多功能。
安装Vagrant
    必须首先在要运行它的计算机上安装Vagrant。为了简化安装，Vagrant作为 所有支持的平台和体系结构的二进制包进行分发。本页面不会介绍如何从源代码编译Vagrant，因为README中对此进行了介绍， 仅建议高级用户使用。
    要安装Vagrant，请先找到适合您系统的软件包并下载。Vagrant被打包为特定于操作的包。运行系统的安装程序。安装程序将自动添加 vagrant到您的系统路径，以便在终端中可用。如果找不到，请尝试注销并重新登录到您的系统（对于Windows，这有时尤为必要）。
    安装Vagrant后，通过打开新的命令提示符或控制台并检查vagrant是否可用来验证安装是否有效：
$ vagrant
Usage: vagrant [options] <command> [<args>]

-v, --version                    Print the version and exit.
-h, --help                       Print this help.

# ...
    小心系统包管理器！某些操作系统发行版在其上游包repos中包含一个vagrant包。请不要以这种方式安装Vagrant。通常，这些包缺少依赖项或包含非常过时的Vagrant版本。如果您通过系统的软件包管理器进行安装，则很可能会遇到问题。请使用下载页面上的官方安装程序。
项目设置
配置任何Vagrant项目的第一步是创建Vagrant 文件。Vagrantfile的目的有两个：
1、标记项目的根目录。Vagrant中的许多配置选项都与此根目录相关。
2、描述运行项目所需的机器和资源类型，以及要安装的软件和访问方式。
Vagrant有一个内置命令，用于初始化目录以供Vagrant使用：vagrant init。出于本入门指南的目的，请在您的终端中进行操作：
$ mkdir vagrant_getting_started
$ cd vagrant_getting_started
$ vagrant init hashicorp/precise64
这将在您当前的目录中放置一个Vagrantfile。如果需要，您可以查看Vagrantfile，它充满了注释和示例。它看起来有点吓人，不要害怕，我们会尽快修改它。
您还可以在预先存在的目录中运行vagrant init，为现有项目设置Vagrant。
如果您使用版本控制，Vagrantfile将用于您的项目的版本控制。这样，每个使用该项目的人都可以从没有任何前期工作的Vagrant中受益。
Boxes
    Vagrant使用基本映像快速克隆虚拟机，而不是从头开始构建虚拟机（这将是一个缓慢而乏味的过程）。这些基本映像在Vagrant中称为"boxes"，指定用于Vagrant环境的box始终是创建新Vagrantfile后的第一步。
安装box
    如果您在入门概述页面上运行了命令，那么之前您已经安装了一个box，并且您不需要再次运行下面的命令。但是，仍然值得阅读本节以了解有关如何管理box的更多信息。
    box被添加到Vagrant中vagrant box add。这会将该box存储在特定名称下，以便多个Vagrant环境可以重复使用它。如果您尚未添加box，则可以立即执行此操作：
    $ vagrant box add hashicorp/precise64
    这将从HashiCorp的Vagrant Cloud Boxes目录下载名为"hashicorp / precise64"的盒子，在这里您可以找到并托管box。虽然最容易从HashiCorp的Vagrant Cloud下载box，但您也可以从本地文件，自定义URL等添加box。
    为当前用户全局存储box。每个项目都使用一个box作为初始image进行克隆，并且永远不会修改实际的基本image。这意味着如果您有两个项目都使用hashicorp/precise64 我们刚刚添加的box，则在一台客户机中添加文件将对另一台机器没有影响。
    在上面的命令中，您会注意到box是命名空间。box被分为两部分 - 用户名和box名称 - 用斜杠分隔。在上面的示例中，用户名是"hashicorp"，box是"precise64"。您还可以通过URL或本地文件路径指定box，但入门指南中不会介绍这些box。
    命名空间不保证规范的盒子！一个常见的误解是像"ubuntu"这样的命名空间代表了Ubuntu盒子的规范空间。这是不真实的。例如，Vagrant Cloud上的命名空间与GitHub上的命名空间的行为非常相似。正如GitHub的支持团队无法协助某人的存储库中的问题一样，HashiCorp的支持团队无法协助第三方发布的box。
使用box
    现在该box已添加到Vagrant，我们需要配置我们的项目以将其用作基础。打开Vagrantfile并将内容更改为以下内容：
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"
end
    在这种情况下，"hashicorp / precise64"必须与您用于添加上面框的名称相匹配。这就是Vagrant知道使用什么box的方式。如果之前未添加该box，Vagrant将自动下载并在运行时添加该box。
    您可以通过指定config.vm.box_version 示例来指定box的显式版本：
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"
  config.vm.box_version = "1.1.0"
end
    您还可以使用config.vm.box_url以下命令直接指定box的URL ：
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"
  config.vm.box_url = "https://vagrantcloud.com/hashicorp/precise64"
end
寻找更多Box
    对于本入门指南的其余部分，我们将仅使用之前添加的"hashicorp/precise64"框。但是在完成这个入门指南后不久，你可能会遇到的第一个问题是“我在哪里可以找到更多的盒子？”
    找到更多盒子的最佳位置是HashiCorp的Vagrant Cloud box目录。HashiCorp的Vagrant Cloud有一个提供免费的可以运行各种平台和技术的box的公共目录。HashiCorp的Vagrant Cloud还有一个很棒的搜索功能，可以让你找到你关心的box。
    除了寻找免费box外，如果您打算为自己的组织创建box，HashiCorp的Vagrant Cloud可让您托管自己的box以及私人box。



### Log查看器

**超大****log****文件查看工具**

l PilotEdit（主要是针对文本文件）

l glogg（windows和linux都可以用）

l WINHEX（主要针对二进制文件）

l EmEditor（打开速度快，对中文支持好）

**参考**

https://coderxing.gitbooks.io/architecture-evolution/





# 汇总

## XMind

xmind pro 8是目前互联网上最优秀最专业的思维导图软件，该软件可以将脑中的源源不断涌现的想法完美的展现出来，其思维导图与其他导图图表等更是简单易用，吸引着人们的眼球。

新版本新增了很多方便用户使用的功能，例如新增“资源管理器”，通过它用户可以统一整理XMind资源库，甚至自定义，包括管理剪贴画、图标、风格、样式、模板。还新增了基于幻灯片的演示slide-by-slidepresentation，使用XMind基于幻灯片的演示文稿，创建、展示和共享演示文稿变得比以往任何时候都更容易。全新的xmind8将给用户带来更好的体验，更酷的功能，更漂亮的可视化效果，以及更大的生产力提升。

xmind pro 8破解安装方法如下

1. 下载解压缩，双击exe文件依提安装；
2. 接受条款，勾选“i accept the agreement”点击next；
3. 自行定义xmind8软件安装目录，小编按默认路径；
4. 创建桌面图标，创建快速启动栏；
5. 最后依提示安装即可；
6. ps：此版本为官方测试授权版，自动激活，安装后请使用 Windows 防火墙屏蔽主程序联网。



## Markdown

Markdown是一个好用的编辑器，它是一种纯文本格式的标记语言。通过简单的标记语法，可以使普通文本内容具有一定的格式。下面就是一些编写格式：

1. **标题**

   标题其实和HTML中的h系列很像，想要设置为标题的文字前面加#来表示

   一个#是一级标题，二个#是二级标题，以此类推。支持六级标题。

   注：标准语法一般在#后跟个空格再写文字，

   示例：

   ```md
   # 这是一级标题
   ## 这是二级标题
   ### 这是三级标题
   #### 这是四级标题
   ##### 这是五级标题
   ###### 这是六级标题
   ```

2. **字体**

   - 加粗
   
     要加粗的文字左右分别用两个*号包起来

   - 斜体
   
     要倾斜的文字左右分别用一个*号或者用_包起来

   - 斜体加粗
   
     要倾斜和加粗的文字左右分别用三个*号包起来

   - 删除线
   
     要加删除线的文字左右分别用两个~~号包起来

   示例：

   ```md
   **这是加粗的文字**
   *这是倾斜的文字*
   ***这是斜体加粗的文字***
   ~~这是加删除线的文字~~
   ```

3. **引用**

   - 在引用的文字前加>即可。引用也可以嵌套，如加两个>>三个>>> n个...

   示例：

   ```md
   >这是引用的内容
   >>这是引用的内容
   >>>这是引用的内容
   ```

4. **分割线**

   - 三个或者三个以上的 - 或者 * 都可以。
   - 示例：

   ```md
   ---
   ***
   ```

5. **图片**

   - 语法：`![图片alt](图片地址 ''图片title'')`

     图片alt就是显示在图片下面的文字，相当于对图片内容的解释。

     图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

     **上传本地图片直接拖进去

6. **超链接**

   - 语法：`[超链接名](超链接地址 "超链接title")`

     title可加可不加

   示例：`[百度](http://baidu.com)`

7. **列表**

   - 无序列表

     语法：无序列表用 - + * 任何一种都可以

     ```md
     - 列表内容
     + 列表内容
     * 列表内容
     ```

     注意：- + * 跟内容之间都要有一个空格

   - 有序列表

     语法：数字加点

     ```md
     1.列表内容
     2.列表内容
     3.列表内容
     ```

   注意：序号跟内容之间要有空格；上一级和下一级之间敲三个空格即可

8. **表格**

   语法：

   ```md
   | 表头 | 表头  | 表头 |
   | ---- | :---: | ---: |
   | 内容 | 内容  | 内容 |
   | 内容 | 内容  | 内容 |
   ```

   第二行分割表头和内容。

   `-` 有一个就行，为了对齐，多加了几个

   文字默认居左

   -两边加：表示文字居中

   -右边加：表示文字居右

   注：原生的语法两边都要用 | 包起来。此处省略

   示例：

   ```md
   | 表头   | 表头   | 表头   |
   | ------ | ------ | ------ |
   | 第一行 | 第一行 | 第一行 |
   | 第二行 | 第二行 | 第二行 |
   | 第三行 | 第三行 | 第三行 |
   ```

9. **代码**

   语法：

   - 单行代码：代码之间分别用一个反引号包起来

     \`代码内容\`

   - 代码块：代码之间分别用三个反引号包起来，且两边的反引号单独占一行

     \`\`\`md  
     代码内容  
     \`\`\`

   以上就是常用的格式，很简单，大家试着写一写；很快就能上手。

10. **公式语法**

    **行内与独行**

    1. 行内公式：将公式插入到本行内，符号：`$公式内容$`，如：$xyz$
    2. 独行公式：将公式插入到新的一行内，并且居中，符号：`$$公式内容$$`，如：$$xyz$$

    **上标、下标与组合**

    1. 上标符号，符号：`^`，如：$x^4$
    2. 下标符号，符号：`_`，如：$x_1$
    3. 组合符号，符号：`{}`，如：${16}_{8}O{2+}_{2}$

    **汉字、字体与格式**

    1. 汉字形式，符号：`\mbox{}`，如：$V_{\mbox{初始}}$
    2. 字体控制，符号：`\displaystyle`，如：$\displaystyle \frac{x+y}{y+z}$
    3. 下划线符号，符号：`\underline`，如：$\underline{x+y}$
    4. 标签，符号`\tag{数字}`，如：$\tag{11}$
    5. 上大括号，符号：`\overbrace{算式}`，如：$\overbrace{a+b+c+d}^{2.0}$
    6. 下大括号，符号：`\underbrace{算式}`，如：$a+\underbrace{b+c}_{1.0}+d$
    7. 上位符号，符号：`\stacrel{上位符号}{基位符号}`，如：$\vec{x}\stackrel{\mathrm{def}}{=}{x_1,\dots,x_n}$

    **占位符**

    1. 两个quad空格，符号：`\qquad`，如：$x \qquad y$
    2. quad空格，符号：`\quad`，如：$x \quad y$
    3. 大空格，符号`\`，如：$x \  y$
    4. 中空格，符号`\:`，如：$x : y$
    5. 小空格，符号`\,`，如：$x , y$
    6. 没有空格，符号``，如：$xy$
    7. 紧贴，符号`\!`，如：$x ! y$

    **定界符与组合**

    1. 括号，符号：`（）\big(\big) \Big(\Big) \bigg(\bigg) \Bigg(\Bigg)`，如：$（）\big(\big) \Big(\Big) \bigg(\bigg) \Bigg(\Bigg)$
    2. 中括号，符号：`[]`，如：$[x+y]$
    3. 大括号，符号：`\{ \}`，如：${x+y}$
    4. 自适应括号，符号：`\left \right`，如：$\left(x\right)$，$\left(x{yz}\right)$
    5. 组合公式，符号：`{上位公式 \choose 下位公式}`，如：${n+1 \choose k}={n \choose k}+{n \choose k-1}$
    6. 组合公式，符号：`{上位公式 \atop 下位公式}`，如：$\sum_{k_0,k_1,\ldots>0 \atop k_0+k_1+\cdots=n}A_{k_0}A_{k_1}\cdots$

    **四则运算**

    1. 加法运算，符号：`+`，如：$x+y=z$
    2. 减法运算，符号：`-`，如：$x-y=z$
    3. 加减运算，符号：`\pm`，如：$x \pm y=z$
    4. 减甲运算，符号：`\mp`，如：$x \mp y=z$
    5. 乘法运算，符号：`\times`，如：$x \times y=z$
    6. 点乘运算，符号：`\cdot`，如：$x \cdot y=z$
    7. 星乘运算，符号：`\ast`，如：$x \ast y=z$
    8. 除法运算，符号：`\div`，如：$x \div y=z$
    9. 斜法运算，符号：`/`，如：$x/y=z$
    10. 分式表示，符号：`\frac{分子}{分母}`，如：$\frac{x+y}{y+z}$
    11. 分式表示，符号：`{分子} \voer {分母}`，如：${x+y} \over {y+z}$
    12. 绝对值表示，符号：`||`，如：$|x+y|$

    **高级运算**

    1. 平均数运算，符号：`\overline{算式}`，如：$\overline{xyz}$
    2. 开二次方运算，符号：`\sqrt`，如：$\sqrt x$
    3. 开方运算，符号：`\sqrt[开方数]{被开方数}`，如：$\sqrt[3]{x+y}$
    4. 对数运算，符号：`\log`，如：$\log(x)$
    5. 极限运算，符号：`\lim`，如：$\lim^{x \to \infty}_{y \to 0}{\frac{x}{y}}$
    6. 极限运算，符号：`\displaystyle \lim`，如：$\displaystyle \lim^{x \to \infty}_{y \to 0}{\frac{x}{y}}$
    7. 求和运算，符号：`\sum`，如：$\sum^{x \to \infty}_{y \to 0}{\frac{x}{y}}$
    8. 求和运算，符号：`\displaystyle \sum`，如：$\displaystyle \sum^{x \to \infty}_{y \to 0}{\frac{x}{y}}$
    9. 积分运算，符号：`\int`，如：$\int^{\infty}_{0}{xdx}$
    10. 积分运算，符号：`\displaystyle \int`，如：$\displaystyle \int^{\infty}_{0}{xdx}$
    11. 微分运算，符号：`\partial`，如：$\frac{\partial x}{\partial y}$
    12. 矩阵表示，符号：`\begin{matrix} \end{matrix}`，如：$\left[ \begin{matrix} 1 &2 &\cdots &4\5 &6 &\cdots &8\\vdots &\vdots &\ddots &\vdots\13 &14 &\cdots &16\end{matrix} \right]$

    **逻辑运算**

    1. 等于运算，符号：`=`，如：$x+y=z$
    2. 大于运算，符号：`>`，如：$x+y>z$
    3. 小于运算，符号：`<`，如：$x+y<z$
    4. 大于等于运算，符号：`\geq`，如：$x+y \geq z$
    5. 小于等于运算，符号：`\leq`，如：$x+y \leq z$
    6. 不等于运算，符号：`\neq`，如：$x+y \neq z$
    7. 不大于等于运算，符号：`\ngeq`，如：$x+y \ngeq z$
    8. 不大于等于运算，符号：`\not\geq`，如：$x+y \not\geq z$
    9. 不小于等于运算，符号：`\nleq`，如：$x+y \nleq z$
    10. 不小于等于运算，符号：`\not\leq`，如：$x+y \not\leq z$
    11. 约等于运算，符号：`\approx`，如：$x+y \approx z$
    12. 恒定等于运算，符号：`\equiv`，如：$x+y \equiv z$

    **集合运算**

    1. 属于运算，符号：`\in`，如：$x \in y$
    2. 不属于运算，符号：`\notin`，如：$x \notin y$
    3. 不属于运算，符号：`\not\in`，如：$x \not\in y$
    4. 子集运算，符号：`\subset`，如：$x \subset y$
    5. 子集运算，符号：`\supset`，如：$x \supset y$
    6. 真子集运算，符号：`\subseteq`，如：$x \subseteq y$
    7. 非真子集运算，符号：`\subsetneq`，如：$x \subsetneq y$
    8. 真子集运算，符号：`\supseteq`，如：$x \supseteq y$
    9. 非真子集运算，符号：`\supsetneq`，如：$x \supsetneq y$
    10. 非子集运算，符号：`\not\subset`，如：$x \not\subset y$
    11. 非子集运算，符号：`\not\supset`，如：$x \not\supset y$
    12. 并集运算，符号：`\cup`，如：$x \cup y$
    13. 交集运算，符号：`\cap`，如：$x \cap y$
    14. 差集运算，符号：`\setminus`，如：$x \setminus y$
    15. 同或运算，符号：`\bigodot`，如：$x \bigodot y$
    16. 同与运算，符号：`\bigotimes`，如：$x \bigotimes y$
    17. 实数集合，符号：`\mathbb{R}`，如：`\mathbb{R}`
    18. 自然数集合，符号：`\mathbb{Z}`，如：`\mathbb{Z}`
    19. 空集，符号：`\emptyset`，如：$\emptyset$

    **数学符号**

    1. 无穷，符号：`\infty`，如：$\infty$
    2. 虚数，符号：`\imath`，如：$\imath$
    3. 虚数，符号：`\jmath`，如：$\jmath$
    4. 数学符号，符号`\hat{a}`，如：$\hat{a}$
    5. 数学符号，符号`\check{a}`，如：$\check{a}$
    6. 数学符号，符号`\breve{a}`，如：$\breve{a}$
    7. 数学符号，符号`\tilde{a}`，如：$\tilde{a}$
    8. 数学符号，符号`\bar{a}`，如：$\bar{a}$
    9. 矢量符号，符号`\vec{a}`，如：$\vec{a}$
    10. 数学符号，符号`\acute{a}`，如：$\acute{a}$
    11. 数学符号，符号`\grave{a}`，如：$\grave{a}$
    12. 数学符号，符号`\mathring{a}`，如：$\mathring{a}$
    13. 一阶导数符号，符号`\dot{a}`，如：$\dot{a}$
    14. 二阶导数符号，符号`\ddot{a}`，如：$\ddot{a}$
    15. 上箭头，符号：`\uparrow`，如：$\uparrow$
    16. 上箭头，符号：`\Uparrow`，如：$\Uparrow$
    17. 下箭头，符号：`\downarrow`，如：$\downarrow$
    18. 下箭头，符号：`\Downarrow`，如：$\Downarrow$
    19. 左箭头，符号：`\leftarrow`，如：$\leftarrow$
    20. 左箭头，符号：`\Leftarrow`，如：$\Leftarrow$
    21. 右箭头，符号：`\rightarrow`，如：$\rightarrow$
    22. 右箭头，符号：`\Rightarrow`，如：$\Rightarrow$
    23. 底端对齐的省略号，符号：`\ldots`，如：$1,2,\ldots,n$
    24. 中线对齐的省略号，符号：`\cdots`，如：$x_1^2 + x_2^2 + \cdots + x_n^2$
    25. 竖直对齐的省略号，符号：`\vdots`，如：$\vdots$
    26. 斜对齐的省略号，符号：`\ddots`，如：$\ddots$

    **希腊字母**

    | 字母 | 实现       | 字母 | 实现       |
    | ---- | ---------- | ---- | ---------- |
    | A    | `A`        | α    | `\alhpa`   |
    | B    | `B`        | β    | `\beta`    |
    | Γ    | `\Gamma`   | γ    | `\gamma`   |
    | Δ    | `\Delta`   | δ    | `\delta`   |
    | E    | `E`        | ϵ    | `\epsilon` |
    | Z    | `Z`        | ζ    | `\zeta`    |
    | H    | `H`        | η    | `\eta`     |
    | Θ    | `\Theta`   | θ    | `\theta`   |
    | I    | `I`        | ι    | `\iota`    |
    | K    | `K`        | κ    | `\kappa`   |
    | Λ    | `\Lambda`  | λ    | `\lambda`  |
    | M    | `M`        | μ    | `\mu`      |
    | N    | `N`        | ν    | `\nu`      |
    | Ξ    | `\Xi`      | ξ    | `\xi`      |
    | O    | `O`        | ο    | `\omicron` |
    | Π    | `\Pi`      | π    | `\pi`      |
    | P    | `P`        | ρ    | `\rho`     |
    | Σ    | `\Sigma`   | σ    | `\sigma`   |
    | T    | `T`        | τ    | `\tau`     |
    | Υ    | `\Upsilon` | υ    | `\upsilon` |
    | Φ    | `\Phi`     | ϕ    | `\phi`     |
    | X    | `X`        | χ    | `\chi`     |
    | Ψ    | `\Psi`     | ψ    | `\psi`     |
    | Ω    | `\v`       | ω    | `\omega`   |

    为了在浏览器中能正确显示上述公式，我们可以采取如下方式：

    在chrome的扩展程序中，打开chrome网上应用店，然后搜索MathJax Plugin for Github，下载该插件，并且启用，就可以让上述公式正常显示。




# 测试工具

## 目录

1. 压力测试工具
   - [JMeter](#JMeter)
     - [JMeter脚本编写](#JMeter脚本编写)
     - [执行性能测试](#执行性能测试)
     - [分析测试报告](#分析测试报告)
     - [Badboy](#Badboy)

## JMeter

官网下载地址：[http://jmeter.apache.org/download_jmeter.cgi](http://jmeter.apache.org/download_jmeter.cgi)

解压zip包，双击JMeter解压路径bin下面的jmeter.bat即可启动JMeter。

### JMeter脚本编写

1、添加线程组

![x](./Resource/添加线程组.png)
![x](./Resource/配置线程组.png)

线程组参数详解：

1. 线程数：虚拟用户数。一个虚拟用户占用一个进程或线程。设置多少虚拟用户数在这里也就是设置多少个线程数。
2. Ramp-Up Period(in seconds)准备时长：设置的虚拟用户数需要多长时间全部启动。如果线程数为10，准备时长为2，那么需要2秒钟启动10个线程，也就是每秒钟启动5个线程。
3. 循环次数：每个线程发送请求的次数。如果线程数为10，循环次数为100，那么每个线程发送100次请求。总请求数为10*100=1000 。如果勾选了“永远”，那么所有线程会一直发送请求，一到选择停止运行脚本。
4. Delay Thread creation until needed：直到需要时延迟线程的创建。
5. 调度器：设置线程组启动的开始时间和结束时间（配置调度器时，需要勾选循环次数为永远）

- 持续时间（秒）：测试持续时间，会覆盖结束时间
- 启动延迟（秒）：测试延迟启动时间，会覆盖启动时间
- 启动时间：测试启动时间，启动延迟会覆盖它。当启动时间已过，手动只需测试时当前时间也会覆盖它。
- 结束时间：测试结束时间，持续时间会覆盖它。

2、添加HTTP请求

![x](./Resource/添加HTTP请求.png)
![x](./Resource/配置HTTP请求.png)

Http请求主要参数详解：

1. Web服务器

   - 协议：向目标服务器发送HTTP请求协议，可以是HTTP或HTTPS，默认为HTTP
   - 服务器名称或IP ：HTTP请求发送的目标服务器名称或IP
   - 端口号：目标服务器的端口号，默认值为80

2. Http请求

   - 方法：发送HTTP请求的方法，可用方法包括GET、POST、HEAD、PUT、OPTIONS、TRACE、DELETE等。
   - 路径：目标URL路径（URL中去掉服务器地址、端口及参数后剩余部分）
   Content encoding ：编码方式，默认为ISO-8859-1编码，这里配置为utf-8

3. 同请求一起发送参数

   在请求中发送的URL参数，用户可以将URL中所有参数设置在本表中，表中每行为一个参数（对应URL中的 name=value），注意参数传入中文时需要勾选“编码”

3、添加察看结果树

![x](./Resource/添加察看结果树.png)
![x](./Resource/添加察看结果树2.png)

4、添加用户自定义变量

![x](./Resource/添加用户自定义变量.png)
![x](./Resource/添加用户自定义变量2.png)
![x](./Resource/添加用户自定义变量3.png)

5、添加断言

![x](./Resource/添加断言.png)
![x](./Resource/添加断言2.png)

6、添加断言结果

![x](./Resource/添加断言结果.png)
![x](./Resource/添加断言结果2.png)

7、添加聚合报告

![x](./Resource/添加聚合报告.png)

### 执行性能测试

![x](./Resource/配线程组.png)
![x](./Resource/执行测试.png)

### 分析测试报告

性能测试执行完成后，打开聚合报告可以看到：

![x](./Resource/测试报告.png)

聚合报告参数详解：

1. Label：每个 JMeter 的 element（例如 HTTP Request）都有一个 Name 属性，这里显示的就是 Name 属性的值
2. #Samples：请求数——表示这次测试中一共发出了多少个请求，如果模拟10个用户，每个用户迭代10次，那么这里显示100
3. Average：平均响应时间——默认情况下是单个 Request 的平均响应时间，当使用了 Transaction Controller 时，以Transaction 为单位显示平均响应时间
4. Median：中位数，也就是 50％ 用户的响应时间
5. 90% Line：90％ 用户的响应时间
6. Min：最小响应时间
7. Max：最大响应时间
8. Error%：错误率——错误请求数/请求总数
9. Throughput：吞吐量——默认情况下表示每秒完成的请求数（Request per Second），当使用了 Transaction Controller 时，也可以表示类似 LoadRunner 的 Transaction per Second 数
10. KB/Sec：每秒从服务器端接收到的数据量，相当于LoadRunner中的Throughput/Sec

一般而言，性能测试中我们需要重点关注的数据有： #Samples 请求数，Average 平均响应时间，Min 最小响应时间，Max 最大响应时间，Error% 错误率及Throughput 吞吐量。

### Badboy

Badboy作用很多，但是大部分是作为脚本录制工具来使用。

**为什么使用badboy录制？**

在使用jmeter自动录制脚本时会产生很多无用的请求，所以推荐使用badboy录制脚本之后保存为jmx文件，在jmeter中打开使用。

![x](./Resource/badboy.png)

1、启动

开Badboy，页面如下，录制按钮默认为开启，此时把badboy当做浏览器，进行的各种操作都会被badboy记录下载。

![x](./Resource/启动.png)

2、记录

举个栗子，我在导航栏输入`www.baidu.com`，点击右侧箭头进入百度，在百度搜索栏搜索badboy后，得到如下图的记录，可以看到操作步骤被记录了下来。

![x](./Resource/记录.gif)

3、重现

记录完成后点击方块停止，然后点击播放，就可以重现刚才的操作，并且可以看到每步下操作下传递的数据。

![x](./Resource/重现.gif)

点击“播放”是执行一个步骤，可能需要多次点击才能完成所有操作。完成一轮操作后，需要点“上一曲”来回到最开始才能再执行。

4、保存

记录完成后，我们需要保存，一般选择两种形式，一种是badboy自身的格式，如果需要导入Jmeter进行自动化测试，我们就用下面的Export to Jmeter。

![x](./Resource/保存.gif)

# Make

## Make简介

代码变成可执行文件，叫做编译(compile)；先编译这个，还是先编译那个（即编译的安排），叫做构建(build)。

Make是最常用的构建工具，诞生于1977年，主要用于C语言的项目。但是实际上 ，任何只要某个文件有变化，就要重新构建的项目，都可以用Make构建。

Make这个词，英语的意思是“制作”。Make命令直接用了这个意思，就是要做出某个文件。比如，要做出文件a.txt，就可以执行下面的命令。

```sh
make a.txt
```

但是，如果你真的输入这条命令，它并不会起作用。因为Make命令本身并不知道，如何做出a.txt，需要有人告诉它，如何调用其他命令完成这个目标。

比如，假设文件 a.txt 依赖于 b.txt 和 c.txt ，是后面两个文件连接（cat命令）的产物。那么，make 需要知道下面的规则。

```sh
a.txt: b.txt c.txt
    cat b.txt c.txt > a.txt
```

也就是说，make a.txt 这条命令的背后，实际上分成两步：第一步，确认 b.txt 和 c.txt 必须已经存在，第二步使用 cat 命令 将这个两个文件合并，输出为新文件。

像这样的规则，都写在一个叫做 Makefile 的文件中，Make命令依赖这个文件进行构建。Makefile文件也可以写为makefile， 或者用命令行参数指定为其他文件名。

```sh
make -f rules.txt
```

或者

```sh
make --file=rules.txt
```

上面代码指定make命令依据rules.txt文件中的规则，进行构建。

总之，make只是一个根据指定的Shell命令进行构建的工具。它的规则很简单，你规定要构建哪个文件、它依赖哪些源文件，当那些文件有变动时，如何重新构建它。

## Makefile文件的格式

构建规则都写在Makefile文件里面，要学会如何Make命令，就必须学会如何编写Makefile文件。

Makefile文件由一系列规则(rules)构成。每条规则的形式如下。

```sh
<target> : <prerequisites> 
[tab]  <commands>
```

上面第一行冒号前面的部分，叫做“目标”(target)，冒号后面的部分叫做“前置条件”(prerequisites)；第二行必须由一个tab键起首，后面跟着“命令”(commands)。

“目标”是必需的，不可省略；“前置条件”和“命令”都是可选的，但是两者之中必须至少存在一个。

每条规则就明确两件事：构建目标的前置条件是什么，以及如何构建。下面就详细讲解，每条规则的这三个组成部分。

### 目标

一个目标（target）就构成一条规则。目标通常是文件名，指明Make命令所要构建的对象，比如上文的 a.txt 。目标可以是一个文件名，也可以是多个文件名，之间用空格分隔。
除了文件名，目标还可以是某个操作的名字，这称为"伪目标"（phony target）。

```sh
clean:
    rm *.o
```

上面代码的目标是clean，它不是文件名，而是一个操作的名字，属于"伪目标 "，作用是删除对象文件。

```	
make  clean
```

但是，如果当前目录中，正好有一个文件叫做clean，那么这个命令不会执行。因为Make发现clean文件已经存在，就认为没有必要重新构建了，就不会执行指定的rm命令。

为了避免这种情况，可以明确声明clean是"伪目标"，写法如下。

```sh
.PHONY: clean
clean:
    rm *.o temp
```

声明clean是"伪目标"之后，make就不会去检查是否存在一个叫做clean的文件，而是每次运行都执行对应的命令。像.PHONY这样的内置目标名还有不少，可以查看手册。

如果Make命令运行时没有指定目标，默认会执行Makefile文件的第一个目标。

```sh
make
```

上面代码执行Makefile文件的第一个目标。

### 前置条件（prerequisites）

前置条件通常是一组文件名，之间用空格分隔。它指定了"目标"是否重新构建的判断标准：只要有一个前置文件不存在，或者有过更新（前置文件的last-modification时间戳比目标的时间戳新），"目标"就需要重新构建。

```sh
result.txt: source.txt
    cp source.txt result.txt
```

上面代码中，构建 result.txt 的前置条件是 source.txt 。如果当前目录中，source.txt 已经存在，那么make result.txt可以正常运行，否则必须再写一条规则，来生成 source.txt 。

```sh
source.txt:
    echo "this is the source" > source.txt
```

上面代码中，source.txt后面没有前置条件，就意味着它跟其他文件都无关，只要这个文件还不存在，每次调用make source.txt，它都会生成。

```sh
make result.txt
make result.txt
```

上面命令连续执行两次make result.txt。第一次执行会先新建 source.txt，然后再新建 result.txt。第二次执行，Make发现 source.txt 没有变动（时间戳晚于 result.txt），就不会执行任何操作，result.txt 也不会重新生成。

如果需要生成多个文件，往往采用下面的写法。

```sh
source: file1 file2 file3
```

上面代码中，source 是一个伪目标，只有三个前置文件，没有任何对应的命令。

```sh
make source
```

执行make source命令后，就会一次性生成 file1，file2，file3 三个文件。这比下面的写法要方便很多。

```sh
make file1
make file2
make file3
```

### 命令（commands）

命令（commands）表示如何更新目标文件，由一行或多行的Shell命令组成。它是构建"目标"的具体指令，它的运行结果通常就是生成目标文件。

每行命令之前必须有一个tab键。如果想用其他键，可以用内置变量.RECIPEPREFIX声明。

```sh
.RECIPEPREFIX = >
all:
> echo Hello, world
```

上面代码用.RECIPEPREFIX指定，大于号（>）替代tab键。所以，每一行命令的起首变成了大于号，而不是tab键。

需要注意的是，每行命令在一个单独的shell中执行。这些Shell之间没有继承关系。

```sh
var-lost:
    export foo=bar
    echo "foo=[$$foo]"
```

上面代码执行后（make var-lost），取不到foo的值。因为两行命令在两个不同的进程执行。一个解决办法是将两行命令写在一行，中间用分号分隔。

```sh
var-kept:
    export foo=bar; echo "foo=[$$foo]"
```

另一个解决办法是在换行符前加反斜杠转义。

```sh
var-kept:
    export foo=bar; \
    echo "foo=[$$foo]"
```

最后一个方法是加上.ONESHELL:命令。

```sh
.ONESHELL:
var-kept:
    export foo=bar; 
    echo "foo=[$$foo]"
```

### Makefile文件的语法

- 注释：井号（#）在Makefile中表示注释。

- 回声（echoing）：正常情况下，make会打印每条命令，然后再执行，这就叫做回声（echoing）。在命令的前面加上@，就可以关闭回声。由于在构建过程中，需要了解当前在执行哪条命令，所以通常只在注释和纯显示的echo命令前面加上@。

- 通配符：通配符（wildcard）用来指定一组符合条件的文件名。Makefile 的通配符与 Bash 一致，主要有星号（*）、问号（？）和 [...] 。比如， *.o 表示所有后缀名为o的文件。

- 模式匹配：Make命令允许对文件名，进行类似正则运算的匹配，主要用到的匹配符是%。比如，假定当前目录下有 f1.c 和 f2.c 两个源码文件，需要将它们编译为对应的对象文件。

  ```sh
  %.o: %.c
  ```

  等同于下面的写法：

  ```sh
  f1.o: f1.c
  f2.o: f2.c
  ```

  使用匹配符%，可以将大量同类型的文件，只用一条规则就完成构建。

- 变量和赋值符：Makefile 允许使用等号自定义变量。

  ```sh
  txt = Hello World
  test:
      @echo $(txt)
  ```

  上面代码中，变量 txt 等于 Hello World。调用时，变量需要放在 $( ) 之中。

  调用Shell变量，需要在美元符号前，再加一个美元符号，这是因为Make命令会对美元符号转义。

- test:

  ```sh  
  @echo $$HOME
  ```

  有时，变量的值可能指向另一个变量。

  ```sh
  v1 = $(v2)
  ```

  上面代码中，变量 v1 的值是另一个变量 v2。这时会产生一个问题，v1 的值到底在定义时扩展（静态扩展），还是在运行时扩展（动态扩展）？如果 v2 的值是动态的，这两种扩展方式的结果可能会差异很大。

  为了解决类似问题，Makefile一共提供了四个赋值运算符 （=、:=、?=、+=），它们的区别请看StackOverflow。

  ```sh
  VARIABLE = value
  # 在执行时扩展，允许递归扩展。
  
  VARIABLE := value
  # 在定义时扩展。
  
  VARIABLE ?= value
  # 只有在该变量为空时才设置值。
  
  VARIABLE += value
  # 将值追加到变量的尾端。
  ```

- 内置变量（Implicit Variables）

  Make命令提供一系列内置变量，比如，$(CC) 指向当前使用的编译器，$(MAKE) 指向当前使用的Make工具。这主要是为了跨平台的兼容性，详细的内置变量清单见手册。

- output:

  ```sh
  $(CC) -o output input.c
  ```

- 自动变量（Automatic Variables）

  Make命令还提供一些自动变量，它们的值与当前规则有关。主要有以下几个。

  - $@

    `$@` 指代当前目标，就是Make命令当前构建的那个目标。比如，make foo的 $@ 就指代foo。

    ```sh
    a.txt b.txt: 
        touch $@
    ```

    等同于下面的写法

    ```sh
    a.txt:
        touch a.txt
    b.txt:
        touch b.txt
    ```

  - $<

    `$<` 指代第一个前置条件。比如，规则为 t: p1 p2，那么$< 就指代p1。

    ```sh
    a.txt: b.txt c.txt
        cp $< $@
    ```

  等同于下面的写法

    ```sh
    a.txt: b.txt c.txt
        cp b.txt a.txt
    ```

  - $?

    `$?` 指代比目标更新的所有前置条件，之间以空格分隔。比如，规则为 t: p1 p2，其中 p2 的时间戳比 t 新，$?就指代p2。

  - $^

    `$^` 指代所有前置条件，之间以空格分隔。比如，规则为 t: p1 p2，那么 $^ 就指代 p1 p2 。

  - $*

    `$*` 指代匹配符 % 匹配的部分， 比如% 匹配 f1.txt 中的f1 ，$* 就表示 f1。

  - $(@D) 和 $(@F)

    $(@D) 和 $(@F) 分别指向 $@ 的目录名和文件名。比如，$@是 src/input.c，那么$(@D) 的值为 src ，$(@F) 的值为 input.c。

  - `$(<D)` 和 `$(<F)`

    `$(<D)` 和 `$(<F)` 分别指向 `$<` 的目录名和文件名。

    所有的自动变量清单，请看手册。下面是自动变量的一个例子。

    ```sh
    dest/%.txt: src/%.txt
        @[ -d dest ] || mkdir dest
        cp $< $@
    ```

    上面代码将 src 目录下的 txt 文件，拷贝到 dest 目录下。首先判断 dest 目录是否存在，如果不存在就新建，然后，$< 指代前置文件（src/%.txt）， $@ 指代目标文件（dest/%.txt）。

- 判断和循环

  Makefile使用 Bash 语法，完成判断和循环。

  ```sh
  ifeq ($(CC),gcc)
    libs=$(libs_for_gcc)
  else
    libs=$(normal_libs)
  endif
  ```

  上面代码判断当前编译器是否 gcc ，然后指定不同的库文件。

  ```sh
  LIST = one two three
  all:
      for i in $(LIST); do \
          echo $$i; \
      done
  
  # 等同于
  
  all:
      for i in one two three; do \
          echo $i; \
      done
  ```

  上面代码的运行结果：

  ```sh
  one
  two
  three
  ```

- 函数：Makefile 还可以使用函数，格式如下：

  ```sh
  $(function arguments)
  # 或者
  ${function arguments}
  ```

  Makefile提供了许多内置函数，可供调用。下面是几个常用的内置函数。

  - shell 函数

    shell 函数用来执行 shell 命令

    ```sh
    srcfiles := $(shell echo src/{00..99}.txt)
    ```

  - wildcard 函数

    wildcard 函数用来在 Makefile 中，替换 Bash 的通配符。

    ```sh
    srcfiles := $(wildcard src/*.txt)
    ```

  - subst 函数

    subst 函数用来文本替换，格式如下。

    ```sh
    $(subst from,to,text)
    ```

  下面的例子将字符串"feet on the street"替换成"fEEt on the strEEt"。

    ```sh
  $(subst ee,EE,feet on the street)
    ```

    下面是一个稍微复杂的例子。

    ```sh
    comma:= ,
    empty:=
    # space变量用两个空变量作为标识符，当中是一个空格
    space:= $(empty) $(empty)
    foo:= a b c
    bar:= $(subst $(space),$(comma),$(foo))
    # bar is now `a,b,c'.
    ```

- patsubst函数：用于模式匹配的替换，格式如下：

  ```sh
  $(patsubst pattern,replacement,text)
  ```

  下面的例子将文件名"x.c.c bar.c"，替换成"x.c.o bar.o"。

  ```sh	
  $(patsubst %.c,%.o,x.c.c bar.c)
  ```

- 替换后缀名

  替换后缀名函数的写法是：变量名 + 冒号 + 后缀名替换规则。它实际上patsubst函数的一种简写形式。

  ```sh
  min: $(OUTPUT:.js=.min.js)
  ```

  上面代码的意思是，将变量OUTPUT中的后缀名 .js 全部替换成 .min.js 。

- Examples：Makefile 的实例

  1、执行多个目标

  ```
  .PHONY: cleanall cleanobj cleandiff
  
  cleanall : cleanobj cleandiff
      rm program
  
  cleanobj :
      rm *.o
  
  cleandiff :
      rm *.diff
  ```

  上面代码可以调用不同目标，删除不同后缀名的文件，也可以调用一个目标（cleanall），删除所有指定类型的文件。

  2、编译C语言项目

  ```sh
  edit : main.o kbd.o command.o display.o 
      cc -o edit main.o kbd.o command.o display.o
  
  main.o : main.c defs.h
      cc -c main.c
  kbd.o : kbd.c defs.h command.h
      cc -c kbd.c
  command.o : command.c defs.h command.h
      cc -c command.c
  display.o : display.c defs.h
      cc -c display.c
  
  clean :
     rm edit main.o kbd.o command.o display.o
  
  .PHONY: edit clean
  ```

## 参考

参考资料主要是 Isaac Schlueter 的《Makefile文件教程》和《GNU Make手册》。



# Cygwin & MinGW

## Cygwin

Cygwin是一个在windows平台上运行的类UNIX模拟环境，是cygnus solutions公司开发的自由软件（该公司开发的著名工具还有eCos，不过现已被Redhat收购）。它对于学习UNIX/Linux操作环境，或者从UNIX到Windows的应用程序移植，或者进行某些特殊的开发工作，尤其是使用GNU工具集在Windows上进行嵌入式系统开发，非常有用。随着嵌入式系统开发在国内日渐流行，越来越多的开发者对Cygwin产生了兴趣。

Cygwin提供一个UNIX 模拟 DLL 以及在其上层构建的多种可以在 Linux 系统中找到的软件包，在 Windows XP SP3 以上的版本提供良好的支持。Cygwin主要由Red Hat及其下属社区负责维护。

## MinGW

MinGW，是Minimalist GNU for Windows的缩写。它是一个可自由使用和自由发布的Windows特定头文件和使用GNU工具集导入库的集合，允许你在GNU/Linux和Windows平台生成本地的Windows程序而不需要第三方C运行时(C Runtime)库。MinGW 是一组包含文件和端口的库，其功能是允许控制台模式的程序使用微软的标准C运行时(C Runtime)库(MSVCRT.DLL)，该库在所有的 NT OS 上有效，在所有的 Windows 95发行版以上的 Windows OS 有效，使用基本运行时，你可以使用 GCC 写控制台模式的符合美国标准化组织(ANSI)程序，可以使用微软提供的 C 运行时(C Runtime)扩展，与基本运行时相结合，就可以有充分的权利既使用 CRT(C Runtime)又使用 Windows API功能。

### Win7下安装GCC编译器

1. 双击GCC安装包，mingw-get-setup.exe，点击Install安装
2. 点击Change选择安装路径，尽量不要有中文和空格
3. 将 package 下面的 `mingw-***` 和 `mingw32-***` 和 `msys-**` 都勾选上，等待下载安装，直到勾选框全部变成土灰色。
4. 找到安装目录的bin目录，将路径右键复制下来。
5. 在系统变量里面找到 Path变量，双击出现下面输入框，在变量值的末尾添加刚刚复制的bin目录，并在最后加上英文状态下的分号(;)。点击确定。
6. 测试是否安装成功，在cmd命令提示符里面输入 gcc --help 回车键。

>注意：在安装目录下面不要有空格或者中文



# vmware虚拟机

## NAT模式联外网

客户机将可用网络<b style="color:red">共享</b>给虚拟网络，默认网关（虚拟机内网络，客户机虚拟网络）都配置为 xxx.xxx.xxx.1

## NAT模式端口转发

作用：外网访问NAT模式虚拟机

![x](E:/WorkingDir/Office/Arts/Resource/22.png)

效果：

| 机器        | IP地址          | 访问地址                                                     |
| ----------- | --------------- | ------------------------------------------------------------ |
| 电脑1虚拟机 | 192.168.136.128 | `http://192.168.136.128:80`<br>`http://localhost:80`         |
| 电脑1宿主机 | 10.30.100.105   | `http://192.168.136.128:80`<br>`http://10.30.100.105:6090/`<br>`http://localhost:6090` |
| 电脑2       | 10.30.100.106   | `http://10.30.100.105:6090/`                                 |

## 关闭HyperV

```sh
bcdedit /set hypervisorlaunchtype off
```



# 在线工具

## 在线编码

- [Codepen](http://codepen.io/gaearon/pen/rrpgNB?editors=0010)
- [Codepan](https://codepan.net/boilerplate/react)

## 参考

- [详细介绍 BSD 开源协议](https://www.oschina.net/question/12_2825)
- [u盘工具箱](http://u.dafanqie.net/)