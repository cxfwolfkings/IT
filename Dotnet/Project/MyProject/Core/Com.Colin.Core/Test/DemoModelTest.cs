using Com.Colin.Core.Models;
using Xunit;

namespace Com.Colin.Core.Test
{
    public class DemoModelTest
    {
        private readonly DemoModel _demo;

        public DemoModelTest()
        {
            _demo = new DemoModel();
        }

        [Fact]
        public void AddTest()
        {
            int result = _demo.Add(1, 2);
            Assert.Equal(3, result);
        }
    }
}