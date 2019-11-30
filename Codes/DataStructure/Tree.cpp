#include <iostream>
#include <queue>
 
using namespace std;
 
template <class T>
struct TreeNode
{
    T data;
    TreeNode<T> *left;
    TreeNode<T> *right;
    TreeNode(const T &x) : data(x),
                           left(NULL),
                           right(NULL) {}
};
template <class T>
bool IsComplete(TreeNode<T> *root)
{
    //1.树为空，返回错误
    if (root == NULL)
    {
        return false;
    }
    //2.树不为空
    queue<TreeNode<T> *> q;
    q.push(root);
    while (!q.empty())
    {
        TreeNode<T> *top = q.front();
        //2.1如果该节点两个孩子都有，则直接pop
        if (top->left && top->right)
        {
            q.pop();
            q.push(top->left);
            q.push(top->right);
        }
        //2.2如果该节点左孩子为空，右孩子不为空，则一定不是完全二叉树
        if (top->left == NULL && top->right)
        {
            return false;
        }
        //2.3如果该节点左孩子不为空，右孩子为空或者该节点为叶子节点，则该节点之后的所有结点都是叶子节点
        if ((top->left && top->right == NULL) || (top->left == NULL && top->right == NULL))
        {
            q.pop(); //则该节点之后的所有结点都是叶子节点
            while (!q.empty())
            {
                top = q.front();
                if (top->left == NULL && top->right == NULL)
                {
                    q.pop();
                }
                else
                {
                    return false;
                }
            }
            return true;
        }
    }
    return true;
}
 
//满二叉树
void test1()
{
    //       1
    //   2       3
    // 4    5  6   7
    TreeNode<int> *node1 = new TreeNode<int>(1);
    TreeNode<int> *node2 = new TreeNode<int>(2);
    TreeNode<int> *node3 = new TreeNode<int>(3);
    TreeNode<int> *node4 = new TreeNode<int>(4);
    TreeNode<int> *node5 = new TreeNode<int>(5);
    TreeNode<int> *node6 = new TreeNode<int>(6);
    TreeNode<int> *node7 = new TreeNode<int>(7);
    node1->left = node2;
    node1->right = node3;
    node2->left = node4;
    node2->right = node5;
    node3->left = node6;
    node3->right = node7;
    cout << IsComplete<int>(node1) << endl;
}
 
//二叉树为空
void test2()
{
    cout << IsComplete<int>(NULL) << endl;
}
 
//3.二叉树不为空，也不是满二叉树，遇到一个结点左孩子为空，右孩子不为空
void test3()
{
    //       1
    //   2       3
    // 4    5      7
    TreeNode<int> *node1 = new TreeNode<int>(1);
    TreeNode<int> *node2 = new TreeNode<int>(2);
    TreeNode<int> *node3 = new TreeNode<int>(3);
    TreeNode<int> *node4 = new TreeNode<int>(4);
    TreeNode<int> *node5 = new TreeNode<int>(5);
    TreeNode<int> *node7 = new TreeNode<int>(7);
    node1->left = node2;
    node1->right = node3;
    node2->left = node4;
    node2->right = node5;
    node3->right = node7;
    cout << IsComplete<int>(node1) << endl;
}
 
//4.二叉树不为空，也不是满二叉树，遇到叶子节点,则该叶子节点之后的所有结点都为叶子节点
void test4()
{
    //        1
    //    2       3
    // 4    5
    TreeNode<int> *node1 = new TreeNode<int>(1);
    TreeNode<int> *node2 = new TreeNode<int>(2);
    TreeNode<int> *node3 = new TreeNode<int>(3);
    TreeNode<int> *node4 = new TreeNode<int>(4);
    TreeNode<int> *node5 = new TreeNode<int>(5);
    node1->left = node2;
    node1->right = node3;
    node2->left = node4;
    node2->right = node5;
    cout << IsComplete<int>(node1) << endl;
}
 
//4.二叉树不为空，也不是满二叉树，遇到左孩子不为空，右孩子为空的结点，则该节点之后的所有结点都为叶子节点
void test5()
{
    //        1
    //    2       3
    // 4    5   6
    TreeNode<int> *node1 = new TreeNode<int>(1);
    TreeNode<int> *node2 = new TreeNode<int>(2);
    TreeNode<int> *node3 = new TreeNode<int>(3);
    TreeNode<int> *node4 = new TreeNode<int>(4);
    TreeNode<int> *node5 = new TreeNode<int>(5);
    TreeNode<int> *node6 = new TreeNode<int>(6);
    node1->left = node2;
    node1->right = node3;
    node2->left = node4;
    node2->right = node5;
    node3->left = node6;
    cout << IsComplete<int>(node1) << endl;
}
 
int main()
{
    test1();
    /*test2();*/
    /*test3();*/
    /*test4();*/
    /*test5();*/
    return 0;
}