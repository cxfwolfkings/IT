using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Com.Colin.Core.Controllers;
using Com.Colin.Core.Models;
using Com.Colin.Core.Repositories;
using Xunit;

namespace Com.Colin.Core.Test
{
    public class UsersControllerTest
    {
        private readonly UsersController _controller;

        public UsersControllerTest()
        {
            var mockRepo = new Mock<IUserRepository>();
            mockRepo.Setup(repo => repo.GetAll()).Returns(GetUsers());
            _controller = new UsersController(mockRepo.Object);
        }

        [Fact]
        public void GetAllTest()
        {
            IActionResult actionResult = _controller.GetAll();
            var objectResult = Assert.IsType<ObjectResult>(actionResult);
            var result = Assert.IsAssignableFrom<IEnumerable<User>>(objectResult.Value);
            Assert.Equal(3, result.Count());
        }

        private IEnumerable<User> GetUsers()
        {
            return new List<User>()
            {
                new User(){ Id = 1, Name = "name:1", Sex = "Male" },
                new User(){ Id = 2, Name = "name:2", Sex = "Female" },
                new User(){ Id = 3, Name = "name:3", Sex = "Male" },
            };
        }
    }
}