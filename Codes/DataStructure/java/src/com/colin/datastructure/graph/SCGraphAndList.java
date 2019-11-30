package com.colin.datastructure.graph;

/**
 * 图：邻接表存储结构
 * @author  Colin Chen
 * @create  2019年3月20日 上午4:04:10
 * @modify  2019年3月20日 上午4:04:10
 * @version A.1  
 */
public class SCGraphAndList {
	SCVertextNode[] adjList; // 顶点表
	int numVertexes; // 图中当前顶点数
    int numEdges; // 图中当前边数
}

/**
 * 边表结点
 * @author  Colin Chen
 * @create  2019年3月20日 上午4:06:33
 * @modify  2019年3月20日 上午4:06:33
 * @version A.1
 */
class SCEdgeNode {
	int adjvex; // 邻接点域，存储该顶点对应的下标
	int weight; // 权值，非网图不需要
	SCEdgeNode next; // 链域，指向下一个邻接点
}

/**
 * 顶点表结点
 * @author  Colin Chen
 * @create  2019年3月20日 上午4:07:07
 * @modify  2019年3月20日 上午4:07:07
 * @version A.1
 */
class SCVertextNode {
	Object data; // 顶点域，存储顶点信息
	SCEdgeNode firstEdge; // 边表头指针
}
