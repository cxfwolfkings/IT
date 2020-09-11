# SVN

## SVN的架构

![x](E:/WorkingDir/Office/Arts/Resource/svn_install.png)

安装
一、准备工作
1、SVN服务器：解压缩包，可以从官方网站下载最新版本。
2、SVN客户端：TortoiseSVN，即常说的小乌龟，是一个客户端程序，用来与服务器端通讯。
二、安装服务器和客户端程序
1、SVN服务器：直接解压缩到某个文件夹下即可。示例路径：c:\svn\备注：如果下载的是msi程序，直接运行按提示安装即可。
2、SVN客户端：直接运行按提示安装即可。示例路径：C:\Program Files\Subversion
三、建立版本库(Repository)：示例路径：e:\svnroot。建立版本库有两种方法：
方法一：建立空目录e:\svnroot\repos1，进入repos1文件夹，在空白处点击右键，选择"TortoiseSVN->Create Repositoryhere..."，
方法二：建立空目录e:\svnroot\repos2，进入DOS命令行，输入如下命令：
svnadmincreate e:\svnroot\repos2
四、运行SVN服务器，启动服务。启动服务有两种方法：
方法一，临时启动服务，在DOS下输入如下命令：(start svnserve --daemon --root J:\SVNRoot)
svnserve -d -r e:\svnroot\repos1 --listen-host ip地址  --listen-port=端口号
说明："listen-host"和"listen-port"可选。默认端口是3690，如果端口已经被占用，可以通过选项listen-port指定端口号。
注意：请不要关闭命令行窗口，关闭窗口会把 svn服务就停止了。
方法二，启动SVN服务为后台运行程序：
sc create svnserve binPath= "c:\svn\bin\svnserve.exe --service  -r e:\svnroot\repos1" displayname= "Subversion" depend=Tcpip  start= auto
说明一：
(1)sc是windows自带的服务配置程序。svnserve是服务的名称，可根据需求取名。
(2)参数binPath表示svnserve可执行文件的安装路径。
(3)--service表示以windows服务的形式运行，--r指明svnrepository的位置，service参数与r参数都作为binPath的一部分，因此与svnserve.exe的路径一起被包含在一对双引号当中。
(4)displayname表示在windows服务列表中显示的名字，depend=Tcpip表示svnserve服务的运行需要tcpip服务，start=auto表示开机后自动运行。安装服务后，svnserve要等下次开机时才会自动运行。
说明二：
(1)binPath的等号前面无空格，等号后面有空格。displayname、depend、start也一样，service前面是--，不是- ，而r前面是-。
(2)若要卸载svn服务，则执行 sc delete svnserve 即可。
(3)从"sc"到"auto"是同一个命令，必须写在同一行。
(4)启动服务命令：netstart svnserve，停止服务命令：net start svnserve，也可以进入Windows提供的界面操作SVNService服务了，即控制面板—>服务。
五、配置用户和权限
(1) 修改svnserve.conf，在e:\svn\repos1\conf目录下，用文本编辑器打开svnserve.conf：
将：

# anon-access = read

# auth-access = write

# password-db = passwd

# authz-db = authz

# realm = My First Repository

改为
anon-access = read    # 匿名登录用户拥有读取权限
auth-access = write   # 非匿名登录用户拥有写权限
password-db = passwd  # 启用passwd
authz-db = authz      # 启用权限控制
注意：
anon-access等列前面是没有空格的。
anon-access = read表示没通过用户名密码登录的访问只有读的权限，如果改为none则没有用户名密码不能访问
auth-access = write表示通过用户名密码登录的有写的权限（当然读的权限也就有了）
password-db = passwd表示可以通过“用户名=密码”的方式在passwd文件中添加用户
(2) 修改同目录的passwd文件，增加用户帐号：
将：
[users]

# harry = harryssecret

# sally = sallyssecret

添加帐号：
[users]

# harry = harryssecret

# sally = sallyssecret

admin = admin
添加一个admin账户，密码是admin。
(3) 修改同目录的authz文件，增加用户权限：
[groups]
admin = wolfkings      # 添加admin组，组里面增加一个wolfkings用户
[/]
@admin = rw             # 根目录下给admin组赋予读写权限
上面一个也可以这么写：
[SVNRoot:/]             # SVNRoot版本库
@admin = rw             # admin组有读写权限

* = r                    # 所有组都有读取权限
  六、初始化SVN，导入数据
  选中要上传SVN的文件夹，“右键 ->TortoiseSVN -> Import...”，在弹出对话框的"URL of repository"输入"svn://localhost/project1/"。在"Importmessage"输入注释，点击OK，要求输入帐号，输入账户admin和密码admin。
  七，测试SVN
  本地测试：新建一空文件夹test1，单击右键，选择"SVN Checkout"，在"URL of repository"中输入"svn://localhost/project1"。
  其他机器测试：如果运行svnserve的主机IP地址是1.2.3.4，则URL输入的内容就是"svn://1.2.3.4/project1"。

API
hacking指南，可以在http://subversion.tigris.org/hacking.html找到，这个文档包含了有用的信息，同时满足Subversion本身的开发者和将Subversion作为第三方库的开发者。
Apache 可移值运行库
伴随Subversion自己的数据类型，你会看到许多apr开头的数据类型引用—来自Apache可移植运行库（APR）的对象。APR是Apache可移植运行库，源自为了服务器代码的多平台性，尝试将不同的操作系统特定字节与操作系统无关代码隔离。结果就提供了一个基础API的库，只有一些适度区别—或者是广泛的—来自各个操作系统。Apache HTTP服务器很明显是APR库的第一个用户，Subversion开发者立刻发现了使用APR库的价值。意味着Subversion没有操作系统特定的代码，也意味着Subversion客户端可以在Server存在的平台编译和运行。当前这个列表包括，各种类型的Unix、Win32、OS/2和Mac OS X。
除了提供了跨平台一致的系统调用， APR给Subversion对多种数据类型有快速的访问，如动态数组和哈希表。Subversion在代码中广泛使用这些类型，但是Subversion的API原型中最常见的APR类型是apr_pool_t—APR内存池，Subversion使用内部缓冲池用来进行内存分配（除非外部库在API传递参数时需要一个不同的内存管理模式），而且一个人如果针对Subversion的API编码不需要做同样的事情，他们可以在需要时给API提供缓冲池，这意味着Subversion的API使用者也必须链接到APR，必须调用apr_initialize()来初始化APR子系统，而且在使用Subversion API时必须创建和管理池，通常是使用svn_pool_create()、svn_pool_clear()和svn_pool_destroy()。
使用内存池编程
几乎每一个使用过C语言的开发者曾经感叹令人畏缩的内存管理，分配足够的内存，并且追踪内存的分配，在不需要时释放内存—这个任务会非常复杂。当然，如果没有正确地做到这一点会导致程序毁掉自己，或者更加严重一点，把电脑搞瘫。
另一方面高级语言使开发者完全摆脱了内存管理，[53]Java和Python之类的语言使用垃圾收集原理，在需要的时候分配对象内存，在不使用时进行清理。
APR提供了一种叫做池基础的中等的内存管理方法，允许开发者以一种低分辨率的方式控制内存—每块（或池“pool”）的内存，而不是每个对象。不是使用malloc()和其他按照对象分配内存的方式，你要求APR从内存创建一段内存池，当你结束使用在池中创建的对象，你销毁池，可以有效地取消其中的对象消耗的内存。通过池，你不需要跟踪每个对象的内存释放，你的程序只需要跟踪这些对象，将对象分配到池中，而池的生命周期（池的创建和删除之间的时间）满足所有对象的需要。
URL和路径需求
因为分布式版本控制操作是Subversion存在的重点，有意义来关注一下国际化（i18n）支持。毕竟，当“分布式”或许意味着“横跨办公室”，它也意味着“横跨全球”。为了更容易一点，Subversion的所有公共接口只接受路径参数,这些参数是传统的，使用UTF-8编码。这意味着，举个例子，任何新的使用libsvn_client接口客户端库，在把这些参数传递给Subversion库前，需要首先将路径从本地代码转化为UTF-8代码，然后将Subversion传递回来的路径转换为本地代码，很幸运，Subversion提供了一组任何程序可以使用的转化方法（见subversion/include/svn_utf.h）。

同样，Subversion的API需要所有的URL参数是正确的URI编码，所以，我们不会传递file:///home/username/My File.txt作为My File.txt的URL，而要传递file:///home/username/My%20File.txt。再次，Subversion提供了一些你可以使用的助手方法—svn_path_uri_encode()和svn_path_uri_decode()，分别用来URI的编码和解码。
使用C和C++以外的语言
除C语言以外，如果你对使用其他语言结合Subversion库感兴趣—如Python脚本或是Java应用—Subversion通过简单包裹生成器（SWIG）提供了最初的支持。Subversion的SWIG绑定位于subversion/bindings/swig，并且慢慢的走向成熟进入可用状态。这个绑定允许你直接调用Subversion的API方法，使用包裹器会把脚本数据类型转化为Subversion需要的C语言库类型。
非常不幸，Subversion的语言绑定缺乏对核心Subversion模块的关注，但是，花了很多力气处理创建针对Python、Perl和Ruby的功能绑定，在一定程度上，在这些接口上的工作量可以在其他语言的SWIG（包括C#、Guile、Java、MzScheme、OCaml、PHP、Tcl等等）接口上得到重用。然而，为了完成复杂的API，一些SWIG接口仍然需要额外的编程工作，关于SWIG本身的更多信息可以看项目的网站http://www.swig.org/。
Subversion也有Java的语言绑定，JavaJL绑定（位于Subversion源目录树的subversion/bindings/java）不是基于SWIG的，而是javah和手写JNI的混合，JavaHL几乎覆盖Subversion客户端的API，目标是作为Java基础的Subversion客户端和集成IDE的实现。
Subversion的语言绑定缺乏Subversion核心模块的关注，但是通常可以作为一个产品信赖。大量脚本、应用、Subversion的GUI客户端和其他第三方工具现在已经成功地运用了Subversion语言绑定来完成Subversion的集成。
这里使用其它语言的方法来与Subversion交互没有任何意义：Subversion开发社区没有提供其他的绑定，你可以在Subversion项目链接页里（http://subversion.tigris.org/links.html）找到其他绑定的链接，但是有一些流行的绑定我觉得应该特别留意。首先是Python的流行绑定，Barry Scott的PySVN（http://pysvn.tigris.org/）。PySVN鼓吹它们提供了更多Python样式的接口，而不像Subversion自己的Python绑定的C样式接口。对于希望寻求Subversion纯Java实现的人，可以看看SVNKit（http://svnkit.com/），也就是从头使用Java编写的Subversion。你必须要小心，SVNKit没有采用Subversion的核心库，其行为方式没有确保与Subversion匹配。

代码样例
使用版本库层
使用版本库层中包含了一段C代码（C编写）描述了我们讨论的概念，它使用了版本库和文件系统接口（可以通过方法名svn_repos_和svn_fs_分辨）创建了一个添加目录的修订版本。你可以看到APR库的使用，为了内存分配而传递，这些代码也揭开了一些关于Subversion错误处理的晦涩事实—所有的Subversion错误必须需要明确的处理以防止内存泄露（在某些情况下，应用失败）。
/* Convert a Subversion error into a simple boolean error code.
 *

 * NOTE:  Subversion errors must be cleared (using svn_error_clear())
 * because they are allocated from the global pool, else memory
 * leaking occurs.
    */
   #define INT_ERR(expr)                           \
     do {                                          \
   svn_error_t *__temperr = (expr);            \
   if (__temperr)                              \
     {                                         \
       svn_error_clear(__temperr);             \
       return 1;                               \
     }                                         \
   return 0;                                   \
     } while (0)

/* Create a new directory at the path NEW_DIRECTORY in the Subversion

 * repository located at REPOS_PATH.  Perform all memory allocation in
 * POOL.  This function will create a new revision for the addition of
 * NEW_DIRECTORY.  Return zero if the operation completes
 * successfully, non-zero otherwise.
   */
   static int
   make_new_directory(const char *repos_path,
                  const char *new_directory,
                  apr_pool_t *pool)
   {
     svn_error_t *err;
     svn_repos_t *repos;
     svn_fs_t *fs;
     svn_revnum_t youngest_rev;
     svn_fs_txn_t *txn;
     svn_fs_root_t *txn_root;
     const char *conflict_str;

  /* Open the repository located at REPOS_PATH. 
   */
  INT_ERR(svn_repos_open(&repos, repos_path, pool));

  /* Get a pointer to the filesystem object that is stored in REPOS. 
   */
  fs = svn_repos_fs(repos);

  /* Ask the filesystem to tell us the youngest revision that

   * currently exists. 
     */
       INT_ERR(svn_fs_youngest_rev(&youngest_rev, fs, pool));

  /* Begin a new transaction that is based on YOUNGEST_REV.  We are

   * less likely to have our later commit rejected as conflicting if we
   * always try to make our changes against a copy of the latest snapshot
   * of the filesystem tree. 
     */
       INT_ERR(svn_fs_begin_txn(&txn, fs, youngest_rev, pool));

  /* Now that we have started a new Subversion transaction, get a root

   * object that represents that transaction. 
     */
       INT_ERR(svn_fs_txn_root(&txn_root, txn, pool));

  /* Create our new directory under the transaction root, at the path

   * NEW_DIRECTORY. 
     */
       INT_ERR(svn_fs_make_dir(txn_root, new_directory, pool));

  /* Commit the transaction, creating a new revision of the filesystem

   * which includes our added directory path.
     */
       err = svn_repos_fs_commit_txn(&conflict_str, repos, 
                             &youngest_rev, txn, pool);
       if (! err)

    {
      /* No error?  Excellent!  Print a brief report of our success.
       */
      printf("Directory '%s' was successfully added as new revision "
             "'%ld'.\n", new_directory, youngest_rev);
    }

  else if (err->apr_err == SVN_ERR_FS_CONFLICT)
    {
      /* Uh-oh.  Our commit failed as the result of a conflict
       * (someone else seems to have made changes to the same area 
       * of the filesystem that we tried to modify).  Print an error
       * message.
       */
      printf("A conflict occurred at path '%s' while attempting "
             "to add directory '%s' to the repository at '%s'.\n", 
             conflict_str, new_directory, repos_path);
    }
  else
    {
      /* Some other error has occurred.  Print an error message.
       */
      printf("An error occurred while attempting to add directory '%s' "
             "to the repository at '%s'.\n", 
             new_directory, repos_path);
    }

  INT_ERR(err);
} 

使用Python处理版本库层
同样的C程序需要处理APR内存池系统，但是Python自己处理内存，Subversion的Python绑定也遵循这种习惯。在C语言中，为表示路径和条目的hash需要处理自定义的数据类型（例如APR提供的库），但是Python有hash（叫做“dictionaries”），并且是内置数据类型，而且还提供了一系列操作这些类型的函数，所以SWIG（通过Subversion的语言绑定层的自定义帮助）要小心的将这些自定义数据类型映射到目标语言的数据类型，这为目标语言的用户提供了一个更加直观的接口。

#!/usr/bin/python

"""Crawl a repository, printing versioned object path names."""

import sys
import os.path
import svn.fs, svn.core, svn.repos

def crawl_filesystem_dir(root, directory):
    """Recursively crawl DIRECTORY under ROOT in the filesystem, and return
    a list of all the paths at or below DIRECTORY."""

    # Print the name of this path.
    print directory + "/"
    
    # Get the directory entries for DIRECTORY.
    entries = svn.fs.svn_fs_dir_entries(root, directory)
    
    # Loop over the entries.
    names = entries.keys()
    for name in names:
        # Calculate the entry's full path.
        full_path = directory + '/' + name
    
        # If the entry is a directory, recurse.  The recursion will return
        # a list with the entry and all its children, which we will add to
        # our running list of paths.
        if svn.fs.svn_fs_is_dir(root, full_path):
            crawl_filesystem_dir(root, full_path)
        else:
            # Else it's a file, so print its path here.
            print full_path

def crawl_youngest(repos_path):
    """Open the repository at REPOS_PATH, and recursively crawl its
    youngest revision."""
    

    # Open the repository at REPOS_PATH, and get a reference to its
    # versioning filesystem.
    repos_obj = svn.repos.svn_repos_open(repos_path)
    fs_obj = svn.repos.svn_repos_fs(repos_obj)
    
    # Query the current youngest revision.
    youngest_rev = svn.fs.svn_fs_youngest_rev(fs_obj)
    
    # Open a root object representing the youngest (HEAD) revision.
    root_obj = svn.fs.svn_fs_revision_root(fs_obj, youngest_rev)
    
    # Do the recursive crawl.
    crawl_filesystem_dir(root_obj, "")

if __name__ == "__main__":
    # Check for sane usage.
    if len(sys.argv) != 2:
        sys.stderr.write("Usage: %s REPOS_PATH\n"
                         % (os.path.basename(sys.argv[0])))
        sys.exit(1)

    # Canonicalize the repository path.
    repos_path = svn.core.svn_path_canonicalize(sys.argv[1])
    
    # Do the real work.
    crawl_youngest(repos_path)

一个Python状态爬虫
Subversion的Python绑定也可以用来进行工作拷贝的操作，在本章前面的小节中，我们提到过libsvn_client接口，它存在的目的就是简化编写Subversion客户端的难度，例 8.3 “一个Python状态爬虫”是一个例子，讲的是如何使用SWIG绑定创建一个扩展版本的svn status命令。
#!/usr/bin/env python

"""Crawl a working copy directory, printing status information."""

import sys
import os.path
import getopt
import svn.core, svn.client, svn.wc

def generate_status_code(status):
    """Translate a status value into a single-character status code,
    using the same logic as the Subversion command-line client."""
    code_map = { svn.wc.svn_wc_status_none        : ' ',
                 svn.wc.svn_wc_status_normal      : ' ',
                 svn.wc.svn_wc_status_added       : 'A',
                 svn.wc.svn_wc_status_missing     : '!',
                 svn.wc.svn_wc_status_incomplete  : '!',
                 svn.wc.svn_wc_status_deleted     : 'D',
                 svn.wc.svn_wc_status_replaced    : 'R',
                 svn.wc.svn_wc_status_modified    : 'M',
                 svn.wc.svn_wc_status_merged      : 'G',
                 svn.wc.svn_wc_status_conflicted  : 'C',
                 svn.wc.svn_wc_status_obstructed  : '~',
                 svn.wc.svn_wc_status_ignored     : 'I',
                 svn.wc.svn_wc_status_external    : 'X',
                 svn.wc.svn_wc_status_unversioned : '?',
               }
    return code_map.get(status, '?')

def do_status(wc_path, verbose):
    # Calculate the length of the input working copy path.
    wc_path_len = len(wc_path)

    # Build a client context baton.
    ctx = svn.client.svn_client_ctx_t()
    
    def _status_callback(path, status, root_path_len=wc_path_len):
        """A callback function for svn_client_status."""
    
        # Print the path, minus the bit that overlaps with the root of
        # the status crawl
        text_status = generate_status_code(status.text_status)
        prop_status = generate_status_code(status.prop_status)
        print '%s%s  %s' % (text_status, prop_status, path[wc_path_len + 1:])
        
    # Do the status crawl, using _status_callback() as our callback function.
    svn.client.svn_client_status(wc_path, None, _status_callback,
                                 1, verbose, 0, 0, ctx)

def usage_and_exit(errorcode):
    """Print usage message, and exit with ERRORCODE."""
    stream = errorcode and sys.stderr or sys.stdout
    stream.write("""Usage: %s OPTIONS WC-PATH
Options:
  --help, -h    : Show this usage message
  --verbose, -v : Show all statuses, even uninteresting ones
""" % (os.path.basename(sys.argv[0])))
    sys.exit(errorcode)
    
if __name__ == '__main__':
    # Parse command-line options.
    try:
        opts, args = getopt.getopt(sys.argv[1:], "hv", ["help", "verbose"])
    except getopt.GetoptError:
        usage_and_exit(1)
    verbose = 0
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage_and_exit(0)
        if opt in ("-v", "--verbose"):
            verbose = 1
    if len(args) != 1:
        usage_and_exit(2)
            

    # Canonicalize the repository path.
    wc_path = svn.core.svn_path_canonicalize(args[0])
    
    # Do the real work.
    try:
        do_status(wc_path, verbose)
    except svn.core.SubversionException, e:
        sys.stderr.write("Error (%d): %s\n" % (e[1], e[0]))
        sys.exit(1)

就像例 8.2 “使用 Python 处理版本库层”中的例子，这个程序是池自由的，而且最重要的是使用Python的数据类型。svn_client_ctx_t()是欺骗，因为Subversion的API没有这个方法—这仅仅是SWIG自动语言生成中的一点问题（这是对应复杂C结构的一种工厂方法）。也需要注意传递给程序的路径（象最后一个）是通过 svn_path_canonicalize()执行的，因为要防止触发Subversion底层C库的断言，也就是防止导致程序立刻随意退出。
参考资料
关于SVN API 可以参考:
 http://www.subversion.org.cn/svnbook/1.4/svn.developer.usingapi.html#svn.developer.layerlib.repos.ex-1

SVN 官方网址（英文）：http://subversion.tigris.org/
SVN 官方网址（中文） http://www.subversion.org.cn/

备份
(本文例子基于FreeBSD/Linux实现，windows环境请自己做出相应修改)
配置管理的一个重要使命是保证数据的安全性，防止服务器应硬盘损坏、误操作造成数据无法恢复的灾难性后果。因此制定一个完整的备份策略非常重要。 
一般来说，备份策略应规定如下几部分内容：备份频度、备份方式、备份存放地点、备份责任人、灾难恢复检查措施及规定。 
备份频度、存放地点等内容可以根据自己的实际情况自行制定；本文重点描述备份方式。 
svn备份一般采用三种方式：1）svnadmin dump 2) svnadmin hotcopy 3) svnsync. 
注意：svn备份不宜采用普通的文件拷贝方式（除非你备份的时候将库暂停），如copy命令、rsync命令。 
笔者曾经用 rsync命令来做增量和全量备份，在季度备份检查审计中，发现备份出来的库大部分都不可用，因此最好是用svn本身提供的功能来进行备份。 
优缺点分析： 
第一种svnadmin dump是官方推荐的备份方式，优点是比较灵活，可以全量备份也可以增量备份，并提供了版本恢复机制。缺点是：如果版本比较大，如版本数增长到数万、数十万，那么dump的过程将非常慢；备份耗时，恢复更耗时；不利于快速进行灾难恢复。 个人建议在版本数比较小的情况下使用这种备份方式。 
第二种svnadmin hotcopy原设计目的估计不是用来备份的，只能进行全量拷贝，不能进行增量备份；优点是：备份过程较快，灾难恢复也很快；如果备份机上已经搭建了svn服务，甚至不需要恢复，只需要进行简单配置即可切换到备份库上工作。 缺点是：比较耗费硬盘，需要有较大的硬盘支持（俺的备份机有1TB空间，呵呵）。 
第三种svnsync实际上是制作2个镜像库，当一个坏了的时候，可以迅速切换到另一个。不过，必须svn1.4版本以上才支持这个功能。优点是：当制作成2个镜像库的时候起到双机实时备份的作用；缺点是：当作为2个镜像库使用时，没办法做到“想完全抛弃今天的修改恢复到昨晚的样子”；而当作为普通备份机制每日备份时，操作又较前2种方法麻烦。      
下面具体描述这三种的备份的方法： 
1、svnadmin dump备份工具 ，这是subversion官方推荐的备份方式。 
1）定义备份策略： 
       备份频度：每周六进行一次全量备份，每周日到周五进行增量备份 
       备份地点：备份存储路径到/home/backup/svn/ 
       备份命名：全量备份文件名为：weekly_fully_backup.yymmdd,增量备份文件命名为：daily-incremental-backup.yymmdd 
       备份时间：每晚21点开始 
       备份检查：每月末进行svnadmin load恢复试验。
2）建立全量备份脚本： 
在~/下建立一个perl脚本文件，名为weekly_backup.pl，执行全量备份，并压缩备份文件，代码如下(本代码只针对一个库的备份，如果是多个库请做相应改动)： 
#!/usr/bin/perl -w 
my $svn_repos="/home/svn/repos/project1"; 
my $backup_dir="/home/backup/svn/"; 
my $next_backup_file = "weekly_fully_backup.".`date +%Y%m%d`; 

$youngest=`svnlook youngest $svn_repos`; 
chomp $youngest; 

print "Backing up to revision $youngestn"; 
my $svnadmin_cmd="svnadmin dump --revision 0youngest $svn_repos >$backup_dir/$next_backup_file"; 
`$svnadmin_cmd`; 
open(LOG,">$backup_dir/last_backed_up"); #记录备份的版本号 
print LOG $youngest; 
close LOG; 
#如果想节约空间，则再执行下面的压缩脚本 
print "Compressing dump file...n"; 
print `gzip -g $backup_dir/$next_backup_file`; 

3）建立增量备份脚本： 
在全量备份的基础上，进行增量备份：在~/下建立一个perl脚本文件，名为：daily_backup.pl，代码如下： 
#!/usr/bin/perl -w 
my $svn_repos="/home/svn/repos/project1"; 
my $backup_dir="/home/backup/svn/"; 
my $next_backup_file = "daily_incremental_backup.".`date +%Y%m%d`; 

open(IN,"$backup_dir/last_backed_up"); 
$previous_youngest = <IN>; 
chomp $previous_youngest; 
close IN; 

$youngest=`svnlook youngest $svn_repos`; 
chomp $youngest; 
if ($youngest eq $previous_youngest) 
{ 
  print "No new revisions to backup.n"; 
  exit 0; 
} 
my $first_rev = $previous_youngest + 1; 
print "Backing up revisions $youngest ...n"; 
my $svnadmin_cmd = "svnadmin dump --incremental --revision $first_revyoungest $svn_repos > $backup_dir/$next_backup_file"; 
`$svnadmin_cmd`; 
open(LOG,">$backup_dir/last_backed_up"); #记录备份的版本号 
print LOG $youngest; 
close LOG; 
#如果想节约空间，则再执行下面的压缩脚本 
print "Compressing dump file...n"; 
print `gzip -g $backup_dir/$next_backup_file`; 

4）配置/etc/crontab文件 
   配置 /etc/crontab 文件，指定每周六执行weekly_backup.pl，指定周一到周五执行daily_backup.pl; 具体步骤俺就不啰嗦了. 

5）备份恢复检查 
在月底恢复检查中或者在灾难来临时，请按照如下步骤进行恢复：恢复顺序从低版本逐个恢复到高版本；即，先恢复最近的一次完整备份 weekly_full_backup.071201（举例），然后恢复紧挨着这个文件的增量备份 daily_incremental_backup.071202，再恢复后一天的备份071203，依次类推。如下： 
user1>mkdir newrepos 
user1>svnadmin create newrepos 
user1>svnadmin load newrepos < weekly_full_backup.071201 
user1>svnadmin load newrepos < daily_incremental_backup.071202 
user1>svnadmin load newrepos < daily_incremental_backup.071203 
.... 

如果备份时采用了gzip进行压缩，恢复时可将解压缩和恢复命令合并，简单写成： 
user1>zcat weekly_full_backup.071201 | svnadmin load newrepos 
user1>zcat daily_incremental_backup.071202 | svnadmin load newrepos 
... 
(这部分内容很多参考了《版本控制之道》) 

2、svnadmin hotcopy整库拷贝方式 
svnadmin hotcopy是将整个库都“热”拷贝一份出来，包括库的钩子脚本、配置文件等；任何时候运行这个脚本都得到一个版本库的安全拷贝，不管是否有其他进程正在使用版本库。 因此这是俺青睐的备份方式。 
1）	定义备份策略 
备份频度：每天进行一次全量备份， 
备份地点：备份目录以日期命名，备份路径到 /home/backup/svn/${mmdd} 
备份保留时期：保留10天到15天，超过15天的进行删除。 
备份时间：每晚21点开始 
备份检查：备份完毕后自动运行检查脚本、自动发送报告。 
2）建立备份脚本 
在自己home目录 ~/下创建一个文件，backup.sh： 
#!/bin/bash 
SRCPATH=/home/svn/repos/; #定义仓库parent路径 
DISTPATH=/home/backup/svn/`date +%m%d`/ ; #定义存放路径; 
if [ -d "$DISTPATH" ] 
then 
else 
   mkdir $DISTPATH 
   chmod g+s $DISTPATH 
fi 
echo $DISTPATH 
svnadmin hotcopy $SRCPATH/Project1 $DISTPATH/Project1 >/home/backup/svn/cpreport.log 2>&1; 
svnadmin hotcopy $SRCPATH/Project2 $DISTPATH/Project2 
cp $SRCPATH/access  $DISTPATH; #备份access文件 
cp $SRCPATH/passwd  $DISTPATH; #备份passwd文件 
perl /home/backup/svn/backup_check.pl #运行检查脚本 
perl /home/backup/svn/deletDir.pl  #运行删除脚本，对过期备份进行删除。
3）建立检查脚本
在上面指定的地方/home/backup/svn/下建立一个perl脚本：backup_check.pl 
备份完整性检查的思路是：对备份的库运行 svnlook youngest，如果能正确打印出最新的版本号，则表明备份文件没有缺失；如果运行报错，则说明备份不完整。我试过如果备份中断，则运行svnlook youngest会出错。 perl脚本代码如下： 
#! /usr/bin/perl 

## Author:xuejiang 

## 2007-11-10 

## http://www.scmbbs.com 

use strict; 
use Carp; 
use Net::SMTP; 

#### defined the var ####### 

my $smtp =Net::SMTP->new('mail.scmbbs.com', Timeout => 30, Debug => 0)|| die "cann't connect to mail.scmbbs.comn"; 

my $bkrepos="/home/backup/svn/".&get_day;#定义备份路径 
my $ssrepos="http://www.scmbbs.com/repos";#定义仓库url 
my @repos = ("project1","project2"); 
my $title="echo "如下是昨晚备份结果与真实库对比的情况，如果给出备份版本数，则表示备份成功；如果给报错信息或没有备份版本数，则表示备份失败：
" >./report"; 
system $title  || die "exec failedn"; 
foreach my $myrepos(@repos) 
{ 
    my $bkrepos1=$bkrepos."/".$myrepos; 
  my $ssrepos1=$ssrepos."/".$myrepos; 
  my $svnlookbk1 = "echo "$myrepos 昨晚备份的版本是：">>./report;svnlook youngest ".$bkrepos1." >> ./report 2>&1"; 
  my $svnlookss1 = "echo "$myrepos 真实库中的最新版本及最后修改时间是：">>./report;svn log -r'HEAD' ".$ssrepos1." >> ./report 2>&1"; 
  system $svnlookbk1 || die "exec failedn"; 
  system $svnlookss1 || die "exec failedn"; 

} 

my $body       ="echo "=========================================================================" >>./report"; 
my $bottom     ="echo "备份位置：来自http://www.scmbbs.com的".$bkrepos."" >>./report"; 

system $body       || die "exec failedn"; 
system $bottom     || die "exec failedn"; 

###### report the result #### 

open(SESAME,"./report")|| die "can not open ./report"; 
my @svnnews = <SESAME>; 
close(SESAME); 
foreach my $line1 (@svnnews) 
{ 
      print $line1."n"; 
} 

my @email_addresses =("scm@list.scmbbs.com","leader1@scmbbs.com","leader2@scmbbs.com"); 
my $to              = join(', ', @email_addresses); 
$smtp->mail("scm@scmbbs.com"); 
$smtp->recipient(@email_addresses); 
$smtp->data(); 
$smtp->datasend("Toton"); 
$smtp->datasend("From: svnReport@scmbbs.comn"); 
$smtp->datasend("Subject:svn备份检查报告".&get_today."n"); 
$smtp->datasend("Reply-to:scm@scmbbs.comn"); 
$smtp->datasend("@svnnews"); 
$smtp->dataend(); 
$smtp->quit; 

############# 

sub get_today 
{ 
my( $sec, $min, $hour, $day, $month, $year ) = localtime( time() ); 
$year += 1900; 
$month++; 
my $today = sprintf( "%04d%02d%02d", $year, $month, $day); 
return $today; 
} 
sub get_day 
{ 
    my( $sec, $min, $hour, $day, $month, $year ) = localtime( time() ); 
$year += 1900; 
$month++; 
my $today = sprintf( "%02d%02d", $month, $day); 
return $today; 
} 
4)定义删除脚本 
由于是全量备份，所以备份不宜保留太多，只需要保留最近10来天的即可，对于超过15天历史的备份基本可以删除了。 
在/home/backup/svn/下建立一个perl脚本：deletDir.pl 
(注意，删除svn备份库可不像删除普通文件那么简单） 
脚本代码请参看我的另一个帖子：http://www.scmbbs.com/cn/systp/2007/12/systp6.php 

5）修改/etc/crontab 文件 
在该文件中指定每晚21点执行“backup.sh”脚本。 
3、svnsync备份   
参阅：http://www.scmbbs.com/cn/svntp/2007/11/svntp4.php 
使用svnsync备份很简单，步骤如下： 
1）在备份机上创建一个空库：svnadmin create Project1 
2）更改该库的钩子脚本pre-revprop-change（因为svnsync要改这个库的属性，也就是要将源库的属性备份到这个库，所以要启用这个脚本）:   
cd SMP/hooks; 
  	cp pre-revprop-change.tmpl pre-revprop-change; 
  	chmod 755 pre-revprop-change; 
  	vi pre-revprop-change; 
将该脚本后面的三句注释掉，或者干脆将它弄成一个空文件。 
3）初始化，此时还没有备份任何数据： 
svnsync init file:///home/backup/svn/svnsync/Project1/  http://svntest.subversion.com/repos/Project1 
语法是：svnsync init {你刚创建的库url} {源库url} 
注意本地url是三个斜杠的：/// 
4）开始备份（同步）： 
svnsync sync file:///home/backup/svn/svnsync/Project1 
5）建立同步脚本 
备份完毕后，建立钩子脚本进行同步。在源库/hooks/下建立/修改post-commit脚本，在其中增加一行，内容如下： 
    	/usr/bin/svnsync sync  --non-interactive file:///home/backup/svn/svnsync/Project1 
  	你可能已经注意到上面的备份似乎都是本地备份，不是异地备份。实际上，我是通过将远程的备份机mount（请参阅mount命令）到svn服务器上来实现的，逻辑上看起来是本地备份，物理上实际是异地备份。
清理
1.准备工作 
打开命令行提示符，输入命令： svnlook youngest d:/SVNRepository ，查看当前最新的版本号，显示最新版本记录为755。
2.备份版本库 （很重要，我在尝试过程中出现过失败，幸亏有备份，不然就over了）
把D盘的版本库，备份到C盘，同时清除历史日志，输入命令：
svnadmin hotcopy --clean-logs d:/SVNRepository c:/SVNRepository
这样备份后版本库从3.34G变为3.24G。
3.dump需要保留的版本 
我最初选择保留700-755的版本，但是在这一步运行过程中出现这样一段话：

* 已转存版本 739。
* 已转存版本 740。
  警告: 版本 535 的参考数据比最旧的转存数据版本 (700)还旧。装载这个转存到空的版本库会失败。
* 已转存版本 741。 
  我没有太在意，结果从dump恢复版本库时出现错误，屏幕显示：svnadmin: 当前版本库不存在相对源版本 -164，并终止运行。导致我使用备份库进行dump。
  跳过这段，直接说正确的方法。输入：
  svnadmin dump c:/SVNRepository -r 745:755 > d:/repo_dump_745_755.dmp
  3.24G的版本库dump出来后变成760M，苗条不少。
  4.删除旧版本库 
  输入命令：
  rmdir /s/q d:/SVNRepository
  删除旧版本库。也可以直接在资源管理器里删除。
  5.创建空的版本库 
  输入命令：
  svnadmin create d:/SVNRepository
  检查空的版本库大概31.2K大小。
  6.把dump文件导入版本库 
  输入命令：
  svnadmin load d:/SVNRepository < d:/repo_dump_745_755.dmp
  这时屏幕上会显示正在载入版本库中的文件或正在提交/装载的版本。完成后，用命令
  svnlook youngest d:/SVNRepository
  查看，显示当前版本库最新版本号是11，整个版本库大小501M。
  至此，SVN版本库瘦身成功，腾出空间2.7G，大致相当于腾出原SVN库近5/6的空间！


SVN服务器几种备份策略
（本文例子基于FreeBSD/Linux实现，windows环境请自己做出相应修改） 
配置管理的一个重要使命是保证数据的安全性，防止服务器应硬盘损坏、误操作造成数据无法恢复的灾难性后果。因此制定一个完整的备份策略非常重要。 
一般来说，备份策略应规定如下几部分内容：备份频度、备份方式、备份存放地点、备份责任人、灾难恢复检查措施及规定。 
备份频度、存放地点等内容可以根据自己的实际情况自行制定；本文重点描述备份方式。 
svn备份一般采用三种方式：1）svnadmin dump 2) svnadmin hotcopy 3) svnsync. 
注意：svn备份不宜采用普通的文件拷贝方式（除非你备份的时候将库暂停），如copy命令、rsync命令。 
笔者曾经用 rsync命令来做增量和全量备份，在季度备份检查审计中，发现备份出来的库大部分都不可用，因此最好是用svn本身提供的功能来进行备份。 
优缺点分析： 
第一种svnadmin dump是官方推荐的备份方式，优点是比较灵活，可以全量备份也可以增量备份，并提供了版本恢复机制。缺点是：如果版本比较大，如版本数增长到数万、数十万，那么dump的过程将非常慢；备份耗时，恢复更耗时；不利于快速进行灾难恢复。 个人建议在版本数比较小的情况下使用这种备份方式。 
第二种svnadmin hotcopy原设计目的估计不是用来备份的，只能进行全量拷贝，不能进行增量备份；优点是：备份过程较快，灾难恢复也很快；如果备份机上已经搭建了svn服务，甚至不需要恢复，只需要进行简单配置即可切换到备份库上工作。 缺点是：比较耗费硬盘，需要有较大的硬盘支持（俺的备份机有1TB空间，呵呵）。 
第三种svnsync实际上是制作2个镜像库，当一个坏了的时候，可以迅速切换到另一个。不过，必须svn1.4版本以上才支持这个功能。优点是：当制作成2个镜像库的时候起到双机实时备份的作用；缺点是：当作为2个镜像库使用时，没办法做到“想完全抛弃今天的修改恢复到昨晚的样子”；而当作为普通备份机制每日备份时，操作又较前2种方法麻烦。      
下面具体描述这三种的备份的方法： 
1、svnadmin dump备份工具 ，这是subversion官方推荐的备份方式。 
1）定义备份策略： 
       备份频度：每周六进行一次全量备份，每周日到周五进行增量备份 
       备份地点：备份存储路径到/home/backup/svn/ 
       备份命名：全量备份文件名为：weekly_fully_backup.yymmdd,增量备份文件命名为：daily-incremental-backup.yymmdd 
       备份时间：每晚21点开始 
       备份检查：每月末进行svnadmin load恢复试验。 
    	
2）建立全量备份脚本： 
       在~/下建立一个perl脚本文件，名为weekly_backup.pl，执行全量备份，并压缩备份文件，代码如下(本代码只针对一个库的备份，如果是多个库请做相应改动)： 
#!/usr/bin/perl -w 
my $svn_repos="/home/svn/repos/project1"; 
my $backup_dir="/home/backup/svn/"; 
my $next_backup_file = "weekly_fully_backup.".`date +%Y%m%d`; 

$youngest=`svnlook youngest $svn_repos`; 
chomp $youngest; 

print "Backing up to revision $youngestn"; 
my $svnadmin_cmd="svnadmin dump --revision 0youngest $svn_repos >$backup_dir/$next_backup_file"; 
`$svnadmin_cmd`; 
open(LOG,">$backup_dir/last_backed_up"); #记录备份的版本号 
print LOG $youngest; 
close LOG; 
#如果想节约空间，则再执行下面的压缩脚本 
print "Compressing dump file...n"; 
print `gzip -g $backup_dir/$next_backup_file`; 

3）建立增量备份脚本： 
在全量备份的基础上，进行增量备份：在~/下建立一个perl脚本文件，名为：daily_backup.pl，代码如下： 
#!/usr/bin/perl -w 
my $svn_repos="/home/svn/repos/project1"; 
my $backup_dir="/home/backup/svn/"; 
my $next_backup_file = "daily_incremental_backup.".`date +%Y%m%d`; 

open(IN,"$backup_dir/last_backed_up"); 
$previous_youngest = <IN>; 
chomp $previous_youngest; 
close IN; 

$youngest=`svnlook youngest $svn_repos`; 
chomp $youngest; 
if ($youngest eq $previous_youngest) 
{ 
  print "No new revisions to backup.n"; 
  exit 0; 
} 
my $first_rev = $previous_youngest + 1; 
print "Backing up revisions $youngest ...n"; 
my $svnadmin_cmd = "svnadmin dump --incremental --revision $first_revyoungest $svn_repos > $backup_dir/$next_backup_file"; 
`$svnadmin_cmd`; 
open(LOG,">$backup_dir/last_backed_up"); #记录备份的版本号 
print LOG $youngest; 
close LOG; 
#如果想节约空间，则再执行下面的压缩脚本 
print "Compressing dump file...n"; 
print `gzip -g $backup_dir/$next_backup_file`; 

4）配置/etc/crontab文件 
   配置 /etc/crontab 文件，指定每周六执行weekly_backup.pl，指定周一到周五执行daily_backup.pl; 具体步骤俺就不啰嗦了. 

5）备份恢复检查 
在月底恢复检查中或者在灾难来临时，请按照如下步骤进行恢复：恢复顺序从低版本逐个恢复到高版本；即，先恢复最近的一次完整备份 weekly_full_backup.071201（举例），然后恢复紧挨着这个文件的增量备份 daily_incremental_backup.071202，再恢复后一天的备份071203，依次类推。如下： 
user1>mkdir newrepos 
user1>svnadmin create newrepos 
user1>svnadmin load newrepos < weekly_full_backup.071201 
user1>svnadmin load newrepos < daily_incremental_backup.071202 
user1>svnadmin load newrepos < daily_incremental_backup.071203 
.... 

如果备份时采用了gzip进行压缩，恢复时可将解压缩和恢复命令合并，简单写成： 
user1>zcat weekly_full_backup.071201 | svnadmin load newrepos 
user1>zcat daily_incremental_backup.071202 | svnadmin load newrepos 
... 
(这部分内容很多参考了《版本控制之道》) 

2、svnadmin hotcopy整库拷贝方式 
svnadmin hotcopy是将整个库都“热”拷贝一份出来，包括库的钩子脚本、配置文件等；任何时候运行这个脚本都得到一个版本库的安全拷贝，不管是否有其他进程正在使用版本库。 因此这是俺青睐的备份方式。 
1）	定义备份策略 
备份频度：每天进行一次全量备份， 
备份地点：备份目录以日期命名，备份路径到 /home/backup/svn/${mmdd} 
备份保留时期：保留10天到15天，超过15天的进行删除。 
备份时间：每晚21点开始 
备份检查：备份完毕后自动运行检查脚本、自动发送报告。 
2）建立备份脚本 
在自己home目录 ~/下创建一个文件，backup.sh： 
#!/bin/bash 
SRCPATH=/home/svn/repos/; #定义仓库parent路径 
DISTPATH=/home/backup/svn/`date +%m%d`/ ; #定义存放路径; 
if [ -d "$DISTPATH" ] 
then 
else 
   mkdir $DISTPATH 
   chmod g+s $DISTPATH 
fi 
echo $DISTPATH 
svnadmin hotcopy $SRCPATH/Project1 $DISTPATH/Project1 >/home/backup/svn/cpreport.log 2>&1; 
svnadmin hotcopy $SRCPATH/Project2 $DISTPATH/Project2 
cp $SRCPATH/access  $DISTPATH; #备份access文件 
cp $SRCPATH/passwd  $DISTPATH; #备份passwd文件 
perl /home/backup/svn/backup_check.pl #运行检查脚本 
perl /home/backup/svn/deletDir.pl  #运行删除脚本，对过期备份进行删除。
3）建立检查脚本
在上面指定的地方/home/backup/svn/下建立一个perl脚本：backup_check.pl 
备份完整性检查的思路是：对备份的库运行 svnlook youngest，如果能正确打印出最新的版本号，则表明备份文件没有缺失；如果运行报错，则说明备份不完整。我试过如果备份中断，则运行svnlook youngest会出错。 perl脚本代码如下： 
#! /usr/bin/perl 

## Author:xuejiang 

## 2007-11-10 

## http://www.scmbbs.com 

use strict; 
use Carp; 
use Net::SMTP; 

#### defined the var ####### 

my $smtp =Net::SMTP->new('mail.scmbbs.com', Timeout => 30, Debug => 0)|| die "cann't connect to mail.scmbbs.comn"; 

my $bkrepos="/home/backup/svn/".&get_day;#定义备份路径 
my $ssrepos="http://www.scmbbs.com/repos";#定义仓库url 
my @repos = ("project1","project2"); 
my $title="echo "如下是昨晚备份结果与真实库对比的情况，如果给出备份版本数，则表示备份成功；如果给报错信息或没有备份版本数，则表示备份失败：
" >./report"; 
system $title  || die "exec failedn"; 
foreach my $myrepos(@repos) 
{ 
    my $bkrepos1=$bkrepos."/".$myrepos; 
  my $ssrepos1=$ssrepos."/".$myrepos; 
  my $svnlookbk1 = "echo "$myrepos 昨晚备份的版本是：">>./report;svnlook youngest ".$bkrepos1." >> ./report 2>&1"; 
  my $svnlookss1 = "echo "$myrepos 真实库中的最新版本及最后修改时间是：">>./report;svn log -r'HEAD' ".$ssrepos1." >> ./report 2>&1"; 
  system $svnlookbk1 || die "exec failedn"; 
  system $svnlookss1 || die "exec failedn"; 

} 

my $body       ="echo "=========================================================================" >>./report"; 
my $bottom     ="echo "备份位置：来自http://www.scmbbs.com的".$bkrepos."" >>./report"; 

system $body       || die "exec failedn"; 
system $bottom     || die "exec failedn"; 

###### report the result #### 

open(SESAME,"./report")|| die "can not open ./report"; 
my @svnnews = <SESAME>; 
close(SESAME); 
foreach my $line1 (@svnnews) 
{ 
      print $line1."n"; 
} 

my @email_addresses =("scm@list.scmbbs.com","leader1@scmbbs.com","leader2@scmbbs.com"); 
my $to              = join(', ', @email_addresses); 
$smtp->mail("scm@scmbbs.com"); 
$smtp->recipient(@email_addresses); 
$smtp->data(); 
$smtp->datasend("Toton"); 
$smtp->datasend("From: svnReport@scmbbs.comn"); 
$smtp->datasend("Subject:svn备份检查报告".&get_today."n"); 
$smtp->datasend("Reply-to:scm@scmbbs.comn"); 
$smtp->datasend("@svnnews"); 
$smtp->dataend(); 
$smtp->quit; 

############# 

sub get_today 
{ 
my( $sec, $min, $hour, $day, $month, $year ) = localtime( time() ); 
$year += 1900; 
$month++; 
my $today = sprintf( "%04d%02d%02d", $year, $month, $day); 
return $today; 
} 
sub get_day 
{ 
    my( $sec, $min, $hour, $day, $month, $year ) = localtime( time() ); 
$year += 1900; 
$month++; 
my $today = sprintf( "%02d%02d", $month, $day); 
return $today; 
} 
4)定义删除脚本 
由于是全量备份，所以备份不宜保留太多，只需要保留最近10来天的即可，对于超过15天历史的备份基本可以删除了。 
在/home/backup/svn/下建立一个perl脚本：deletDir.pl 
(注意，删除svn备份库可不像删除普通文件那么简单） 
脚本代码请参看我的另一个帖子：http://www.scmbbs.com/cn/systp/2007/12/systp6.php 

5）修改/etc/crontab 文件 
在该文件中指定每晚21点执行“backup.sh”脚本。 
3、svnsync备份   
参阅：http://www.scmbbs.com/cn/svntp/2007/11/svntp4.php 
使用svnsync备份很简单，步骤如下： 
1）在备份机上创建一个空库：svnadmin create Project1 
2）更改该库的钩子脚本pre-revprop-change（因为svnsync要改这个库的属性，也就是要将源库的属性备份到这个库，所以要启用这个脚本）:   
cd SMP/hooks; 
  	cp pre-revprop-change.tmpl pre-revprop-change; 
  	chmod 755 pre-revprop-change; 
  	vi pre-revprop-change; 
将该脚本后面的三句注释掉，或者干脆将它弄成一个空文件。 
3）初始化，此时还没有备份任何数据： 
svnsync init file:///home/backup/svn/svnsync/Project1/  http://svntest.subversion.com/repos/Project1 
语法是：svnsync init {你刚创建的库url} {源库url} 
注意本地url是三个斜杠的：/// 
4）开始备份（同步）： 
svnsync sync file:///home/backup/svn/svnsync/Project1 
5）建立同步脚本 
备份完毕后，建立钩子脚本进行同步。在源库/hooks/下建立/修改post-commit脚本，在其中增加一行，内容如下： 
    	/usr/bin/svnsync sync  --non-interactive file:///home/backup/svn/svnsync/Project1 
  	你可能已经注意到上面的备份似乎都是本地备份，不是异地备份。实际上，我是通过将远程的备份机mount（请参阅mount命令）到svn服务器上来实现的，逻辑上看起来是本地备份，物理上实际是异地备份。


如何在windows上安装部署设置SVN服务器
工具/原料
操作系统：Windows2003，32位
SVN Server版本：svn-win32-1.6.16
SVN Client版本：TortoiseSVN-1.6.16.21511
方法/步骤
一、准备工作
1、SVN服务器：解压缩包，可以从官方网站下载最新版本。
2、SVN客户端：TortoiseSVN，即常说的小乌龟，是一个客户端程序，用来与服务器端通讯。

二、安装服务器和客户端程序
1、SVN服务器：直接解压缩到某个文件夹下即可。示例路径：c:\svn\备注：如果下载的是msi程序，直接运行按提示安装即可。
2、SVN客户端：直接运行按提示安装即可。示例路径：C:\Program Files\Subversion

三、建立版本库（Repository）：示例路径：e:\svnroot。建立版本库有两种方法：
方法一，建立空目录e:\svnroot\repos1，进入repos1文件夹，在空白处点击右键，选择“TortoiseSVN->Create Repositoryhere...”，
方法二，建立空目录e:\svnroot\repos2，进入DOS命令行，输入如下命令：
svnadmincreate e:\svnroot\repos2

![x](E:/WorkingDir/Office/Arts/Resource/1.jpg)



四、运行SVN服务器，启动服务。启动服务有两种方法：
方法一，临时启动服务，在DOS下输入如下命令：
svnserve -d -r e:\svnroot\repos1 --listen-host ip地址  --listen-port=端口号
说明：“listen-host”和“listen-port”可选。默认端口是3690,如果端口已经被占用，可以通过选项listen-port指定端口号。
注意：请不要关闭命令行窗口，关闭窗口会把 svn服务就停止了。
方法二，启动SVN服务为后台运行程序：
sc create svnserve binPath= "c:\svn\bin\svnserve.exe --service  -r e:\svnroot\repos1" displayname= "Subversion" depend=Tcpip  start= auto
说明一：
(1)sc是windows自带的服务配置程序。svnserve是服务的名称，可根据需求取名。
(2)参数binPath表示svnserve可执行文件的安装路径。
(3)--service表示以windows服务的形式运行，--r指明svnrepository的位置，service参数与r参数都作为binPath的一部分，因此与svnserve.exe的路径一起被包含在一对双引号当中。
(4)displayname表示在windows服务列表中显示的名字，depend=Tcpip表示svnserve服务的运行需要tcpip服务，start=auto表示开机后自动运行。安装服务后，svnserve要等下次开机时才会自动运行。
说明二：
(1)binPath的等号前面无空格，等号后面有空格。displayname、depend、start也一样，service前面是--，不是- ，而r前面是-。
(2)若要卸载svn服务，则执行 sc delete svnserve 即可。
(3)从“sc”到“auto”是在同一个命令sc，必须写在同一行。
(4)启动服务命令：netstart svnserve，停止服务命令：net start svnserve，也可以进入Windows提供的界面操作SVNService服务了，即控制面板—>服务。
(5)如果路径中包括空格，一定要用“\”处理“"”号，例如上面的例子中如果svnserve.exe在“c:\programfiles\svn\”中，则命令应该写为“binpath="\"c:\programfiles\svn\bin\svnserve.exe\"



五、配置用户和权限
(1)修改svnserve.conf，在e:\svn\repos1\conf目录下，用文本编辑器打开svnserve.conf：
将：
      # anon-access = read
      # auth-access = write
      # password-db = passwd
改为
      anon-access = read
      auth-access = write
      password-db = passwd
注意说明：
anon-access等列前面是没有空格的。
anon-access = read表示没通过用户名密码登录的访问只有读的权限，如果改为none则没有用户名密码不能访问
auth-access = write表示通过用户名密码登录的有写的权限(当然读的权限也就有了)
password-db = passwd表示可以通过“用户名=密码”的方式在passwd文件中添加用户
(2)修改同目录的passwd文件，增加用户帐号：
将：
      [users]
      # harry = harryssecret
      # sally = sallyssecret
添加帐号：
      [users]
      # harry = harryssecret
      # sally = sallyssecret
      admin = admin
添加一个admin账户，密码是admin。

六、初始化SVN，导入数据
选中要上传SVN的文件夹，“右键 ->TortoiseSVN -> Import...” ，在弹出对话框的“URL of repository”输入“svn://localhost/project1/”。在“Importmessage”输入注释，点击OK，要求输入帐号，输入账户admin和密码admin。
七，测试SVN
本地测试：新建一空文件夹test1，单击右键，选择“SVN Checkout”，在“URL of repository”中输入“svn://localhost/project1”。
其他机器测试：如果运行svnserve的主机IP地址是1.2.3.4，则URL输入的内容就是“svn://1.2.3.4/project1”。

