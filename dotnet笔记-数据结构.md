# 目录

## 集合

### IEqualityComparer使用

```C#
/// <summary>
/// 示例
/// </summary>
public class AssetComparer : IEqualityComparer<Asset>
{
    public bool Equals(Asset x, Asset y)
    {
        if (x != null && y != null)
        {
            return x.Id == y.Id;
        }
        return false;
    }

    public int GetHashCode(Asset obj)
    {
        return base.GetHashCode();
    }
}
```

<b style="color:red">注意:</b> 这里的方法中会先执行 GetHashCode 方法，如果 GetHashCode 方法返回的是不相同的值，那就直接忽略 Equals 方法。
