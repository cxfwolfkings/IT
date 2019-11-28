namespace Com.Colin.Demo.Basic
{
    /// <summary>
    /// 用于测试索引
    /// </summary>
    public interface IMyInterface
    {
        int this[int index]
        {
            get;
            set;
        }
    }

    public class MyClass : IMyInterface
    {
        private int[] nums = new int[10];

        public MyClass()
        {
            for (int i = 0; i < 10; i++)
            {
                nums[i] = i + 1;
            }
        }

        /// <summary>
        /// 索引器，用于访问nums
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        public int this[int index]
        {
            get
            {
                return nums[index];
            }

            set
            {
                nums[index] = value;
            }
        }
    }

}
