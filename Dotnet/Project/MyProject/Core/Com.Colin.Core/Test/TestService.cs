namespace Com.Colin.Core.Test
{
    public class TestService
    {
        public ITestTransient TestTransient { get; }
        public ITestScoped TestScoped { get; }
        public ITestSingleton TestSingleton { get; }

        public TestService(ITestTransient testTransient, ITestScoped testScoped, ITestSingleton testSingleton)
        {
            TestTransient = testTransient;
            TestScoped = testScoped;
            TestSingleton = testSingleton;
        }
    }
}
