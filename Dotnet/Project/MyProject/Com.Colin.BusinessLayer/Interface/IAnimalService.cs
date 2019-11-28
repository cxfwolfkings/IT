using Com.Colin.Model;
using System.Collections.Generic;

namespace Com.Colin.BusinessLayer
{
    public interface IAnimalService : IDependency
    {
        IList<AnimalModel> GetAll();
        AnimalModel Get(int id);
        int Add(AnimalModel item);
        int Update(AnimalModel item);
        int Delete(int id);
    }
}
