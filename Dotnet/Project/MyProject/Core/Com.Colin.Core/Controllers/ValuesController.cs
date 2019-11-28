using Com.Colin.Core.Filters;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace Com.Colin.Core.Controllers
{
    [Route("api/[controller]")]
    [MyActionFilter("Class")]
    public class ValuesController : Controller
    {
        private ILogger<ValuesController> _logger;

        public ValuesController(ILogger<ValuesController> logger)
        {
            _logger = logger;
        }

        // GET api/values
        [HttpGet]
        [CusActionFilter]
        public IEnumerable<string> Get()
        {    
            throw new Exception("GetAll function failed!");
        }

        // GET api/values/5
        /// <summary>
        /// 当顺序被设置为-1时，对应标识位置的过滤器将优先调用。但是无法先于控制器的重写方法调用。（验证未通过）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [MyActionFilter("Method", -1)]
        public string Get(int id)
        {
            // 演示日志输出
            //_logger.LogInformation("This is Information Log!");
            //_logger.LogWarning("This is Warning Log!");
            //_logger.LogError("This is Error Log!");
            return "value";
        }

        /// <summary>
        /// 重写OnActionExecuting和OnActionExecuted。
        /// </summary>
        /// <param name="context"></param>
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation("Controller Executing!");
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation("Controller Executd!");
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
