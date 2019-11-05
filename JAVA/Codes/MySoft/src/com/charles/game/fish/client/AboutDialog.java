package com.charles.game.fish.client;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class AboutDialog extends Dialog implements ActionListener{
    private Button okay = new Button("ok");
    private Label label1 = new Label("Swimming Fish with Network 1.0");
    private Label label2 = new Label("Author:huanghao");
    private Label label3 = new Label("2007(C)All Right Reserved.");
    public boolean isOkay = false;

    public class WindowCloser extends WindowAdapter{
           public void windowClosing(WindowEvent we){
               AboutDialog.this.isOkay = false;
               AboutDialog.this.hide();
               }
    }
    public AboutDialog(JFrame parent){
     this(parent,"About");
     }
    public AboutDialog(JFrame parent,String title){
      super(parent,title,true);
      Panel labels = new Panel();
      labels.setLayout(new GridLayout(3,1));
      labels.add(label1);
      labels.add(label2);
      labels.add(label3);


      Panel buttons = new Panel();
      buttons.setLayout(new FlowLayout());
      buttons.add(okay);

      setLayout(new BorderLayout());
      add("Center",labels);
      add("South",buttons);
      okay.addActionListener(this);
      addWindowListener(new WindowCloser());
      setResizable(false);
      pack();
      show();
      }
      public void actionPerformed(ActionEvent ae){
      isOkay = (ae.getSource() == okay);
      hide();
      }
}