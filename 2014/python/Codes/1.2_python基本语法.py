"""
练习1：华氏温度转换为摄氏温度。

Version: 0.1
Author: 骆昊
"""
f = float(input('请输入华氏温度: '))
c = (f - 32) / 1.8
print('%.1f华氏度 = %.1f摄氏度' % (f, c))


"""
练习2：输入半径计算圆的周长和面积

Version: 0.1
Author: 骆昊
"""
import math

radius = float(input('请输入圆的半径: '))
perimeter = 2 * math.pi * radius
area = math.pi * radius * radius
print('周长: %.2f' % perimeter)
print('面积: %.2f' % area)


"""
练习3：输入年份 如果是闰年输出True 否则输出False

Version: 0.1
Author: 骆昊
"""
year = int(input('请输入年份: '))
# 如果代码太长写成一行不便于阅读 可以使用\对代码进行折行
is_leap = (year % 4 == 0 and year % 100 != 0) or \
           year % 400 == 0
print(is_leap)


"""
练习4：英制单位英寸和公制单位厘米互换

Version: 0.1
Author: 骆昊
"""

value = float(input('请输入长度: '))
unit = input('请输入单位: ')
if unit == 'in' or unit == '英寸':
    print('%f英寸 = %f厘米' % (value, value * 2.54))
elif unit == 'cm' or unit == '厘米':
    print('%f厘米 = %f英寸' % (value, value / 2.54))
else:
    print('请输入有效的单位')


"""
练习5：百分制成绩转换为等级制成绩

要求：如果输入的成绩在90分以上（含90分）输出A；80分-90分（不含90分）输出B；
70分-80分（不含80分）输出C；60分-70分（不含70分）输出D；60分以下输出E。

Version: 0.1
Author: 骆昊
"""

score = float(input('请输入成绩: '))
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'E'
print('对应的等级是:', grade)


"""
练习6：判断输入的边长能否构成三角形，如果能则计算出三角形的周长和面积
通过边长计算三角形面积的公式叫做海伦公式。

Version: 0.1
Author: 骆昊
"""

a = float(input('a = '))
b = float(input('b = '))
c = float(input('c = '))
if a + b > c and a + c > b and b + c > a:
    print('周长: %f' % (a + b + c))
    p = (a + b + c) / 2
    area = (p * (p - a) * (p - b) * (p - c)) ** 0.5
    print('面积: %f' % (area))
else:
    print('不能构成三角形')


"""
练习7：输入一个正整数判断它是不是素数

Version: 0.1
Author: 骆昊
Date: 2018-03-01
"""
def demo7():
  from math import sqrt
  
  num = int(input('请输入一个正整数: '))
  end = int(sqrt(num))
  is_prime = True
  for x in range(2, end + 1):
    if num % x == 0:
      is_prime = False
      break
    if is_prime and num != 1:
      print('%d是素数' % num)
    else:
      print('%d不是素数' % num)


"""
练习8：输入两个正整数计算它们的最大公约数和最小公倍数

Version: 0.1
Author: 骆昊
Date: 2018-03-01
"""

x = int(input('x = '))
y = int(input('y = '))
# 如果x大于y就交换x和y的值
if x > y:
    # 通过下面的操作将y的值赋给x, 将x的值赋给y
    x, y = y, x
# 从两个数中较小的数开始做递减的循环
for factor in range(x, 0, -1):
    if x % factor == 0 and y % factor == 0:
        print('%d和%d的最大公约数是%d' % (x, y, factor))
        print('%d和%d的最小公倍数是%d' % (x, y, x * y // factor))
        break


"""
练习9：打印三角形图案

*
**
***
****
*****

    *
   **
  ***
 ****
*****

    *
   ***
  *****
 *******
*********

Version: 0.1
Author: 骆昊
"""

row = int(input('请输入行数: '))
for i in range(row):
    for _ in range(i + 1):
        print('*', end='')
    print()


for i in range(row):
    for j in range(row):
        if j < row - i - 1:
            print(' ', end='')
        else:
            print('*', end='')
    print()

for i in range(row):
    for _ in range(row - i - 1):
        print(' ', end='')
    for _ in range(2 * i + 1):
        print('*', end='')
    print()


"""
练习10：找出所有水仙花数

Version: 0.1
Author: 骆昊
"""
for num in range(100, 1000):
    low = num % 10
    mid = num // 10 % 10
    high = num // 100
    if num == low ** 3 + mid ** 3 + high ** 3:
        print(num)


"""
练习11：正整数的反转
在上面的代码中，我们通过整除和求模运算分别找出了一个三位数的个位、十位和百位，
这种小技巧在实际开发中还是常用的。用类似的方法，我们还可以实现将一个正整数反转，
例如：将12345变成54321，代码如下所示。

Version: 0.1
Author: 骆昊
"""
num = int(input('num = '))
reversed_num = 0
while num > 0:
    reversed_num = reversed_num * 10 + num % 10
    num //= 10
print(reversed_num)


"""
练习12：《百钱百鸡》问题
下面使用的方法叫做穷举法，也称为暴力搜索法，
这种方法通过一项一项的列举备选解决方案中所有可能的候选项并检查每个候选项是否符合问题的描述，最终得到问题的解。
这种方法看起来比较笨拙，但对于运算能力非常强大的计算机来说，通常都是一个可行的甚至是不错的选择，
而且问题的解如果存在，这种方法一定能够找到它。

Version: 0.1
Author: 骆昊
"""
for x in range(0, 20):
    for y in range(0, 33):
        z = 100 - x - y
        if 5 * x + 3 * y + z / 3 == 100:
            print('公鸡: %d只, 母鸡: %d只, 小鸡: %d只' % (x, y, z))


"""
练习13：Craps赌博游戏
我们设定玩家开始游戏时有1000元的赌注
游戏结束的条件是玩家输光所有的赌注

Version: 0.1
Author: 骆昊
"""
from random import randint

money = 1000
while money > 0:
    print('你的总资产为:', money)
    needs_go_on = False
    while True:
        debt = int(input('请下注: '))
        if 0 < debt <= money:
            break
    first = randint(1, 6) + randint(1, 6)
    print('玩家摇出了%d点' % first)
    if first == 7 or first == 11:
        print('玩家胜!')
        money += debt
    elif first == 2 or first == 3 or first == 12:
        print('庄家胜!')
        money -= debt
    else:
        needs_go_on = True
    while needs_go_on:
        needs_go_on = False
        current = randint(1, 6) + randint(1, 6)
        print('玩家摇出了%d点' % current)
        if current == 7:
            print('庄家胜')
            money -= debt
        elif current == first:
            print('玩家胜')
            money += debt
        else:
            needs_go_on = True
print('你破产了, 游戏结束!')


"""
练习14：生成斐波那契数列的前20个数
"""

"""
练习15：找出10000以内的完美数。
"""

"""
练习16：输出100以内所有的素数。
"""


"""
练习17：实现计算求最大公约数和最小公倍数的函数。
"""
def gcd(x, y):
    """求最大公约数"""
    (x, y) = (y, x) if x > y else (x, y)
    for factor in range(x, 0, -1):
        if x % factor == 0 and y % factor == 0:
            return factor


def lcm(x, y):
    """求最小公倍数"""
    return x * y // gcd(x, y)


"""
练习18：实现判断一个数是不是回文数的函数。
"""
def is_palindrome(num):
    """判断一个数是不是回文数"""
    temp = num
    total = 0
    while temp > 0:
        total = total * 10 + temp % 10
        temp //= 10
    return total == num


"""
练习19：实现判断一个数是不是素数的函数。
"""  
def is_prime(num):
    """判断一个数是不是素数"""
    for factor in range(2, num):
        if num % factor == 0:
            return False
    return True if num != 1 else False


"""
练习20：写一个程序判断输入的正整数是不是回文素数。
注意：通过下面的程序可以看出，当我们将代码中重复出现的和相对独立的功能抽取成函数后，
我们可以组合使用这些函数来解决更为复杂的问题，这也是我们为什么要定义和使用函数的一个非常重要的原因。
"""  
if __name__ == '__main__':
    num = int(input('请输入正整数: '))
    if is_palindrome(num) and is_prime(num):
        print('%d是回文素数' % num)

