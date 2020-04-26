# [Java集合详解](https://blog.csdn.net/qq_33642117/article/details/52040345)

集合类存放于 `java.util` 包中。 

集合类存放的都是对象的引用，而非对象本身，出于表达上的便利，我们称集合中的对象就是指集合中对象的引用(reference)。 

集合类型主要有3种：set（集）、list（列表）和 map（映射）。

通俗的说，集合就是一个放数据的容器，准确的说是放数据对象引用的容器。

![x](http://viyitech.cn/public/images/java_collections.png)

## List

 ![x](http://viyitech.cn/public/images/java_list.png)

`AbstarctCollection` 是 `Collection` 接口的部分实现

`List` 是一个有序的集合，和 set 不同的是，`List` 允许存储项的值为空，也允许存储相等值的存储项。

`List` 是继承于 `Collection` 接口，除了 `Collection` 通用的方法以外，扩展了部分只属于 `List` 的方法。

`AbstractList` 也只是实现了 `List` 接口部分的方法，和 `AbstractCollection` 是一个思路。

### ArraryList

`ArrayList` 是一个数组实现的列表，由于数据是存入数组中的，所以它的特点也和数组一样，查询很快，但是中间部分的插入和删除很慢。

### Vector

`Vector` 就是 `ArrayList` 的线程安全版，它的方法前都加了 **synchronized** 锁，其他实现逻辑都相同。如果对线程安全要求不高的话，可以选择 `ArrayList` ，毕竟 `synchronized` 也很耗性能。

![x](http://viyitech.cn/public/images/java_vector.jpg)

### LinkedList

双向链表。`LinkedList` 继承于 `AbstractSequentialList`，和 `ArrayList` 一个套路。内部维护了3个成员变量，一个是当前链表的头节点，一个是尾部节点，还有链表长度。

通过上面对 `ArrayList` 和 `LinkedList` 的分析，可以理解 `List` 的3个特性

1. 是按顺序查找 
2. 允许存储项为空 
3. 允许多个存储项的值相等 

然后对比 `LinkedList` 和 `ArrayList` 的实现方式不同，可以在不同的场景下使用不同的 `List` 

1. `ArrayList` 是由数组实现的，方便查找，返回数组下标对应的值即可，适用于多查找的场景 

2. `LinkedList` 由链表实现，插入和删除方便，适用于多次数据替换的场景

### queue

**Queue**：基本上，一个队列就是一个先入先出**(FIFO)**的数据结构。

`Queue` 接口与 `List`、`Set` 同一级别，都是继承了 `Collection` 接口。`LinkedList` 实现了 `Deque` 接口。

![x](http://viyitech.cn/public/images/java_queue.png)

**Queue** 的实现

**1、** **没有实现阻塞接口的：**

`LinkedList`：实现了 `java.util.Queue` 接口和 `java.util.AbstractQueue` 接口

内置的不阻塞队列：`PriorityQueue` 和 `ConcurrentLinkedQueue`

`PriorityQueue` 和 `ConcurrentLinkedQueue` 类在 Collection Framework 中加入两个具体集合实现。 

`PriorityQueue` 类实质上维护了一个有序列表。加入到 `Queue` 中的元素根据它们的天然排序（通过其 `java.util.Comparable` 实现）或者根据传递给构造函数的 `java.util.Comparator` 实现来定位。

`ConcurrentLinkedQueue`（无界线程安全，采用**CAS**机制（`compareAndSwapObject` 原子操作））是基于链接节点的、线程安全的队列。并发访问不需要同步。因为它在队列的尾部添加元素并从头部删除它们，所以只要不需要知道队列的大小，`ConcurrentLinkedQueue` 对公共集合的共享访问就可以工作得很好。收集关于队列大小的信息会很慢，需要遍历队列。

**2、** **实现阻塞接口的：**

`java.util.concurrent` 中加入了 `BlockingQueue` 接口和五个阻塞队列类（采用锁机制，使用 `ReentrantLock` 锁）。它实质上就是一种带有一点扭曲的 FIFO 数据结构。不是立即从队列中添加或者删除元素，线程执行操作阻塞，直到有空间或者元素可用。

五个队列所提供的各有不同：

- `ArrayBlockingQueue`：一个由数组支持的有界队列。
- `LinkedBlockingQueue`：一个由链接节点支持的可选有界队列。

 　* `PriorityBlockingQueue`：一个由优先级堆支持的无界优先级队列。
 　* `DelayQueue`：一个由优先级堆支持的、基于时间的调度队列。
 　* `SynchronousQueue`：一个利用 `BlockingQueue` 接口的简单聚集(rendezvous)机制。

**关于 `ConcurrentLinkedQueue` 和 `LinkedBlockingQueue`**

1. `LinkedBlockingQueue` 是使用锁机制，`ConcurrentLinkedQueue` 是使用CAS算法，虽然`LinkedBlockingQueue` 的底层获取锁也是使用的CAS算法

2. 关于取元素，`ConcurrentLinkedQueue` 不支持阻塞去取元素，`LinkedBlockingQueue` 支持阻塞的 take() 方法，如若大家需要 `ConcurrentLinkedQueue` 的消费者产生阻塞效果，需要自行实现

3. 关于插入元素的性能，从字面上和代码简单的分析来看 `ConcurrentLinkedQueue` 肯定是最快的，但是这个也要看具体的测试场景。在实际的使用过程中，尤其在多cpu的服务器上，有锁和无锁的差距便体现出来了，`ConcurrentLinkedQueue` 会比 `LinkedBlockingQueue` 快很多。

下表显示了jdk1.5中的阻塞队列的操作：

| 方法名      | 功能                     | 描述                                               |
| ----------- | :----------------------- | -------------------------------------------------- |
| **add**     | 增加一个元索             | 如果队列已满，则抛出一个IIIegaISlabEepeplian异常   |
| **remove**  | 移除并返回队列头部的元素 | 如果队列为空，则抛出一个NoSuchElementException异常 |
| **element** | 返回队列头部的元素       | 如果队列为空，则抛出一个NoSuchElementException异常 |
| **offer**   | 添加一个元素并返回true   | 如果队列已满，则返回false                          |
| **poll**    | 移除并返问队列头部的元素 | 如果队列为空，则返回null                           |
| **peek**    | 返回队列头部的元素       | 如果队列为空，则返回null                           |
| **put**     | 添加一个元素             | 如果队列满，则阻塞                                 |
| **take**    | 移除并返回队列头部的元素 | 如果队列为空，则阻塞                               |

**remove**、**element**、**offer** 、**poll**、**peek** 其实是属于 `Queue` 接口。 

阻塞队列的操作可以根据它们的响应方式分为以下三类：add、remove 和 element 操作在你试图为一个已满的队列增加元素或从空队列取得元素时抛出异常。当然，在多线程程序中，队列在任何时间都可能变成满的或空的，所以你可能想使用 offer、poll、peek 方法。这些方法在无法完成任务时只是给出一个出错示而不会抛出异常。

注意：poll 和 peek 方法出错会返回 null。因此，向队列中插入 null 值是不合法的

最后，我们有阻塞操作 put 和 take。put 方法在队列满时阻塞，take 方法在队列空时阻塞。

**LinkedBlockingQueue** 的容量是没有上限的（说的不准确，在不指定时容量为 Integer.MAX_VALUE，不然的话在 put 时怎么会受阻呢），但是也可以选择指定其最大容量，它是基于链表的队列，此队列按 FIFO（先进先出）排序元素。

**ArrayBlockingQueue** 在构造时需要指定容量，并可以选择是否需要公平性，如果公平参数被设置true，等待时间最长的线程会优先得到处理（其实就是通过将 ReentrantLock 设置为 true 来达到这种公平性：即等待时间最长的线程会先操作）。通常，公平性会使你在性能上付出代价，只有在的确非常需要的时候再使用它。它是基于数组的阻塞循环队列，此队列按 FIFO（先进先出）原则对元素进行排序。

**PriorityBlockingQueue** 是一个带优先级的队列，而不是先进先出队列。元素按优先级顺序被移除，该队列也没有上限（看了一下源码，`PriorityBlockingQueue` 是对 `PriorityQueue` 的再次包装，是基于堆数据结构的，而 `PriorityQueue` 是没有容量限制的，与 `ArrayList` 一样，所以在优先阻塞队列上 put 时是不会受阻的。虽然此队列逻辑上是无界的，但是由于资源被耗尽，所以试图执行添加操作可能会导致 OutOfMemoryError），但是如果队列为空，那么取元素的操作take就会阻塞，所以它的检索操作 take 是受阻的。另外，加入该队列中的元素要具有比较能力。

**DelayQueue**（基于 `PriorityQueue` 来实现的）是一个存放 Delayed 元素的无界阻塞队列，只有在延迟期满时才能从中提取元素。该队列的头部是延迟期满后保存时间最长的 Delayed 元素。如果延迟都还没有期满，则队列没有头部，并且 poll 将返回 null。当一个元素的 getDelay(TimeUnit.NANOSECONDS) 方法返回一个小于或等于零的值时，则出现期满，poll 就以移除这个元素了。此队列不允许使用 null 元素。

![x](http://viyitech.cn/public/images/java_collection.jpg)

## stack

栈是一种用于存储数据的简单数据结构，有点类似链表或者顺序表（统称线性表），栈与线性表的最大区别是数据的存取的操作，我们可以这样认为，栈(Stack)是一种特殊的线性表，其插入和删除操作只允许在线性表的一端进行，一般而言，把允许操作的一端称为栈顶(Top)，不可操作的一端称为栈底(Bottom)，同时把插入元素的操作称为入栈(Push)，删除元素的操作称为出栈(Pop)。若栈中没有任何元素，则称为空栈，栈的结构如下图： 

![x](http://viyitech.cn/public/images/java_stack.png)

由图我们可看成栈只能从栈顶存取元素，同时先进入的元素反而是后出，而栈顶永远指向栈内最顶部的元素。到此可以给出栈的正式定义：栈(Stack)是一种有序特殊的线性表，只能在表的一端（称为栈顶，top，总是指向栈顶元素）执行插入和删除操作，最后插入的元素将第一个被删除，因此栈也称为后进先出(Last In First Out, LIFO)或先进后出(First In Last Out, FILO)的线性表。栈的基本操作创建栈，判空，入栈，出栈，获取栈顶元素等，注意**栈不支持对指定位置进行删除，插入**。

 JAVA中，栈是 `Vector` 的一个子类

**顺序栈**

顺序栈，顾名思义就是采用顺序表实现的的栈，顺序栈的内部以顺序表为基础，实现对元素的存取操作，当然我们还可以采用内部数组实现顺序栈，具体请看测试代码。

**链式栈**

所谓的链式栈(Linked Stack)，就是采用链式存储结构的栈，由于我们操作的是栈顶一端，因此这里采用单链表（不带头结点）作为基础，直接实现栈的添加，获取，删除等主要操作即可。具体请看测试代码。

最后我们来看看顺序栈与链式栈中各个操作的算法复杂度（时间和空间）对比，顺序栈复杂度如下：

| **操作**                      | **时间复杂度** |
| ----------------------------- | -------------- |
| SeqStack空间复杂度（N次push） | O(n)           |
| push()时间复杂度              | O(1)           |
| pop()时间复杂度               | O(1)           |
| peek()时间复杂度              | O(1)           |
| isEmpty()时间复杂度           | O(1)           |

  链式栈复杂度如下：

| **操作**                        | **时间复杂度** |
| ------------------------------- | -------------- |
| SeqStack空间复杂度(用于N次push) | O(n)           |
| push()时间复杂度                | O(1)           |
| pop()时间复杂度                 | O(1)           |
| peek()时间复杂度                | O(1)           |
| isEmpty()时间复杂度             | O(1)           |

由此可知栈的主要操作都可以在常数时间内完成，这主要是因为栈只对一端进行操作，而且操作的只是栈顶元素。

**栈的应用**

栈是一种很重要的数据结构，在计算机中有着很广泛的应用，如下一些操作都应用到了栈。

- 符号匹配

- 中缀表达式转换为后缀表达式

- 计算后缀表达式

- 实现函数的嵌套调用

- HTML和XML文件中的标签匹配

- 网页浏览器中已访问页面的历史记录

接下来我们分别对符合匹配，中缀表达式转换为后缀表达式进行简单的分析，以加深我们对栈的理解。

**符号匹配** 

在编写程序的过程中，我们经常会遇到诸如圆括号 "()" 与花括号 "{}"，这些符号都必须是左右匹配的，这就是我们所说的符合匹配类型，当然符合不仅需要个数相等，而且需要先左后右的依次出现，否则就不符合匹配规则，如 ")("，明显是错误的匹配，而 "()" 才是正确的匹配。有时候符合如括号还会嵌套出现，如 "9-(5+(5+1))" ，而嵌套的匹配原则是一个右括号与其前面最近的一个括号匹配，事实上编译器帮我检查语法错误是也是执行一样的匹配原理，而这一系列操作都需要借助栈来完成，接下来我们使用栈来实现括号 "()" 是否匹配的检测。 

判断原则如下 str="((5-3)*8-2)"：

1. 设置 str 是一个表达式字符串，从左到右依次对字符串 str 中的每个字符 char 进行语法检测，如果 char 是左括号则入栈，如果 char 是右括号则出栈（有一对匹配就可以去匹配一个左括号，因此可以出栈），若此时出栈的字符 char 为左括号，则说明这一对括号匹配正常，如果此时栈为空或者出栈字符不为左括号，则表示缺少与 char 匹配的左括号，即目前不完整。

2. 重复执行 a 操作，直到 str 检测结束，如果此时栈为空，则全部括号匹配，如果栈中还有左括号，是说明缺少右括号。

整个检测算法的执行流程如下图：

![x](http://viyitech.cn/public/images/java_stack1.png)

接着我们用栈作为存储容器通过代码来实现这个过程，代码比较简单，如下：

```java
package com.zejian.structures.Stack;

/**
 * Created by zejian on 2016/11/27.
 * Blog : http://blog.csdn.net/javazejian [原文地址,请尊重原创]
 * 表达式检测
 */
public class CheckExpression {
  public static String isValid(String expstr) {
    //创建栈
    LinkedStack<String> stack = new LinkedStack<>();
    int i = 0;
    while (i < expstr.length()) {
      char ch=expstr.charAt(i);
      i++;
      switch (ch) {
        case '(': stack.push(ch + ""); //左括号直接入栈
          break;
        case ')': if (stack.isEmpty() || !stack.pop().equals("(")) //遇见右括号左括号直接出栈
          return** "(";
      }
    }
    //最后检测是否为空,为空则检测通过
    if (stack.isEmpty())
      return "check pass!";
    else
      return "check exception!";
  }

  public static void main(String args[]) {
    String expstr="((5-3)*8-2)";
    System.out.println(expstr+" "+isValid(expstr));
  }
}
```

**中缀表达式转换为后缀表达式** 

我们先来了解一下什么是中缀表达式，平常所见到的计算表达式都算是中缀表达式，如以下的表达式：

//1+3*(9-2)+9 --->中缀表达式（跟日常见到的表达式没啥区别）

了解中缀表达式后来看看其定义：将运算符写在两个操作数中间的表达式称为中缀表达式。在中缀表达式中，运算符拥有不同的优先级，同时也可以使用圆括号改变运算次序，由于这两点的存在，使用的中缀表达式的运算规则比较复杂，求值的过程不能从左往右依次计算，当然这也是相对计算机而言罢了，毕竟我们日常生活的计算使用的还是中缀表达式。既然计算机感觉复杂，那么我们就需要把中缀表达式转化成计算机容易计算而且不复杂的表达式，这就是后缀表达式了，在后缀表达式中，运算符是没有优先级的，整个计算都是遵守从左往右的次序依次计算的，如下我们将中缀表达式转为后缀表达式：

//1+3*(9-2)+9     转化前的中缀表达式
//1 3 9 2 - * + 9 + 转化后的后缀表达式

中缀转后缀的转换过程需要用到栈，这里我们假设栈A用于协助转换，并使用数组B用于存放转化后的后缀表达式具体过程如下： 

1. 如果遇到操作数，我们就直接将其放入数组B中。 
2. 如果遇到运算符，则我们将其放入到栈A中，遇到左括号时我们也将其放入栈A中。 
3. 如果遇到一个右括号，则将栈元素弹出，将弹出的运算符输出并存入数组B中直到遇到左括号为止。注意，左括号只弹出并不存入数组。 
4. 如果遇到任何其他的操作符，如("+", "*", "(")等，从栈中弹出元素存入数组B直到遇到发现更低优先级的元素（或者栈为空）为止。弹出完这些元素后，才将遇到的操作符压入到栈中。有一点需要注意，只有在遇到")"的情况下我们才弹出"("，其他情况我们都不会弹出"("。 
5. 如果我们读到了输入的末尾，则将栈中所有元素依次弹出存入到数组B中。 
6. 到此中缀表达式转化为后缀表达式完成，数组存储的元素顺序就代表转化后的后缀表达式。 

执行图示过程如下： 

![x](http://viyitech.cn/public/images/java_stack2.png)

简单分析一下流程，当遇到操作数时（规则1），直接存入数组B中，当i=1（规则2）时，此时运算符为+，直接入栈，当i=3（规则2）再遇到运算符*，由于栈内的运算符+优先级比*低，因此直接入栈，当i=4时，遇到运算符'('，直接入栈，当i=6时，遇运算符-，直接入栈，当i=8时（规则3），遇')'，-和'('直接出栈，其中运算符-存入后缀数组B中，当i=9时（规则5），由于*优先级比+高，而+与+平级，因此和+出栈，存入数组B，而后面的+再入栈，当i=10（规则5），结束，+直接出栈存入数组B，此时数组B的元素顺序即为1 3 9 2 - * + 9 +，这就是中缀转后缀的过程。 

接着转成后缀后，我们来看看计算机如何利用后缀表达式进行结果运算，通过前面的分析可知，后缀表达式是没有括号的，而且计算过程是按照从左到右依次进行的，因此在后缀表达的求值过程中，当遇到运算符时，只需要取前两个操作数直接进行计算即可，而当遇到操作数时不能立即进行求值计算，此时必须先把操作数保存等待获取到运算符时再进行计算，如果存在多个操作数，其运算次序是后出现的操作数先进行运算，也就是后进先运算，因此后缀表达式的计算过程我们也需要借助栈来完成，该栈用于存放操作数，后缀表达式的计算过程及其图解如下： 

![x](http://viyitech.cn/public/images/java_stack3.png)

借助栈的程序计算过程：

![x](http://viyitech.cn/public/images/java_stack4.png)

简单分析说明一下： 

1. 如果ch是数字，先将其转换为整数再入栈 
2. 如果是运算符，将两个操作数出栈，计算结果再入栈 
3. 重复 1 和 2 直到后缀表达式结束，最终栈内的元素即为计算的结果。 

整体呈现实现如下：

```java
package com.zejian.structures.Stack;

/**
* Created by zejian on 2016/11/28.
* Blog : http://blog.csdn.net/javazejian [原文地址,请尊重原创]
* 中缀转后缀,然后计算后缀表达式的值
*/
public class CalculateExpression {

  /**
   * 中缀转后缀
   * @param expstr 中缀表达式字符串
   * @return
   */
  public static String toPostfix(String expstr)
  {
      //创建栈,用于存储运算符
      SeqStack<String> stack = new SeqStack<>(expstr.length());

      String postfix="";//存储后缀表达式的字符串
      int i=0;
      while (i<expstr.length())
      {
          char ch=expstr.charAt(i);
          switch (ch)
          {
              case '+':
              case '-':
                  //当栈不为空或者栈顶元素不是左括号时,直接出栈,因此此时只有可能是*/+-四种运算符(根据规则4),否则入栈
                  while (!stack.isEmpty() && !stack.peek().equals("(")) {
                      postfix += stack.pop();
                  }
                  //入栈
                  stack.push(ch+"");
                  i++;
                  break;
              case '*':
              case '/':
                  //遇到运算符*/
                  while (!stack.isEmpty() && (stack.peek().equals("*") || stack.peek().equals("/"))) {
                      postfix += stack.pop();
                  }
                  stack.push(ch+"");
                  i++;
                  break;
              case '(':
                  //左括号直接入栈
                  stack.push(ch+"");
                  i++;
                  break;
              case ')':
                  //遇到右括号(规则3)
                  String out = stack.pop();
                  while (out!=null && !out.equals("("))
                  {
                      postfix += out;
                      out = stack.pop();
                  }
                  i++;
                  break;
              default:
                  //操作数直接入栈
                  while (ch>='0' && ch<='9')
                  {
                      postfix += ch;
                      i++;
                      if (i<expstr.length())
                          ch=expstr.charAt(i);
                      else
                          ch='=';
                  }
                  //分隔符
                  postfix += " ";
                  break;
          }
      }
      //最后把所有运算符出栈(规则5)
      while (!stack.isEmpty())
          postfix += stack.pop();
      return postfix;
  }

  /**
   * 计算后缀表达式的值
   * @param postfix 传入后缀表达式
   * @return
   */
  public static int calculatePostfixValue(String postfix)
  {
      //栈用于存储操作数,协助运算
      LinkedStack<Integer> stack = new LinkedStack<>();
      int i=0, result=0;
      while (i<postfix.length())
      {
          char ch=postfix.charAt(i);
          if (ch>='0' && ch<='9')
          {
              result=0;
              while (ch!=' ')
              {
                  //将整数字符转为整数值ch=90
                  result = result*10 + Integer.parseInt(ch+"");
                  i++;
                  ch = postfix.charAt(i);
              }
              i++;
              stack.push(result);//操作数入栈
          }
          else
          {  //ch 是运算符,出栈栈顶的前两个元素
              int y= stack.pop();
              int x= stack.pop();
              switch (ch)
              {   //根据情况进行计算
                  case '+': result=x+y; break;
                  case '-': result=x-y; break;
                  case '*': result=x*y; break;
                  case '/': result=x/y; break;   //注意这里并没去判断除数是否为0的情况
              }
              //将运算结果入栈
              stack.push(result);
              i++;
          }
      }
      //将最后的结果出栈并返回
      return stack.pop();
  }
  //测试
  public static void main(String args[])
  {
      String expstr="1+3*(9-2)+90";
      String postfix = toPostfix(expstr);
      System.out.println("中缀表达式->expstr=  "+expstr);
      System.out.println("后缀表达式->postfix= "+postfix);
      System.out.println("计算结果->value= "+calculatePostfixValue(postfix));
  }

}
```

以上便是利用转实现中缀与后缀的转换过程并且通过后缀计算机能及其简单计算出后缀表达式的结果。

JAVA中，栈 `Stack` 是 **Vector** 的一个子类，内部使用数组保存数据，可以自动按需增长（不够时翻倍，最大`Integer.MAX_VALUE`），线程安全。

OK~，到此我们对栈的分析就结束了，本来还想聊聊函数调用的问题，但感觉这个问题放在递归算法更恰当。