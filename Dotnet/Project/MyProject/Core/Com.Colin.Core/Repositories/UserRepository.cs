using System.Collections.Generic;
using System.Linq;
using Com.Colin.Core.Models;

namespace Com.Colin.Core.Repositories
{
    public class UserRepository : IUserRepository
    {
        private IList<User> list = new List<User>()
        {
            new User(){ Id = 1, Name = "name:1", Sex = "Male" },
            new User(){ Id = 2, Name = "name:2", Sex = "Female" },
            new User(){ Id = 3, Name = "name:3", Sex = "Male" },
        };

        public IEnumerable<User> GetAll()
        {
            return list;
        }

        public User GetById(int id)
        {
            return list.FirstOrDefault(i => i.Id == id);
        }
    }
}
