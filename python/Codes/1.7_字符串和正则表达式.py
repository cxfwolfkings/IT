'''
str(): 把其它类型的变量转换成字符串

当操作符"%"的两边是整数时，它是求余数的运算。
如果第一个操作符是字符串，它就是格式化操作符。
第一个参数是需要格式化的字符串，第二个参数是数组表达式。结果是包含表达式值的字符串。
示例：
age = 31
"%d" % age
输出：'31'
格式化序列可以出现在字符串的任何位置
'''

import re

'''
下面的例子是按照一定的格式打印姓名和工资。姓名是字典的键，工资是字典的值。
姓名左对齐，工资右对齐，同时对姓名进行了排序：
'''
def printSalary(salary):
    name = salary.keys()
    name.sort()
    for n in name:
        print "%-12s : %12.2f" % (n,salary[n])
    salary = {'pidaqing':1137.9, 'zhangming':737.3, 'pitianjian':5.0}

printSalary(salary)
'''
输出结果：
pidaqing    : 1137.90
pitianjian  : 5.00
zhangming   : 737.30
'''

'''
为了将不同类型的数据保存到文件，必须将其转换成字符串。
结果导致从文件中读的一切内容都是字符串，数据的原始类型信息丢失了。
解决的办法是输入pickle模块，用它提供的方法把各种类型的数据存入文件，
数据结构的信息也同样被保存了。也就是说，你保存了什么，将来读出的还是什么。
'''
import pickle
f = open("test.dat", "w")
pickle.dump(100, f)
pickle.dump(123.98, f)
pickle.dump((1, 3, "abc"), f)
pickle.dump([4, 5, 7], f)
f.close()
'''
在这个例子中，我们用dump方法分别向文件中写入了整数、浮点数、列表和数组。
如果你用write方法写入，那是会出错的。
接下来就看能不能把这些数据“原封不动”的读出来：
'''
f = open("test.dat", "r")
a = pickle.load(f)
print a
# 输出：100
type(a)
# 输出：<type 'int'>
b = pickle.load(f)
print b
# 输出：123.98
type(b)
# 输出：<type 'float'>
c = pickle.load(f)
print c
# 输出：(1, 3, 'abc')
type(c)
# 输出：<type 'tuple'>
d = pickle.load(f)
print d
# 输出：[4, 5, 7]
type(d)
# 输出：<type 'list'>
```

'''
每调用一次load方法，就得到先前存入的一个变量，而且这个变量还保存着原始类型的信息。
'''

"""
例子1：验证输入用户名和QQ号是否有效并给出对应的提示信息

要求：用户名必须由字母、数字或下划线构成且长度在6~20个字符之间，QQ号是5~12的数字且首位不能为0
"""
def demo1():
    username = input('请输入用户名: ')
    qq = input('请输入QQ号: ')
    # match函数的第一个参数是正则表达式字符串或正则表达式对象
    # 第二个参数是要跟正则表达式做匹配的字符串对象
    m1 = re.match(r'^[0-9a-zA-Z_]{6,20}$', username)
    if not m1:
        print('请输入有效的用户名.')
    m2 = re.match(r'^[1-9]\d{4,11}$', qq)
    if not m2:
        print('请输入有效的QQ号.')
    if m1 and m2:
        print('你输入的信息是有效的!')


"""
例子2：从一段文字中提取出国内手机号码。
"""
def demo2():
    # 创建正则表达式对象 使用了前瞻和回顾来保证手机号前后不应该出现数字
    pattern = re.compile(r'(?<=\D)1[34578]\d{9}(?=\D)')
    sentence = '''
    重要的事情说8130123456789遍，我的手机号是13512346789这个靓号，
    不是15600998765，也是110或119，王大锤的手机号才是15600998765。
    '''
    # 查找所有匹配并保存到一个列表中
    mylist = re.findall(pattern, sentence)
    print(mylist)
    print('--------华丽的分隔线--------')
    # 通过迭代器取出匹配对象并获得匹配的内容
    for temp in pattern.finditer(sentence):
        print(temp.group())
    print('--------华丽的分隔线--------')
    # 通过search函数指定搜索位置找出所有匹配
    m = pattern.search(sentence)
    while m:
        print(m.group())
        m = pattern.search(sentence, m.end())


"""
例子3：替换字符串中的不良内容
"""
def demo3():
    sentence = '你丫是傻叉吗? 我操你大爷的. Fuck you.'
    purified = re.sub('[操肏艹]|fuck|shit|傻[比屄逼叉缺吊屌]|煞笔',
                      '*', sentence, flags=re.IGNORECASE)
    print(purified)  # 你丫是*吗? 我*你大爷的. * you.


"""
例子4：拆分长字符串
"""
def demo4():
    poem = '窗前明月光，疑是地上霜。举头望明月，低头思故乡。'
    sentence_list = re.split(r'[，。, .]', poem)
    while '' in sentence_list:
        sentence_list.remove('')
    print(sentence_list)  # ['窗前明月光', '疑是地上霜', '举头望明月', '低头思故乡']

if __name__ == '__main__':
    demo1()