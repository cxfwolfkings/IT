package Visitor;

import java.util.Vector;

import javax.swing.AbstractListModel;
import javax.swing.JList;
import javax.swing.JScrollPane;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

/**
 * this is a simple adapter class to convert List awt methods to Swing methods
 * @author Administrator
 * @date   2016年2月29日 上午10:01:01
 */
public class JawtList extends JScrollPane implements ListSelectionListener, awtList {

	private static final long serialVersionUID = -6232852661592278435L;
	private JList listWindow;
	private JListData listContents;

	// -----------------------------------------
	public JawtList(int rows) {
		listContents = new JListData();
		listWindow = new JList(listContents);
		listWindow.setPrototypeCellValue("Abcdefg Hijkmnop");
		getViewport().add(listWindow);

	}

	// -----------------------------------------
	public void add(String s) {
		listContents.addElement(s);
	}

	// -----------------------------------------
	public void remove(String s) {
		listContents.removeElement(s);
	}

	// -----------------------------------------
	public void clear() {
		listContents.clear();
	}

	// -----------------------------------------
	public String[] getSelectedItems() {
		Object[] obj = listWindow.getSelectedValues();
		String[] s = new String[obj.length];
		for (int i = 0; i < obj.length; i++)
			s[i] = obj[i].toString();
		return s;
	}

	// -----------------------------------------
	public void valueChanged(ListSelectionEvent e) {
	}

}

// =========================================
class JListData extends AbstractListModel {
	private Vector data;

	// -----------------------------------------
	public JListData() {
		data = new Vector();
	}

	// -----------------------------------------
	public int getSize() {
		return data.size();
	}

	// -----------------------------------------
	public Object getElementAt(int index) {
		return data.elementAt(index);
	}

	// -----------------------------------------
	public void addElement(String s) {
		data.addElement(s);
		fireIntervalAdded(this, data.size() - 1, data.size());
	}

	// -----------------------------------------
	public void removeElement(String s) {
		data.removeElement(s);
		fireIntervalRemoved(this, 0, data.size());
	}

	// -----------------------------------------
	public void clear() {
		int size = data.size();
		data = new Vector();
		fireIntervalRemoved(this, 0, size);
	}
}
