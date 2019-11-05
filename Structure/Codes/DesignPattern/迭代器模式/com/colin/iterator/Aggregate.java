package com.colin.iterator;

/**
 *  The interface to create concrete iterator
 *  When create iterator, we can use Factory Method pattern
 *  容器角色（Container）
 */
public interface Aggregate  {
    public Iterator CreateIterator();
}