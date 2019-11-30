package com.colin.mediator;

/**
 * An abstract Mediator 
 * 抽象中介者角色
 */
public interface Mediator {
	public void Register(Colleague c, String type);
	public void Changed(String type);
}