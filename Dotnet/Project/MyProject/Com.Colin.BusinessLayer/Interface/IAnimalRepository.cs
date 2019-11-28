using Com.Colin.Model;
using System.Collections.Generic;

namespace Com.Colin.BusinessLayer
{
    /// <summary>
    /// 在MVC中，控制器依赖于模型对数据进行处理，也可以说执行业务逻辑。
    /// 我们可以使用依赖注入（DI）在控制层分离模型层，这边要用到 Repository 模式。
    /// 在领域驱动设计（DDD）中，Repository翻译为仓储，顾名思义，就是储存东西的仓库。
    /// 可以理解为一种用来封装存储，读取和查找行为的机制，它模拟了一个对象集合。
    /// 使用依赖注入（DI）就是对 Repository 进行管理，用于解决它与控制器之间耦合度问题
    /// 
    /// 这个测试案例中是随意写的方法，不全是增删改查，不过为了和 MVC 对应，也取名为 Repository
    /// </summary>
    public interface IAnimalRepository
    {
        List<AnimalModel> GetAll();
        AnimalModel Get(int id);
        AnimalModel Add(AnimalModel item);
        bool Update(AnimalModel item);
        bool Delete(int id);

        /// <summary>
        /// 叫声
        /// </summary>
        string Sound();

        /// <summary>
        /// 飞行
        /// </summary>
        string Fly();

        /// <summary>
        /// 游泳
        /// </summary>
        string Swim();
    }
}