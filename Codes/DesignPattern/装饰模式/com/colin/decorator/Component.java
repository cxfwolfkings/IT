package com.colin.decorator;

/**
 * The top abstract where concrete component and decorator should be derived from
 * 抽象构件角色
 * @author Charles
 * @date   2016年1月14日 下午3:19:48
 */
public interface Component  {
    public abstract void PrintString(String s);
}