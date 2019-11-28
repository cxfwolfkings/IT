namespace Com.Colin.BusinessLayer
{
    /// <summary>
    /// 为了统一管理 IoC 相关的代码，并避免在底层类库中到处引用 Autofac 这个第三方组件，定义了一个专门用于管理需要依赖注入的接口与实现类的空接口 IDependency
    /// 依赖注入接口，表示该接口的实现类将自动注册到IoC容器中
    /// </summary>
    public interface IDependency
    {

    }
}
