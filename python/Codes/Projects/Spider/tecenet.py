import requests
from bs4 import BeautifulSoup


class Product:
    def __init__(self, title, category, sku):
        self.title = title
        self.category = category
        self.sku = sku

    def __str__(self):
        return "{}，型号：{}，分类：{}".format(self.title, self.sku, self.category)


def passed(item):
    try:
        return item != "\n"  # can be more a complicated condition here
    except ValueError:
        return False


# 天成医疗网，飞利浦产品查询页
url = "http://www.tecenet.com/chanpin/keyword.php?kwid=0&kw=飞利浦"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
           'Referer': 'http://www.tecenet.com'}
# 获取内容
r = requests.get(url=url, headers=headers).text
# 获取查询总页数
bf = BeautifulSoup(r, 'html.parser')
div = bf.find('div', class_='pagination')
liArr = div.form.contents[0].contents
total = int(liArr[len(liArr)-2].a.string)
page = 1
prdList = []
while (page <= total):
    html = requests.get(url=url+'&page='+str(page), headers=headers).text
    pd_bf = BeautifulSoup(html, 'html.parser')
    pd_div_list = pd_bf.findAll('div', class_='cp-card cp-kw-card clearfix')

    # if (page == 1):
    #     pd_div1 = BeautifulSoup(str(pd_div_list[0]), 'html.parser')
    #     textDiv = pd_div1.find('div', class_='cp-txt pull-left')
    #     liElems = list(filter(passed, textDiv.ul.contents))
    #     print(liElems)

    for pd_div in pd_div_list:
        pd_div_bf = BeautifulSoup(str(pd_div), 'html.parser')
        textDiv = pd_div_bf.find('div', class_='cp-txt pull-left')
        liElems = list(filter(passed, textDiv.ul.contents))
        sku = list(filter(passed, liElems[1].contents))
        category = list(filter(passed, liElems[2].contents))
        # 构造对象
        prd = Product(textDiv.h3.a.string,
                      category[1].a.string,
                      sku[1].string)
        prdList.append(prd)

    page = page + 1

print("总共抓取到{}条数据".format(len(prdList)))

for prd in prdList:
    print(prd)
