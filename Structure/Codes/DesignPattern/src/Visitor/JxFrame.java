package Visitor;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;

/**
 * 工具类
 * @author Administrator
 * @date   2016年2月29日 上午9:52:49
 */
public class JxFrame extends JFrame {

	private static final long serialVersionUID = -5120504637264509276L;

	public JxFrame(String title) {
		super(title);
		setCloseClick();
		setLF();
	}

	private void setCloseClick() {
		// create window listener to respond to window close click
		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			}
		});
	}

	// ------------------------------------------
	private void setLF() {
		// Force SwingApp to come up in the System L&F
		String laf = UIManager.getSystemLookAndFeelClassName();
		try {
			UIManager.setLookAndFeel(laf);
		} catch (UnsupportedLookAndFeelException exc) {
			System.err.println("Warning: UnsupportedLookAndFeel: " + laf);
		} catch (Exception exc) {
			System.err.println("Error loading " + laf + ": " + exc);
		}
	}
}
