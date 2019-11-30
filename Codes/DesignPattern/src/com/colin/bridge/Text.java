package com.colin.bridge;

/**
 * The Abstract of Text
 * 抽象部分�?(前端)抽象角色
 * @author Charles
 * @date   2016�?1�?8�? 上午8:56:14
 */
public abstract class Text  {
    public abstract void DrawText(String text);
    /**
     * 指向实现角色的应用，使用工厂模式实现
     * @param type
     * @return
     */
    protected TextImp GetTextImp(String type) {
        if(type.equals("Mac")) {
            return new TextImpMac();
        } else if(type.equals("Linux")) {
            return new TextImpLinux();
        } else {
            return new TextImpMac();
        }
    }
}