package FlyWeight;

/**
 *  A FlyWeight
 *  抽象享元角色
 */
public interface Font  {
    public abstract void SetFont(String color, int size);
    public abstract void GetFont();
}