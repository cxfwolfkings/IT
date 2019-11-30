package com.colin.prototype;

/**
 * An Abstract Graphic Class (Prototype)
 * 抽象原型角色
 */
public abstract class Graphic implements IGraphic {
	
	private static final long serialVersionUID = 8579181001812648342L;
	private String name;
    
    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e){
            System.out.println("Do not support clone !!!");
            throw new InternalError();
        }
    }
   
    public String getName() {
        return name;
    }
    
    public void setName(String gName) {
        name = gName;
    }

    public abstract void DoSomething();
}