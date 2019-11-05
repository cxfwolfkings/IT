package com.colin.iterator;

import java.util.Vector;
/**
 *  A vector iterator to print data reverse
 *  具体迭代器角色
 */
public class VectorIterator implements Iterator {
    private Vector<Object> data = new Vector<Object>();
    private int cursor = 0;

    public VectorIterator(Vector<Object> _data) {
        data = _data;
    }    
    public void First() {
        //cursor = 0;
        cursor = (data.size() - 1);
    }
    public void Next() {
        //cursor++;
        cursor--;
    }
    public boolean IsDone() {
        //return (cursor >= data.size());
        return (cursor < 0);
    }
    public void CurrentItem() {
        if(IsDone()) {
            System.out.println("Reach the end of the vector");
        } else {
            System.out.println("Number " + cursor + ": " + data.get(cursor));
        }
    }
}