package com.colin.prototype;

import java.util.*;

/**
 * A Symbol Loader to register all prototype instance 原型管理器
 */
public class SymbolLoader {
	private Hashtable<String, Object> symbols = new Hashtable<String, Object>();

	public SymbolLoader() {
		symbols.put("Line", new LineSymbol());
		symbols.put("Note", new NoteSymbol());
	}

	public Hashtable<String, Object> getSymbols() {
		return symbols;
	}
}