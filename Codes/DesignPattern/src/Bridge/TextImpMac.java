package Bridge;

/**
 * The ConcreteImplementor
 * 具体实现角色
 * @author Charles
 * @date   2016年1月8日 上午9:32:07
 */
public class TextImpMac implements TextImp {
    public TextImpMac() {
    }
    public void DrawTextImp() {
        System.out.println("The text has a Mac style !");
    }
}