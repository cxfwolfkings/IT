using System.Collections.Generic;
using Com.Colin.Core.Models;

namespace Com.Colin.Core.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();

        User GetById(int id);
    }
}
