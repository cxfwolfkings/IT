#include <vector>

typedef struct
{
    int weight;
    int price;
    int status; // 0:未选中；1:已选中；2:已经不可选
} OBJECT;

typedef struct
{
    std::vector<OBJECT> objs;
    int totalC;
} KNAPSACK_PROBLEM;

void GreedyAlgo(KNAPSACK_PROBLEM *problem, SELECT_POLICY spFunc)
{
    int idx;
    int ntc = 0;

    // spFunc 每次选最符合策略的那个物品，选后再检查
    while((idx = spFunc(problem->objs, problem->totalC - ntc)) != -1)
    {
        // 所选物品是否满足背包承重要求？
        if((ntc + problem->objs[idx].weight) <= problem->totalC)
        {
            problem->objs[idx].status = 1;
            ntc += problem->objs[idx].weight;
        }
        else
        {
            // 不能选这个物品了，做个标记后重新选
            problem->objs[idx].status = 2; 
        }
    }
    
    PrintResult(problem->objs);
}

int Choosefunc1(std::vector<OBJECT>& objs, int c)
{
    int index = -1;  //-1表示背包容量已满
    int mp = 0;
    for(int i = 0; i < static_cast<int>(objs.size()); i++)
    {
        if((objs[i].status == 0) && (objs[i].price > mp))
        {
            mp = objs[i].price;
            index = i;
        }
    }

    return index;
}
