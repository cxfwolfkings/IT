using Memcached.ClientLibrary;
using System;

namespace Com.Colin.Library
{
    /// <summary>
    /// Memcached.ClientLibrary
    /// </summary>
    public class MemcachedHelper
    {
        // 参数设置
        private string SockIOPoolName = "Test_SockIOPoolName";
        private string[] MemcacheServiceList = { "172.21.0.192:11211" };
        // 实例化Client
        private MemcachedClient MClient = new MemcachedClient();

        public MemcachedHelper()
        {
            // 设置连接池
            SockIOPool SPool = SockIOPool.GetInstance(SockIOPoolName);
            SPool.SetServers(MemcacheServiceList);
            SPool.Initialize();

            MClient.PoolName = SockIOPoolName;
        }

        public void AddItem(string key, object value, DateTime? expiry = null)
        {
            DateTime expiryDate = expiry.HasValue ? expiry.Value : DateTime.Now.AddYears(1);
            MClient.Add(key, value, expiryDate);
        }

        public void SetItem(string key, object value, DateTime? expiry = null)
        {
            DateTime expiryDate = expiry.HasValue ? expiry.Value : DateTime.Now.AddYears(1);
            if (MClient.KeyExists(key))
            {
                MClient.Set(key, value, expiryDate);
            }
            else
            {
                AddItem(key, value, expiryDate);
            }
        }

        public void DelItem(string key)
        {
            if (MClient.KeyExists(key))
            {
                MClient.Delete(key);
            }
        }
    }
}
