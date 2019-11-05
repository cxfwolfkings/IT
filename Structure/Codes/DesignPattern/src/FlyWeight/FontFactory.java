package FlyWeight;

import java.util.Hashtable;

/**
 * A Flyweight Factory
 * 享元工厂角色
 */
public class FontFactory {
	private Hashtable<String,Font> charHashTable = new Hashtable<String,Font>();

	public FontFactory() {
	}

	public Font GetFlyWeight(String s) {
		if (charHashTable.get(s) != null) {
			return (Font) charHashTable.get(s);
		} else {
			Font tmp = new ConcreteFont(s);
			charHashTable.put(s, tmp);
			return tmp;
		}
	}

	public Hashtable<String,Font> GetFactory() {
		return charHashTable;
	}
}