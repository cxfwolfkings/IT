package com.colin.prototype;

import java.util.Hashtable;

/**
 * As a Test Client to test our pattern
 */
public class Client {

	public static void main(String[] args) {
		// ----- Initial our prototype instance ----------
		SymbolLoader myLoader = new SymbolLoader();
		Hashtable<String, Object> mySymbols = myLoader.getSymbols();

		// ----- Draw a Line -------------------------------
		Graphic myLine = (Graphic) ((Graphic) mySymbols.get("Line")).clone();
		myLine.DoSomething();
	}
}