import os

'''
打开文件
fileName：文件名
openType：打开方式；w:写入 r:只读
'''
def readTxtFile(fileName, openType):
    # 可写时文件不存在就创建，只读时文件不存在就报错
    f = open(fileName, openType)
    #print(f)
    print(f.readlines())

'''
写入文件
fileName：文件名
txt：写入内容，可以用"\n"换行
'''
def writeTxtFile(fileName, txt):
    f = open(fileName, 'w')
    f.write(txt)
    f.close()

'''
复制文件
oldFile：被复制文件
newFile：新文件
'''
def copyFile(oldFile, newFile):
    f1 = open(oldFile, "r")
    f2 = open(newFile, "w")
    while 1:
        text = f1.read(50)
        if text == "":
            break
    f2.write(text)
    f1.close()
    f2.close()
    return

'''
复制文本，排除"#"开头的行
'''
def filterFile(old, new):
    sfile = open(old, "r")
    dfile = open(new, "w")
    while 1:
        text = sfile.readline()
        if text == "":
            break
        elif text[0] == "#":
            continue
        else:
            dfile.write(text)
    sfile.close()
    dfile.close()


'''
文件改名
'''
def renameFile(rootdir):
    list = os.listdir(rootdir)  # 列出文件夹下所有的目录与文件
    for i in range(0, len(list)):
        path = os.path.join(rootdir, list[i])
        if os.path.isfile(path) and path.endswith('.JPG'):
            # 你想对文件的操作
            filrNameWithNoExt = list[i].split('.JPG')[0]
            newPath = os.path.join(rootdir, filrNameWithNoExt + '.jpg')
            os.rename(path, newPath)


if __name__ == '__main__':
    renameFile('D:\\MyGit\\Colin\\SCMart\\viyi\\images\\1903')
    print('转换成功！')
