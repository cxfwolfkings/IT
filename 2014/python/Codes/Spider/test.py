from urllib3 import *
import sqlite3
import json
import re
import os
from bs4 import BeautifulSoup
disable_warnings()
# 创建数据库
dbPath = 'bra.sqlite'
if os.path.exists(dbPath):
    os.remove(dbPath)
conn = sqlite3.connect(dbPath)
cursor = conn.cursor()
cursor.execute('''create table t_sales
            (id integer primary key autoincrement not null,
            color text not null,
            size text not null,
            source text not null,
            discuss mediumtext not null,
            time text not null);''')
conn.commit()

# Cookie劫持
http = PoolManager()
def str2Headers(file):
    headerDict = {}
    f = open(file,'r')
    headersText = f.read()
    headers = re.split('\n',headersText)
    for header in headers:
        result = re.split(':',header,maxsplit = 1)
        headerDict[result[0]] = result[1]
    f.close()
    return headerDict
headers = str2Headers('headers.txt')
def getRateDetail(itemId,currentPage):
    url = 'https://rate.tmall.com/list_detail_rate.htm?itemId=' + str(itemId) + '&spuId=837695373&sellerId=3075989694&order=3&currentPage=' + str(currentPage) + '&... &callback=jsonp1278'
    r = http.request('GET',url,headers = headers)
    c = r.data.decode('GB18030')
    c = c.replace('jsonp1278(','')
    c = c.replace(')','')
    c = c.replace('false','"false"')
    c = c.replace('true','"true"')
    tmalljson = json.loads(c)
    return tmalljson
tmalljson = getRateDetail('537808595989',10)
#print(getRateDetail('19628167605',1))

def getLastPage(itemId):
    tmalljson = getRateDetail(itemId,1)
    return tmalljson['rateDetail']['paginator']['lastPage']
def getProductIdList():
    url = 'https://list.tmall.com/search_product.htm?spm=a220m.1000858.1000724.4.38b7981eyLhA9O&cat=50025983&q=%D0%D8%D5%D6&sort=d&style=g&from=mallfp..pc_1_searchbutton&smAreaId=210100#J_Filter'
    r = http.request('GET', url,headers = headers)
    c = r.data.decode('GB18030')
    soup = BeautifulSoup(c,'lxml')
    linkList = []
    idList = []
    tags = soup.find_all(href=re.compile('detail.tmall.com/item.htm'))
    for tag in tags:
        linkList.append(tag['href'])
    linkList = list(set(linkList))
    for link in linkList:
        aList = link.split('&')
        idList.append(aList[0].replace('//detail.tmall.com/item.htm?id=',''))
    return idList

print(getLastPage('19628167605'))
initial = 0
productIdList = getProductIdList()
while initial < len(productIdList):
    try:
        itemId = productIdList[initial]
        print('----------',itemId,'------------')
        maxnum = getLastPage(itemId)
        num = 1
        while num <= maxnum:
            try:
                tmalljson = getRateDetail(itemId, num)
                rateList = tmalljson['rateDetail']['rateList']
                n = 0
                while n < len(rateList):
                    # 颜色分类:H007浅蓝色加粉色;尺码:32/70A
                    colorSize = rateList[n]['auctionSku']
                    m = re.split('[:;]',colorSize)
                    rateContent = rateList[n]['rateContent']
                    color = m[1]
                    size = m[3]
                    dtime = rateList[n]['rateDate']
                    cursor.execute('''insert into t_sales(color,size,source,discuss,time) 
                                    values('%s','%s','%s','%s','%s') ''' % (color,size,'天猫',rateContent,dtime))
                    conn.commit()
                    n += 1
                    print(color)
                print(num)
                num += 1
            except Exception as e:
                continue        
        initial += 1
    except Exception as e:
        print(e)

conn.close()