using System;

namespace Com.Colin.Core.Test
{
    public interface ITest
    {
        Guid TargetId { get; }
    }

    public interface ITestTransient : ITest { }
    public interface ITestScoped : ITest { }
    public interface ITestSingleton : ITest { }

    public class TestInstance : ITestTransient, ITestScoped, ITestSingleton
    {
        public Guid TargetId
        {
            get
            {
                return _targetId;
            }
        }

        private Guid _targetId { get; set; }

        public TestInstance()
        {
            _targetId = Guid.NewGuid();
        }
    }
}
