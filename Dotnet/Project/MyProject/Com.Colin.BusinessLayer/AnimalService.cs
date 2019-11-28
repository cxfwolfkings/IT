using Com.Colin.IbatisDataAccess;
using Com.Colin.Model;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Com.Colin.BusinessLayer
{
    public class AnimalService : BaseBL, IAnimalService
    {
        public int Add(AnimalModel item)
        {
            throw new NotImplementedException();
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public AnimalModel Get(int id)
        {
            throw new NotImplementedException();
        }

        public IList<AnimalModel> GetAll()
        {
            Func<Hashtable, IList<AnimalModel>> operation = delegate (Hashtable parameter)
            {
                return this.dataAccess.QueryForList<AnimalModel>("GetAnimals", null);
            };
            return base.DBOperation<IList<AnimalModel>>(operation, null);
        }

        public int Update(AnimalModel item)
        {
            throw new NotImplementedException();
        }
    }
}
