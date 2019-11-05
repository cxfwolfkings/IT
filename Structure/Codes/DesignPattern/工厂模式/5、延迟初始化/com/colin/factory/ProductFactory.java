package com.colin.factory;

import java.util.HashMap;
import java.util.Map;

import com.colin.model.Product;

/**
 * 延迟加载的工厂类
 * @author Colin Chen
 * @date   2018年7月18日 下午9:15:54
 */
public class ProductFactory {
	// 缓存容器
    private static final Map<String, Product> prMap = new HashMap<String, Product>();
    
    public static synchronized Product createProduct(Class<Product> productClass) throws Exception {
    	Product product = null;
    	if(prMap.containsKey(productClass.getName())) {
    		product = prMap.get(productClass.getName());
    	} else {
    		product = productClass.newInstance();
    		prMap.put(productClass.getName(), product);
    	}
    	return product;
    }
}
