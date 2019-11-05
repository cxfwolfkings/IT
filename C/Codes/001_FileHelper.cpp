#include <iostream>
#include <cstring>  // for strcat()
#include <io.h>

using namespace std;

void listFiles(const char * dir);

int main()
{
    char dir[200];
    cout << "Enter a directory (ends with \'\\\'): ";
    cin.getline(dir, 200);
    // 在要遍历的目录后加上通配符
    strcat(dir, "*.*");        
    listFiles(dir);

    return 0;
}

void listFiles(const char * dir)
{
    intptr_t handle;
    _finddata_t findData;
    // 查找目录中的第一个文件
    handle = _findfirst(dir, &findData);    
    if (handle == -1)
    {
        cout << "Failed to find first file!\n";
        return;
    }

    do
    {
        if (findData.attrib & _A_SUBDIR
            && strcmp(findData.name, ".") == 0
            && strcmp(findData.name, "..") == 0
        ) // 是否是子目录并且不为"."或".."
            cout << findData.name << "\t<dir>\n";
        else
            cout << findData.name << "\t" << findData.size << endl;
    } while (_findnext(handle, &findData) == 0);    // 查找目录中的下一个文件

    cout << "Done!\n";
    _findclose(handle);    // 关闭搜索句柄
}
