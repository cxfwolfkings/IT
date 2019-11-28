namespace Com.Colin.Core.Models
{
    public class DemoModel
    {
        public int Add(int a, int b)
        {
            return a + b;
        }

        public bool IsOdd(int num)
        {
            return num % 2 == 1;
        }
    }
}