# 作者: [日] 东野圭吾
# 原作名: 悪意
# isbn: 7544258610
# 书名: 恶意

import requests
from lxml import etree
import pandas as pd

#通过观察的url翻页的规律，使用for循环得到10个链接，保存到urls列表中
urls=['https://book.douban.com/subject/10554309/comments/hot?p={}'.format(str(i)) for i in range(1, 11, 1)]

comments = [] #初始化用于保存短评的列表
for url in urls: #使用for循环分别获取每个页面的数据，保存到comments列表
    r = requests.get(url).text
    s = etree.HTML(r)
    file = s.xpath('//div[@class="comment"]/p/text()')
    comments = comments + file

df = pd.DataFrame(comments) #把comments列表转换为pandas DataFrame
df.to_excel('comment2.xlsx') #使用pandas把数据保存到excel表格