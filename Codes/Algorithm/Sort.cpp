#include <iostream>
#include <algorithm>
#include "Student.h"
#include "SortTestHelper.h"

using namespace std;

/**
 * 选择排序：
 * 在某个索引及其后的数据项中选择最小项，和该索引替换位置！
 */
void SelectionSort(int arr[], int n){
    for(int i = 0; i < n; i++)
    {
        // 寻找[i, n)区间里的最小值
        int minIndex = i;
        for(int j = i + 1; j < n; j++)
        {
            if(arr[j] < arr[minIndex])
            {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}

template<typename T>
void selectionSort(T arr[], int n) {
    for(int i = 0; i < n; i++)
    {
        int minIndex = i;
        for(int j = i + 1; j < n; j++)
        {
            if(arr[j] < arr[minIndex])
            {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}

int main() {
    // 测试模板函数，传入整型数组
    int a[10] = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
    selectionSort(a, 10);
    for(int i = 0; i < 10; i ++)
    {
        cout<<a[i]<<" ";
    }
    cout<<endl;

    // 测试模板函数，传入浮点数数组
    float b[4] = { 4.4, 3.3, 2.2, 1.1 };
    selectionSort(b, 4);
    for(int i = 0; i < 4; i++)
        cout<<b[i]<<" ";
    cout<<endl;

    // 测试模板函数，传入字符串数组
    string c[4] = { "D", "C", "B", "A" };
    selectionSort(c, 4);
    for(int i = 0; i < 4; i++)
        cout<<c[i]<<" ";
    cout<<endl;

    // 测试模板函数，传入自定义结构体Student数组
    Student d[4] = {{"D", 90}, {"C" ,100}, {"B" ,95}, {"A", 95}};
    selectionSort(d, 4);
    for(int i = 0; i < 4; i++)
        cout<<d[i];
    cout<<endl;

    // 测试排序算法辅助函数
    int N = 10000;
    int *arr = SortTestHelper::generateRandomArray(N, 0, 100000);
    selectionSort(arr, N);
    SortTestHelper::printArray(arr, N);
    delete[] arr;

    // 测试性能
    int *arr = SortTestHelper::generateRandomArray(N, 0, N);
    SortTestHelper::testSort("Selection Sort", selectionSort, arr, N);
    delete[] arr;

    return 0;
}
