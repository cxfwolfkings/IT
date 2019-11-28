using Com.Colin.EfDataAccess;
using Com.Colin.Model;
using System.Collections.Generic;
using System.Linq;

namespace Com.Colin.BusinessLayer
{
    public class AnimalRepository : IAnimalRepository
    {
        readonly TestContext context;

        private List<AnimalModel> Articles = new List<AnimalModel>();

        public AnimalRepository(TestContext context)
        {
            this.context = context;
        }

        public AnimalModel Add(AnimalModel item)
        {
            return context.Animals.Add(item);
        }

        public bool Delete(int id)
        {
            try
            {
                AnimalModel animal = Get(id);
                context.Animals.Remove(animal);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Update(AnimalModel item)
        {
            try
            {
                AnimalModel animal = Get(item.Id);
                context.Animals.Remove(animal);
                context.Animals.Add(item);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public AnimalModel Get(int id)
        {
            return GetAll().Find(animal => animal.Id == id);
        }

        public List<AnimalModel> GetAll()
        {
            return context.Animals.ToList();
        }

        public virtual string Sound()
        {
            return "Some Animal can Fly !";
        }

        public virtual string Swim()
        {
            return "Some Animal can Swim !";
        }

        public virtual string Fly()
        {
            return "Animal can make a sound !";
        }
    }
}