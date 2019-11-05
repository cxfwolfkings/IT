package com.colin.iterator;

/**
 * Iterator Interface
 * 迭代器角色
 */
public interface Iterator {
	public abstract void First();
	public abstract void Next();
	public abstract boolean IsDone();
	public abstract void CurrentItem();
}