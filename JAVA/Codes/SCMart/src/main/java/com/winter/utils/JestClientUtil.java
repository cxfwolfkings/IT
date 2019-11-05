package com.winter.utils;

import com.winter.config.EsClientConfiguration;
import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.config.HttpClientConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JestClientUtil {
    @Autowired
    private EsClientConfiguration esClientConfig;

    private JestClient jestClient = null;

    public JestClient createJestClient() {
        if (jestClient == null) {
            synchronized (this) {
                if (jestClient == null) {
                    JestClientFactory factory = new JestClientFactory();
                    factory.setHttpClientConfig(new HttpClientConfig
                            .Builder(esClientConfig.getUrl())
                            .defaultCredentials(esClientConfig.getUsername(),
                                    esClientConfig.getPassword())
                            //开启多线程模式
                            .multiThreaded(true)
                            .connTimeout(esClientConfig.getConnectionTimeout())
                            .readTimeout(esClientConfig.getReadTimeout())
                            .build());

                    jestClient = factory.getObject();
                }
            }
        }
        return jestClient;
    }
}
