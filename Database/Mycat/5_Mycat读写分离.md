# 读写分离

## 目录

1. MySQL读写分离
   - [master-slave](#master-slave)
   - [galera cluster](#galera&nbsp;cluster)
2. SqlServer读写分离
3. Mycat配置
   - [一主三从](#一主三从)

## MySQL读写分离

### master-slave

请参考[《读写分离和主从复制》](../9_读写分离和主从复制.md)文档

### galera&nbsp;cluster

## SqlServer读写分离

## Mycat配置

### 一主三从

```xml
<dataHost name="localhost1" maxCon="10000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1" slaveThreshold="100">
  <heartbeat>select user()</heartbeat>
  <!-- can have multi write hosts -->
  <writeHost host="hostM1" url="localhost:3306" user="root" password="root">
    <readHost host="hostS3" url="localhost:3336" user="root" password="root" />
  </writeHost>
  <writeHost host="hostS1" url="localhost:3316" user="root" password="root">
    <readHost host="hostS2" url="localhost:3326" user="root" password="root" />
  </writeHost>
</dataHost>
```
