import os

def listFile(rootdir):  
    list = os.listdir(rootdir) #列出文件夹下所有的目录与文件
    for i in range(0, len(list)):
        path = os.path.join(rootdir, list[i])
        if os.path.isfile(path) and path.endswith('.JPG'):
            #你想对文件的操作
            filrNameWithNoExt = list[i].split('.JPG')[0]
            newPath = os.path.join(rootdir, filrNameWithNoExt + '.jpg')
            os.rename(path, newPath)

if __name__ == '__main__':
    listFile('D:\\MyGit\\Colin\\SCMart\\viyi\\images\\1903')
    print('转换成功！')