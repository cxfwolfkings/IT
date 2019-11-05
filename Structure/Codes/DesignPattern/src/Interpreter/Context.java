package Interpreter;

import java.util.*;

/**
 * 上下文(环境)角色
 * A Context to record variable value
 */
public class Context {
	private Hashtable<String,Boolean> context = new Hashtable<String,Boolean>();

	public void Assign(String name, boolean val) {
		context.put(name, new Boolean(val));
	}

	public boolean LookUp(String name) {
		return ((Boolean) context.get(name)).booleanValue();
	}

	public Context() {
	}
}