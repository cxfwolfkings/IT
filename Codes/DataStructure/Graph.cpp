typedef char VertexType; /* 顶点类型应由用户定义 */
typedef int EdgeType;    /* 边上的权值类型应由用户定义 */
#define MAXVEX 100       /* 最大顶点数，应由用户定义 */
#define INFINITY 65535   /* 用来代表无穷大 */

/**
 * 定义：
 *   图(Graph)是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G(V,E)，其中，G表示一个图，
 *   V是图G中顶点的集合，E是图G中边的集会。 
 * 
 */

/*
 * 邻接矩阵存储结构
 */
typedef struct 
{
	VertexType vex[MAXVEX];  /* 顶点数 */ 
	EdgeType arc[MAXVEX][MAXVEX];  /* 邻接矩阵，可看作边表 */
	int numVertexes, numEdges;  /* 图中当前的顶点数和边数 */
} MGraph;

/* 建立无向网图的邻接矩阵表示 */
void CreateMGraph(MGraph *G)
{
	int i, j, k, w;
	printf("输入顶点数和边数：\n");
	/* 输入顶点数和边数 */
	scanf("%d,%d", &G->numVertexes, &G->numEdges); 
	/* 读入顶点信息 */
	for (i = 0; i < G->numVertexes; i++) 
		scanf(&G->vexs[i]);
		for (i = 0; i < G->numVertexes; i++)
	    { 
			for(j = 0; j < G->numVertexes; j++)
	        {
				G->arc[i][j] = INFINITY; /* 邻接矩阵初始化 */
			}
		}
		for (k = 0; k<G->numEdges; k++) /*读入numEdges条边，建立邻接矩阵*/
		{
			printf("输入边(vi,vj)上的下标i,下标j和权w:\n");
			scanf("%d, %d, %d",&i,%j,&w); /*输入边(vi,vj)上的权w */
			G->arc[i][j]=w;
			G->arc[j][i]= G->arc[i][j]; /* 因为是无向图，矩阵对称*/
		}
}
