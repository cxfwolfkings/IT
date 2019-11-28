using Com.Colin.Core.Test;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Com.Colin.Core.Controllers
{
    [Route("[controller]")]
    public class DemoController : Controller
    {
        public ITestTransient _testTransient { get; }
        public ITestScoped _testScoped { get; }
        public ITestSingleton _testSingleton { get; }
        public TestService _testService { get; }

        public DemoController(ITestTransient testTransient, ITestScoped testScoped, ITestSingleton testSingleton, TestService testService)
        {
            _testTransient = testTransient;
            _testScoped = testScoped;
            _testSingleton = testSingleton;
            _testService = testService;
        }

        [HttpGet("index")]
        public async Task Index()
        {
            HttpContext.Response.ContentType = "text/html";
            await HttpContext.Response.WriteAsync($"<h1>Controller Log</h1>");
            await HttpContext.Response.WriteAsync($"<h6>Transient => {_testTransient.TargetId.ToString()}</h6>");
            await HttpContext.Response.WriteAsync($"<h6>Scoped => {_testScoped.TargetId.ToString()}</h6>");
            await HttpContext.Response.WriteAsync($"<h6>Singleton => {_testSingleton.TargetId.ToString()}</h6>");
            
            await HttpContext.Response.WriteAsync($"<h1>Service Log</h1>");
            await HttpContext.Response.WriteAsync($"<h6>Transient => {_testService.TestTransient.TargetId.ToString()}</h6>");
            await HttpContext.Response.WriteAsync($"<h6>Scoped => {_testService.TestScoped.TargetId.ToString()}</h6>");
            await HttpContext.Response.WriteAsync($"<h6>Singleton => {_testService.TestSingleton.TargetId.ToString()}</h6>");
        }
    }
}