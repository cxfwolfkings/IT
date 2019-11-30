package com.colin.prototype;

import java.io.*;

/**
 * A Graphic Interface (A prototype interface) 原型接口
 */
public interface IGraphic extends Cloneable, Serializable {
	
	public String getName();

	public void setName(String gName);
	
}