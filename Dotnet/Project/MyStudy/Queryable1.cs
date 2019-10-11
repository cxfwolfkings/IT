using System;
using System.Collections.Generic;
using System.Linq;

public class Queryable1
{
    /// <summary>
    /// 累加器函数
    /// </summary>
    public static void Aggregate()
    {
        string[] fruits = { "apple", "mango", "orange", "passionfruit", "grape" };

        // Determine whether any string in the array is longer than "banana".
        string longestName =
            fruits.AsQueryable().Aggregate(
            "banana",
            (longest, next) => next.Length > longest.Length ? next : longest,
            // Return the final result as an uppercase string.
            fruit => fruit.ToUpper()
            );

        Console.WriteLine(
            "The fruit with the longest name is {0}.",
            longestName);

        // This code produces the following output:
        //
        // The fruit with the longest name is PASSIONFRUIT. 
    }

    /// <summary>
    /// 连接两个序列
    /// </summary>
    public static void Concat()
    {
        string[] cats = new string[] { "虎纹猫", "波斯猫", "加菲猫" };
        string[] dogs = new string[] { "金毛", "拉布拉多", "哈士奇", "萨摩耶" };
 
        // Concatenate a collection of cat names to a
        // collection of dog names by using Concat().
        IEnumerable<string> query =
            cats.AsQueryable()
            .Select(cat => cat)
            .Concat(dogs.Select(dog => dog));

        foreach (string name in query)
            Console.Write(name + " ");
    }

    /// <summary>
    /// 交集
    /// </summary>
    public static void Intersect()
    {
        int[] id1 = { 44, 26, 92, 30, 71, 38 };
        int[] id2 = { 39, 59, 83, 47, 26, 4, 30 };

        // Get the numbers that occur in both arrays (id1 and id2).
        IEnumerable<int> both = id1.AsQueryable().Intersect(id2);

        foreach (int id in both)
            Console.WriteLine(id);

        /*
            This code produces the following output:

            26
            30
        */
    }
}