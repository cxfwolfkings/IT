/*
 * 朴素匹配 
 *   返回子串T在主串S中第pos个字符之后的位置。
 *   时间复杂度：O((n-m+1)*m) -> O(n*m)
 */
int Index(String S, String T, int pos)
{
	// i用于主串S当前位置下标
    int i = pos; 
	// j用于子串T当前位置下标
	int j = 1;
	// 若i小于S长度且j小于T长度时循环
	while (i <= S[0] && j <= T(0)) 
	{
		// 两字母相等则继续
	    if (S[i] == T[j])
	    {
			++i;
			++j;
	    }
		else
		{
			// i退回到上次匹配首位的下一位
            i = i - j + 2;
			// j退回到子串T的首位
			j = 1;
		}
	}
    if (j > T[0])
    {
		return i - T[0];
    }
	else
	{
	    return 0;
	}
}

/*
 * 通过计算返回子串T的next数组
 * 时间复杂度：O(m)
 */
void getNext(String T, int *next)
{
    int i, j;
	i = 1;
	j = 0;
	next[1] = 0;
	while (i < T[0]) // 此处T[0]表示串T的长度
	{
		// T[i]表示前缀的单个字符，T[j]表示后缀的单个字符
        if (j == 0 || T[i] == T[j])
        {
			++i;
			++j;
			next[i] = j;
        }
		else
		{
			// 若字符不相同，则j值回溯
		    j = next[j];
		}
	}
}

/*
 * 通过KMP模式匹配算法
 * 时间复杂度：O(n+m)
 */
int IndexByKMP(String S, String T, int pos) 
{
	// i用于主串当前位置下标值
    int i = pos;
	// j用于子串当前位置下标值
	int j = 1;
	// 定义一个next数组
	int next[255];
	// 得到子串T的next数组
	getNext(T, next);
	// 若i小于S长度且j小于T长度时循环
	while (i <= S[0] && j <= T[0])
	{
        // 两字母相等则继续，比朴素算法增加了j=0判断
	    if (j == 0 || S[i] == T[j])
	    {
			++i;
			++j;
	    }
		else
		{
			// j退回到合适位置，i不变
			j = next[j];
		}
	}
    if (j > T[0])
    {
		return i - T[0];
    }
	else
	{
	    return 0;
	}
}