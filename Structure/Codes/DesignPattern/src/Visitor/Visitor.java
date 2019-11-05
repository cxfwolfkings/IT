package Visitor;

/**
 * 访问者角色
 * @author Administrator
 * @date   2016年2月29日 上午9:47:04
 */
public abstract class Visitor {
	public abstract void visit(Employee emp);
	public abstract void visit(Boss emp);
}
