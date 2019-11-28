using System;
using Microsoft.AspNetCore.Mvc;
using Com.Colin.Core.Models;
using Com.Colin.Core.Repositories;

namespace Com.Colin.Core.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserRepository userRepository;

        public UsersController(IUserRepository userRepo)
        {
            userRepository = userRepo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var list = userRepository.GetAll();
            return new ObjectResult(list);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = userRepository.GetById(id);
            return new ObjectResult(user);
        }

        #region 其他方法
        // ......
        #endregion
    }
}