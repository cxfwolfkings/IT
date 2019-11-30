package com.colin.datastructure.map;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;
import java.util.UUID;
import java.util.Map.Entry;

/**
 * Map测试代码
 * 
 * @author  Colin Chen
 * @create  2019年5月21日 上午4:03:17
 * @modify  2019年5月21日 上午4:03:17
 * @version A.1
 */
public class MapDemo {

    public static void main(String[] args) {
        test4();
    }
    
    static int hashMapW = 0;
    static int hashMapR = 0;
    static int linkMapW = 0;
    static int linkMapR = 0;
    static int treeMapW = 0;
    static int treeMapR = 0;
    static int hashTableW = 0;
    static int hashTableR = 0;
    
    /**
     * 测试插入读取性能：取10次测试的平均值
     */
    public static void test1() {
    	for (int i = 0; i < 10; i++) {
            MapDemo.testCapbility(100 * 10000);
            System.out.println();
        }
        System.out.println("hashMapW = " + hashMapW / 10);
        System.out.println("hashMapR = " + hashMapR / 10);
        System.out.println("linkMapW = " + linkMapW / 10);
        System.out.println("linkMapR = " + linkMapR / 10);
        System.out.println("treeMapW = " + treeMapW / 10);
        System.out.println("treeMapR = " + treeMapR / 10);
        System.out.println("hashTableW = " + hashTableW / 10);
        System.out.println("hashTableR = " + hashTableR / 10);
    }
    
    /**
     * 测试迭代性能
     */
    public static void test2() {
    	// 初始化，10W次赋值
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i < 100000; i++)
            map.put(i, i);

        /** 增强for循环，keySet迭代 **/
        long start = System.currentTimeMillis();
        for (Integer key : map.keySet()) {
            map.get(key);
        }
        long end = System.currentTimeMillis();
        System.out.println("增强for循环，keySet迭代 -> " + (end - start) + " ms");

        /** 增强for循环，entrySet迭代 */
        start = System.currentTimeMillis();
        for (Entry<Integer, Integer> entry : map.entrySet()) {
            entry.getKey();
            entry.getValue();
        }
        end = System.currentTimeMillis();
        System.out.println("增强for循环，entrySet迭代 -> " + (end - start) + " ms");

        /** 迭代器，keySet迭代 **/
        start = System.currentTimeMillis();
        Iterator<Integer> iterator = map.keySet().iterator();
        Integer key;
        while (iterator.hasNext()) {
            key = (Integer) iterator.next();
            map.get(key);
        }
        end = System.currentTimeMillis();
        System.out.println("迭代器，keySet迭代 -> " + (end - start) + " ms");

        /** 迭代器，entrySet迭代 **/
        start = System.currentTimeMillis();
        Iterator<Map.Entry<Integer, Integer>> iterator1 = map.entrySet().iterator();
        Map.Entry<Integer, Integer> entry;
        while (iterator1.hasNext()) {
            entry = iterator1.next();
            entry.getKey();
            entry.getValue();
        }
        end = System.currentTimeMillis();
        System.out.println("迭代器，entrySet迭代 -> " + (end - start) + " ms");
    }
    
    /**
     * HashMap、Hashtable、LinkedHashMap排序
     * 注：TreeMap也可以使用此方法进行排序，但是更推荐下面的方法。
     */
    public static void test3() {
    	Map<String, String> map = new HashMap<String, String>();
    	map.put("b", "b");
    	map.put("a", "c");
    	map.put("c", "a");

    	// 通过ArrayList构造函数把map.entrySet()转换成list
    	List<Map.Entry<String, String>> list = new ArrayList<Map.Entry<String, String>>(map.entrySet());
    	// 通过比较器实现比较排序
    	Collections.sort(list, new Comparator<Map.Entry<String, String>>() {
    	    @Override
    	    public int compare(Map.Entry<String, String> map1, Map.Entry<String, String> map2) {
    	        return map1.getKey().compareTo(map2.getKey());
    	    }
    	});

    	for (Map.Entry<String, String> mapping : list) {
    	    System.out.println(mapping.getKey() + " ：" + mapping.getValue());
    	}
    }
    
    /**
     * TreeMap默认按Key进行升序排序，可以自定义比较器改变排序顺序！
     */
    public static void test4() {
    	Map<String, String> map = new TreeMap<String, String>(new Comparator<String>() {
    	    @Override
    	    public int compare(String o1, String o2) {
    	        // 降序排序
    	        return o2.compareTo(o1);
    	    }
    	});

    	map.put("b", "b");
    	map.put("a", "c");
    	map.put("c", "a");
    	for (String key : map.keySet()) {
    	    System.out.println(key + ": " + map.get(key));
    	}
    }
    
    /**
     * TreeMap设置成按value排序，其实和 MapDemo.test3() 原理一样！
     */
    public static void test5() {
    	Map<String, String> map = new TreeMap<String, String>();
    	map.put("b", "b");
    	map.put("a", "c");
    	map.put("c", "a");

    	// 通过ArrayList构造函数把map.entrySet()转换成list
    	List<Map.Entry<String, String>> list = new ArrayList<Map.Entry<String, String>>(map.entrySet());
    	// 通过比较器实现比较排序
    	Collections.sort(list, new Comparator<Map.Entry<String, String>>() {
    	    @Override
    	    public int compare(Map.Entry<String, String> mapping1, Map.Entry<String, String> mapping2) {
    	        return mapping1.getValue().compareTo(mapping2.getValue());
    	    }
    	});

    	for (String key : map.keySet()) {
    	    System.out.println(key + " ：" + map.get(key));
    	}

    }

    /**
     * 统计 HashMap, LinkedHashMap, TreeMap, Hashtable 运行时间
     * @param size
     */
    private static void testCapbility(int size) {
        int index;
        Random random = new Random();
        String[] key = new String[size];
        // HashMap 插入
        Map<String, String> map = new HashMap<String, String>();
        long start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            key[i] = UUID.randomUUID().toString();
            map.put(key[i], UUID.randomUUID().toString());
        }
        long end = System.currentTimeMillis();
        hashMapW += (end - start);
        System.out.println("HashMap插入耗时 = " + (end - start) + " ms");
        // HashMap 读取
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            index = random.nextInt(size);
            map.get(key[index]);
        }
        end = System.currentTimeMillis();
        hashMapR += (end - start);
        System.out.println("HashMap读取耗时 = " + (end - start) + " ms");
        
        // LinkedHashMap 插入
        map = new LinkedHashMap<String, String>();
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            key[i] = UUID.randomUUID().toString();
            map.put(key[i], UUID.randomUUID().toString());
        }
        end = System.currentTimeMillis();
        linkMapW += (end - start);
        System.out.println("LinkedHashMap插入耗时 = " + (end - start) + " ms");
        // LinkedHashMap 读取
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            index = random.nextInt(size);
            map.get(key[index]);
        }
        end = System.currentTimeMillis();
        linkMapR += (end - start);
        System.out.println("LinkedHashMap读取耗时 = " + (end - start) + " ms");
        
        // TreeMap 插入
        key = new String[size];
        map = new TreeMap<String, String>();
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            key[i] = UUID.randomUUID().toString();
            map.put(key[i], UUID.randomUUID().toString());
        }
        end = System.currentTimeMillis();
        treeMapW += (end - start);
        System.out.println("TreeMap插入耗时 = " + (end - start) + " ms");
        // TreeMap 读取
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            index = random.nextInt(size);
            map.get(key[index]);
        }
        end = System.currentTimeMillis();
        treeMapR += (end - start);
        System.out.println("TreeMap读取耗时 = " + (end - start) + " ms");
        
        // Hashtable 插入
        key = new String[size];
        map = new Hashtable<String, String>();
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            key[i] = UUID.randomUUID().toString();
            map.put(key[i], UUID.randomUUID().toString());
        }
        end = System.currentTimeMillis();
        hashTableW += (end - start);
        System.out.println("Hashtable插入耗时 = " + (end - start) + " ms");
        // Hashtable 读取
        start = System.currentTimeMillis();
        for (int i = 0; i < size; i++) {
            index = random.nextInt(size);
            map.get(key[index]);
        }
        end = System.currentTimeMillis();
        hashTableR += (end - start);
        System.out.println("Hashtable读取耗时 = " + (end - start) + " ms");
    }
}
