# 单页豆瓣恶意图书评论数据的爬取代码

# 作者: [日] 东野圭吾
# 原作名: 悪意
# isbn: 7544258610
# 书名: 恶意

# 导入requests库
import requests

# 从lxml导入etree

from lxml import etree

# 恶意豆瓣短评url
url = 'https://book.douban.com/subject/10554309/comments/'
# 获取内容
r = requests.get(url).text
# 解析html
s = etree.HTML(r)
# 使用.xpath()寻找和定位数据
file = s.xpath('//div[@class="comment"]/p/text()')

import pandas as pd
#列表转换为pandas DataFrame
df = pd.DataFrame(file)
# 使用pandas把数据保存到excel表格
df.to_excel('comment.xlsx')