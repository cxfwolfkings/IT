using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Com.Colin.Demo.DataStruct
{
    /// <summary>
    /// 线性表示例
    /// </summary>
    public class ListDemo
    {
        /// <summary>
        /// Contains、IndexOf、LastIndexOf 和 Remove 方法中都会用到比较器！
        /// 对于比较对象，有 default comparer 和 explicit comparer 的概念。
        /// </summary>
        public static void Test1()
        {
            // Create a list of parts.
            List<Part> parts = new List<Part>();

            // Add parts to the list.
            parts.Add(new Part() { PartName = "regular seat", PartId = 1434 });
            parts.Add(new Part() { PartName = "crank arm", PartId = 1234 });
            parts.Add(new Part() { PartName = "shift lever", PartId = 1634 }); ;
            // Name intentionally left null.
            parts.Add(new Part() { PartId = 1334 });
            parts.Add(new Part() { PartName = "banana seat", PartId = 1444 });
            parts.Add(new Part() { PartName = "cassette", PartId = 1534 });

            // Write out the parts in the list. This will call the overridden ToString method in the Part class.
            Console.WriteLine("\nBefore sort:");
            foreach (Part aPart in parts)
            {
                Console.WriteLine(aPart);
            }

            // Call Sort on the list. 
            // This will use the default comparer, which is the Compare method implemented on Part.
            parts.Sort();

            Console.WriteLine("\nAfter sort by part number:");
            foreach (Part aPart in parts)
            {
                Console.WriteLine(aPart);
            }

            // This shows calling the Sort(Comparison(T) overload using an anonymous method for the Comparison delegate. 
            // This method treats null as the lesser of two values.
            parts.Sort(delegate (Part x, Part y)
            {
                if (x.PartName == null && y.PartName == null) return 0;
                else if (x.PartName == null) return -1;
                else if (y.PartName == null) return 1;
                else return x.PartName.CompareTo(y.PartName);
            });

            Console.WriteLine("\nAfter sort by name:");
            foreach (Part aPart in parts)
            {
                Console.WriteLine(aPart);
            }

            /*
            Before sort:
            ID: 1434   Name: regular seat
            ID: 1234   Name: crank arm
            ID: 1634   Name: shift lever
            ID: 1334   Name:
            ID: 1444   Name: banana seat
            ID: 1534   Name: cassette

            After sort by part number:
            ID: 1234   Name: crank arm
            ID: 1334   Name:
            ID: 1434   Name: regular seat
            ID: 1444   Name: banana seat
            ID: 1534   Name: cassette
            ID: 1634   Name: shift lever

            After sort by name:
            ID: 1334   Name:
            ID: 1444   Name: banana seat
            ID: 1534   Name: cassette
            ID: 1234   Name: crank arm
            ID: 1434   Name: regular seat
            ID: 1634   Name: shift lever
            */

        }

        /// <summary>
        /// BlockingCollection
        /// 制造者 - 使用者模式
        /// 
        /// 在 BlockingCollection 中逐个添加和取出项
        /// </summary>
        public static void Test2()
        {
            // Increase or decrease this value as desired.
            int itemsToAdd = 500;

            // Preserve all the display output for Adds and Takes
            Console.SetBufferSize(80, (itemsToAdd * 2) + 3);

            // A bounded collection. Increase, decrease, or remove the maximum capacity argument to see how it impacts behavior.
            BlockingCollection<int> numbers = new BlockingCollection<int>(50);

            // A simple blocking consumer with no cancellation.
            Task.Run(() =>
            {
                int i = -1;
                while (!numbers.IsCompleted)
                {
                    try
                    {
                        i = numbers.Take();
                    }
                    catch (InvalidOperationException)
                    {
                        Console.WriteLine("Adding was completed!");
                        break;
                    }
                    Console.WriteLine("Take:{0} ", i);

                    // Simulate a slow consumer. This will cause collection to fill up fast and thus Adds wil block.
                    Thread.SpinWait(100000);
                }

                Console.WriteLine("\r\nNo more items to take. Press the Enter key to exit.");
            });

            // A simple blocking producer with no cancellation.
            Task.Run(() =>
            {
                for (int i = 0; i < itemsToAdd; i++)
                {
                    numbers.Add(i);
                    Console.WriteLine("Add:{0} Count={1}", i, numbers.Count);
                }

                // See documentation for this method.
                numbers.CompleteAdding();
            });
        }

        public static void Test3()
        {
            // The token source for issuing the cancelation request.
            CancellationTokenSource cts = new CancellationTokenSource();

            // A blocking collection that can hold no more than 100 items at a time.
            BlockingCollection<int> numberCollection = new BlockingCollection<int>(100);

            // Set console buffer to hold our prodigious output.
            Console.SetBufferSize(80, 2000);

            // The simplest UI thread ever invented.
            Task.Run(() =>
            {
                if (Console.ReadKey(true).KeyChar == 'c')
                    cts.Cancel();
            });

            // Start one producer and one consumer.
            Task t1 = Task.Run(() => NonBlockingConsumer(numberCollection, cts.Token));
            Task t2 = Task.Run(() => NonBlockingProducer(numberCollection, cts.Token));

            // Wait for the tasks to complete execution
            Task.WaitAll(t1, t2);

            cts.Dispose();
            Console.WriteLine("Press the Enter key to exit.");
            Console.ReadLine();
        }

        /// <summary>
        /// 使用 ForEach 移除 BlockingCollection 中的项
        /// </summary>
        public static void Test4()
        {
            // Start the stopwatch.
            sw.Start();

            // Queue the Producer threads. Store in an array for use with ContinueWhenAll
            Task[] producers = new Task[2];
            producers[0] = Task.Run(() => RunProducer("A", 0));
            producers[1] = Task.Run(() => RunProducer("B", itemsToProduce));

            // Create a cleanup task that will call CompleteAdding after all producers are done adding items.
            Task cleanup = Task.Factory.ContinueWhenAll(producers, (p) => collection.CompleteAdding());

            // Queue the Consumer thread. Put this call before Parallel.Invoke to begin consuming as soon as the producers add items.
            Task.Run(() => RunConsumer());
        }

        /// <summary>
        /// 在 ConcurrentDictionary 中添加和移除项
        /// </summary>
        public static void Test5()
        {
            CityInfo[] data =
            {
                new CityInfo(){ Name = "Boston", Latitude = 42.358769M, Longitude = -71.057806M, RecentHighTemperatures = new int[] {56, 51, 52, 58, 65, 56,53}},
                new CityInfo(){ Name = "Miami", Latitude = 25.780833M, Longitude = -80.195556M, RecentHighTemperatures = new int[] {86,87,88,87,85,85,86}},
                new CityInfo(){ Name = "Los Angeles", Latitude = 34.05M, Longitude = -118.25M, RecentHighTemperatures =   new int[] {67,68,69,73,79,78,78}},
                new CityInfo(){ Name = "Seattle", Latitude = 47.609722M, Longitude =  -122.333056M, RecentHighTemperatures =   new int[] {49,50,53,47,52,52,51}},
                new CityInfo(){ Name = "Toronto", Latitude = 43.716589M, Longitude = -79.340686M, RecentHighTemperatures =   new int[] {53,57, 51,52,56,55,50}},
                new CityInfo(){ Name = "Mexico City", Latitude = 19.432736M, Longitude = -99.133253M, RecentHighTemperatures =   new int[] {72,68,73,77,76,74,73}},
                new CityInfo(){ Name = "Rio de Janiero", Latitude = -22.908333M, Longitude = -43.196389M, RecentHighTemperatures =   new int[] {72,68,73,82,84,78,84}},
                new CityInfo(){ Name = "Quito", Latitude = -0.25M, Longitude = -78.583333M, RecentHighTemperatures =   new int[] {71,69,70,66,65,64,61}}
            };

            // Add some key/value pairs from multiple threads.
            Task[] tasks = new Task[2];

            tasks[0] = Task.Run(() =>
            {
                for (int i = 0; i < 2; i++)
                {
                    if (cities.TryAdd(data[i].Name, data[i]))
                        Console.WriteLine("Added {0} on thread {1}", data[i],
                            Thread.CurrentThread.ManagedThreadId);
                    else
                        Console.WriteLine("Could not add {0}", data[i]);
                }
            });

            tasks[1] = Task.Run(() =>
            {
                for (int i = 2; i < data.Length; i++)
                {
                    if (cities.TryAdd(data[i].Name, data[i]))
                        Console.WriteLine("Added {0} on thread {1}", data[i],
                            Thread.CurrentThread.ManagedThreadId);
                    else
                        Console.WriteLine("Could not add {0}", data[i]);
                }
            });

            // Output results so far.
            Task.WaitAll(tasks);

            // Enumerate collection from the app main thread.
            // Note that ConcurrentDictionary is the one concurrent collection that does not support thread-safe enumeration.
            foreach (var city in cities)
            {
                Console.WriteLine("{0} has been added.", city.Key);
            }

            AddOrUpdateWithoutRetrieving();
            RetrieveValueOrAdd();
            RetrieveAndUpdateOrAdd();

            Console.WriteLine("Press any key.");
            Console.ReadKey();
        }

        /// <summary>
        /// 向集合添加限制和阻塞功能
        /// </summary>
        public static void Test6()
        {

            int priorityCount = 7;
            SimplePriorityQueue<int, int> queue = new SimplePriorityQueue<int, int>(priorityCount);
            var bc = new BlockingCollection<KeyValuePair<int, int>>(queue, 50);


            CancellationTokenSource cts = new CancellationTokenSource();

            Task.Run(() =>
            {
                if (Console.ReadKey(true).KeyChar == 'c')
                    cts.Cancel();
            });

            // Create a Task array so that we can Wait on it
            // and catch any exceptions, including user cancellation.
            Task[] tasks = new Task[2];

            // Create a producer thread. You can change the code to 
            // make the wait time a bit slower than the consumer 
            // thread to demonstrate the blocking capability.
            tasks[0] = Task.Run(() =>
            {
                // We randomize the wait time, and use that value
                // to determine the priority level (Key) of the item.
                Random r = new Random();

                int itemsToAdd = 40;
                int count = 0;
                while (!cts.Token.IsCancellationRequested && itemsToAdd-- > 0)
                {
                    int waitTime = r.Next(2000);
                    int priority = waitTime % priorityCount;
                    var item = new KeyValuePair<int, int>(priority, count++);

                    bc.Add(item);
                    Console.WriteLine("added pri {0}, data={1}", item.Key, item.Value);
                }
                Console.WriteLine("Producer is done adding.");
                bc.CompleteAdding();
            },
             cts.Token);

            //Give the producer a chance to add some items.
            Thread.SpinWait(1000000);

            // Create a consumer thread. The wait time is
            // a bit slower than the producer thread to demonstrate
            // the bounding capability at the high end. Change this value to see
            // the consumer run faster to demonstrate the blocking functionality
            // at the low end.

            tasks[1] = Task.Run(() =>
            {
                while (!bc.IsCompleted && !cts.Token.IsCancellationRequested)
                {
                    Random r = new Random();
                    int waitTime = r.Next(2000);
                    Thread.SpinWait(waitTime * 70);

                    // KeyValuePair is a value type. Initialize to avoid compile error in if(success)
                    KeyValuePair<int, int> item = new KeyValuePair<int, int>();
                    bool success = false;
                    success = bc.TryTake(out item);
                    if (success)
                    {
                        // Do something useful with the data.
                        Console.WriteLine("removed Pri = {0} data = {1} collCount= {2}", item.Key, item.Value, bc.Count);
                    }
                    else
                        Console.WriteLine("No items to retrieve. count = {0}", bc.Count);
                }
                Console.WriteLine("Exited consumer loop");
            },
                cts.Token);

            try
            {
                Task.WaitAll(tasks, cts.Token);
            }
            catch (OperationCanceledException e)
            {
                if (e.CancellationToken == cts.Token)
                    Console.WriteLine("Operation was canceled by user. Press any key to exit");
            }
            catch (AggregateException ae)
            {
                foreach (var v in ae.InnerExceptions)
                    Console.WriteLine(v.Message);
            }
            finally
            {
                cts.Dispose();
            }

            Console.ReadKey(true);

        }

        /// <summary>
        /// 在管道中使用阻塞集合的数组
        /// </summary>
        public static void Test7()
        {
            CancellationTokenSource cts = new CancellationTokenSource();

            // Start up a UI thread for cancellation.
            Task.Run(() =>
            {
                if (Console.ReadKey(true).KeyChar == 'c')
                    cts.Cancel();
            });

            //Generate some source data.
            BlockingCollection<int>[] sourceArrays = new BlockingCollection<int>[5];
            for (int i = 0; i < sourceArrays.Length; i++)
                sourceArrays[i] = new BlockingCollection<int>(500);
            Parallel.For(0, sourceArrays.Length * 500, (j) =>
            {
                int k = BlockingCollection<int>.TryAddToAny(sourceArrays, j);
                if (k >= 0)
                    Console.WriteLine("added {0} to source data", j);
            });

            foreach (var arr in sourceArrays)
                arr.CompleteAdding();

            // First filter accepts the ints, keeps back a small percentage
            // as a processing fee, and converts the results to decimals.
            var filter1 = new PipelineFilter<int, decimal>
            (
                sourceArrays,
                (n) => Convert.ToDecimal(n * 0.97),
                cts.Token,
                "filter1"
             );

            // Second filter accepts the decimals and converts them to
            // System.Strings.
            var filter2 = new PipelineFilter<decimal, string>
            (
                filter1.m_output,
                (s) => String.Format("{0}", s),
                cts.Token,
                "filter2"
             );

            // Third filter uses the constructor with an Action<T>
            // that renders its output to the screen,
            // not a blocking collection.
            var filter3 = new PipelineFilter<string, string>
            (
                filter2.m_output,
                (s) => Console.WriteLine("The final result is {0}", s),
                cts.Token,
                "filter3"
             );

            // Start up the pipeline!
            try
            {
                Parallel.Invoke(
                             () => filter1.Run(),
                             () => filter2.Run(),
                             () => filter3.Run()
                         );
            }
            catch (AggregateException ae)
            {
                foreach (var ex in ae.InnerExceptions)
                    Console.WriteLine(ex.Message + ex.StackTrace);
            }
            finally
            {
                cts.Dispose();
            }
            // You will need to press twice if you ran to the end:
            // once for the cancellation thread, and once for this thread.
            Console.WriteLine("Press any key.");
            Console.ReadKey(true);
        }

        /// <summary>
        /// 使用 ConcurrentBag 创建目标池
        /// </summary>
        public static void Test8()
        {
            CancellationTokenSource cts = new CancellationTokenSource();

            // Create an opportunity for the user to cancel.
            Task.Run(() =>
            {
                if (Console.ReadKey().KeyChar == 'c' || Console.ReadKey().KeyChar == 'C')
                    cts.Cancel();
            });

            ObjectPool<MyClass> pool = new ObjectPool<MyClass>(() => new MyClass());

            // Create a high demand for MyClass objects.
            Parallel.For(0, 1000000, (i, loopState) =>
            {
                MyClass mc = pool.GetObject();
                Console.CursorLeft = 0;
                // This is the bottleneck in our application. All threads in this loop
                // must serialize their access to the static Console class.
                Console.WriteLine("{0:####.####}", mc.GetValue(i));

                pool.PutObject(mc);
                if (cts.Token.IsCancellationRequested)
                    loopState.Stop();

            });
            Console.WriteLine("Press the Enter key to exit.");
            Console.ReadLine();
            cts.Dispose();
        }


        static int inputs = 2000;
        // Create a new concurrent dictionary.
        static ConcurrentDictionary<string, CityInfo> cities = new ConcurrentDictionary<string, CityInfo>();


        // This method shows how to add key-value pairs to the dictionary
        // in scenarios where the key might already exist.
        private static void AddOrUpdateWithoutRetrieving()
        {
            // Sometime later. We receive new data from some source.
            CityInfo ci = new CityInfo()
            {
                Name = "Toronto",
                Latitude = 43.716589M,
                Longitude = -79.340686M,
                RecentHighTemperatures = new int[] { 54, 59, 67, 82, 87, 55, -14 }
            };

            // Try to add data. If it doesn't exist, the object ci is added. If it does
            // already exist, update existingVal according to the custom logic in the 
            // delegate.
            cities.AddOrUpdate(ci.Name, ci,
                (key, existingVal) =>
                {
                    // If this delegate is invoked, then the key already exists.
                    // Here we make sure the city really is the same city we already have.
                    // (Support for multiple cities of the same name is left as an exercise for the reader.)
                    if (ci != existingVal)
                        throw new ArgumentException("Duplicate city names are not allowed: {0}.", ci.Name);

                    // The only updatable fields are the temperature array and lastQueryDate.
                    existingVal.lastQueryDate = DateTime.Now;
                    existingVal.RecentHighTemperatures = ci.RecentHighTemperatures;
                    return existingVal;
                });

            // Verify that the dictionary contains the new or updated data.
            Console.Write("Most recent high temperatures for {0} are: ", cities[ci.Name].Name);
            int[] temps = cities[ci.Name].RecentHighTemperatures;
            foreach (var temp in temps) Console.Write("{0}, ", temp);
            Console.WriteLine();
        }

        // This method shows how to use data and ensure that it has been
        // added to the dictionary.
        private static void RetrieveValueOrAdd()
        {
            string searchKey = "Caracas";
            CityInfo retrievedValue = null;

            try
            {
                retrievedValue = cities.GetOrAdd(searchKey, GetDataForCity(searchKey));
            }
            catch (ArgumentException e)
            {
                Console.WriteLine(e.Message);
            }

            // Use the data.
            if (retrievedValue != null)
            {
                Console.Write("Most recent high temperatures for {0} are: ", retrievedValue.Name);
                int[] temps = cities[retrievedValue.Name].RecentHighTemperatures;
                foreach (var temp in temps) Console.Write("{0}, ", temp);
            }
            Console.WriteLine();
        }




        // This method shows how to retrieve a value from the dictionary,
        // when you expect that the key/value pair already exists,
        // and then possibly update the dictionary with a new value for the key.
        private static void RetrieveAndUpdateOrAdd()
        {
            CityInfo retrievedValue;
            string searchKey = "Buenos Aires";

            if (cities.TryGetValue(searchKey, out retrievedValue))
            {
                // use the data
                Console.Write("Most recent high temperatures for {0} are: ", retrievedValue.Name);
                int[] temps = retrievedValue.RecentHighTemperatures;
                foreach (var temp in temps) Console.Write("{0}, ", temp);

                // Make a copy of the data. Our object will update its lastQueryDate automatically.
                CityInfo newValue = new CityInfo(retrievedValue.Name,
                                                retrievedValue.Longitude,
                                                retrievedValue.Latitude,
                                                retrievedValue.RecentHighTemperatures);

                // Replace the old value with the new value.
                if (!cities.TryUpdate(searchKey, newValue, retrievedValue))
                {
                    //The data was not updated. Log error, throw exception, etc.
                    Console.WriteLine("Could not update {0}", retrievedValue.Name);
                }
            }
            else
            {
                // Add the new key and value. Here we call a method to retrieve
                // the data. Another option is to add a default value here and 
                // update with real data later on some other thread.
                CityInfo newValue = GetDataForCity(searchKey);
                if (cities.TryAdd(searchKey, newValue))
                {
                    // use the data
                    Console.Write("Most recent high temperatures for {0} are: ", newValue.Name);
                    int[] temps = newValue.RecentHighTemperatures;
                    foreach (var temp in temps) Console.Write("{0}, ", temp);
                }
                else
                    Console.WriteLine("Unable to add data for {0}", searchKey);
            }
        }

        //Assume this method knows how to find long/lat/temp info for any specified city.
        static CityInfo GetDataForCity(string name)
        {
            // Real implementation left as exercise for the reader.
            if (String.CompareOrdinal(name, "Caracas") == 0)
                return new CityInfo()
                {
                    Name = "Caracas",
                    Longitude = 10.5M,
                    Latitude = -66.916667M,
                    RecentHighTemperatures = new int[] { 91, 89, 91, 91, 87, 90, 91 }
                };
            else if (String.CompareOrdinal(name, "Buenos Aires") == 0)
                return new CityInfo()
                {
                    Name = "Buenos Aires",
                    Longitude = -34.61M,
                    Latitude = -58.369997M,
                    RecentHighTemperatures = new int[] { 80, 86, 89, 91, 84, 86, 88 }
                };
            else
                throw new ArgumentException("Cannot find any data for {0}", name);
        }

        // Limit the collection size to 2000 items at any given time.
        // Set itemsToProduce to > 500 to hit the limit.
        const int upperLimit = 1000;

        // Adjust this number to see how it impacts the producing-consuming pattern.
        const int itemsToProduce = 100;

        static BlockingCollection<long> collection = new BlockingCollection<long>(upperLimit);

        // Variables for diagnostic output only.
        static Stopwatch sw = new Stopwatch();
        static int totalAdditions = 0;

        // Counter for synchronizing producers.
        static int producersStillRunning = 2;

        static void RunProducer(string ID, int start)
        {
            int additions = 0;
            for (int i = start; i < start + itemsToProduce; i++)
            {
                // The data that is added to the collection.
                long ticks = sw.ElapsedTicks;

                // Display additions and subtractions.
                Console.WriteLine("{0} adding tick value {1}. item# {2}", ID, ticks, i);

                if (!collection.IsAddingCompleted)
                    collection.Add(ticks);

                // Counter for demonstration purposes only.
                additions++;

                // Uncomment this line to slow down the producer threads ing.
                Thread.SpinWait(100000);
            }

            Interlocked.Add(ref totalAdditions, additions);
            Console.WriteLine("{0} is done adding: {1} items", ID, additions);
        }

        static void RunConsumer()
        {
            // GetConsumingEnumerable returns the enumerator for the underlying collection.
            int subtractions = 0;
            foreach (var item in collection.GetConsumingEnumerable())
            {
                Console.WriteLine("Consuming tick value {0} : item# {1} : current count = {2}",
                        item.ToString("D18"), subtractions++, collection.Count);
            }

            Console.WriteLine("Total added: {0} Total consumed: {1} Current count: {2} ",
                                totalAdditions, subtractions, collection.Count);
            sw.Stop();

            Console.WriteLine("Press any key to exit");
        }

        static void NonBlockingConsumer(BlockingCollection<int> bc, CancellationToken ct)
        {
            // IsCompleted == (IsAddingCompleted && Count == 0)
            while (!bc.IsCompleted)
            {
                int nextItem = 0;
                try
                {
                    if (!bc.TryTake(out nextItem, 0, ct))
                    {
                        Console.WriteLine(" Take Blocked");
                    }
                    else
                        Console.WriteLine(" Take:{0}", nextItem);
                }

                catch (OperationCanceledException)
                {
                    Console.WriteLine("Taking canceled.");
                    break;
                }

                // Slow down consumer just a little to cause collection to fill up faster, and lead to "AddBlocked"
                Thread.SpinWait(500000);
            }

            Console.WriteLine("\r\nNo more items to take.");
        }

        static void NonBlockingProducer(BlockingCollection<int> bc, CancellationToken ct)
        {
            int itemToAdd = 0;
            bool success = false;

            do
            {
                // Cancellation causes OCE. We know how to handle it.
                try
                {
                    // A shorter timeout causes more failures.
                    success = bc.TryAdd(itemToAdd, 2, ct);
                }
                catch (OperationCanceledException)
                {
                    Console.WriteLine("Add loop canceled.");
                    // Let other threads know we're done in case they aren't monitoring the cancellation token.
                    bc.CompleteAdding();
                    break;
                }

                if (success)
                {
                    Console.WriteLine(" Add:{0}", itemToAdd);
                    itemToAdd++;
                }
                else
                {
                    Console.Write(" AddBlocked:{0} Count = {1}", itemToAdd.ToString(), bc.Count);
                    // Don't increment nextItem. Try again on next iteration.

                    // Do something else useful instead.
                    UpdateProgress(itemToAdd);
                }

            } while (itemToAdd < inputs);

            // No lock required here because only one producer.
            bc.CompleteAdding();
        }

        static void UpdateProgress(int i)
        {
            double percent = ((double)i / inputs) * 100;
            Console.WriteLine("Percent complete: {0}", percent);
        }
    }

    /// <summary>
    /// Simple business object. A PartId is used to identify the type of part but the part name can change. 
    /// </summary>
    public class Part : IEquatable<Part>, IComparable<Part>
    {
        public string PartName { get; set; }

        public int PartId { get; set; }

        public override string ToString()
        {
            return "ID: " + PartId + "   Name: " + PartName;
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            Part objAsPart = obj as Part;
            if (objAsPart == null) return false;
            else return Equals(objAsPart);
        }

        public int SortByNameAscending(string name1, string name2)
        {
            return name1.CompareTo(name2);
        }

        // Default comparer for Part type.
        public int CompareTo(Part comparePart)
        {
            // A null value means that this object is greater.
            if (comparePart == null)
                return 1;
            else
                return PartId.CompareTo(comparePart.PartId);
        }

        public override int GetHashCode()
        {
            return PartId;
        }

        public bool Equals(Part other)
        {
            if (other == null) return false;
            return (PartId.Equals(other.PartId));
        }
        // Should also override == and != operators.
    }

    /// <summary>
    /// The type of the Value to store in the dictionary:
    /// </summary>
    class CityInfo : IEqualityComparer<CityInfo>
    {
        public string Name { get; set; }
        public DateTime lastQueryDate { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public int[] RecentHighTemperatures { get; set; }

        public CityInfo(string name, decimal longitude, decimal latitude, int[] temps)
        {
            Name = name;
            lastQueryDate = DateTime.Now;
            Longitude = longitude;
            Latitude = latitude;
            RecentHighTemperatures = temps;
        }

        public CityInfo()
        {
        }

        public CityInfo(string key)
        {
            Name = key;
            // MaxValue means "not initialized"
            Longitude = Decimal.MaxValue;
            Latitude = Decimal.MaxValue;
            lastQueryDate = DateTime.Now;
            RecentHighTemperatures = new int[] { 0 };

        }
        public bool Equals(CityInfo x, CityInfo y)
        {
            return x.Name == y.Name && x.Longitude == y.Longitude && x.Latitude == y.Latitude;
        }

        public int GetHashCode(CityInfo obj)
        {
            CityInfo ci = obj;
            return ci.Name.GetHashCode();
        }
    }

    // Implementation of a priority queue that has bounding and blocking functionality.
    public class SimplePriorityQueue<TPriority, TValue> : IProducerConsumerCollection<KeyValuePair<int, TValue>>
    {
        // Each internal queue in the array represents a priority level. 
        // All elements in a given array share the same priority.
        private ConcurrentQueue<KeyValuePair<int, TValue>>[] _queues = null;

        // The number of queues we store internally.
        private int priorityCount = 0;
        private int m_count = 0;

        public SimplePriorityQueue(int priCount)
        {
            this.priorityCount = priCount;
            _queues = new ConcurrentQueue<KeyValuePair<int, TValue>>[priorityCount];
            for (int i = 0; i < priorityCount; i++)
                _queues[i] = new ConcurrentQueue<KeyValuePair<int, TValue>>();
        }

        // IProducerConsumerCollection members
        public bool TryAdd(KeyValuePair<int, TValue> item)
        {
            _queues[item.Key].Enqueue(item);
            Interlocked.Increment(ref m_count);
            return true;
        }

        public bool TryTake(out KeyValuePair<int, TValue> item)
        {
            bool success = false;

            // Loop through the queues in priority order
            // looking for an item to dequeue.
            for (int i = 0; i < priorityCount; i++)
            {
                // Lock the internal data so that the Dequeue
                // operation and the updating of m_count are atomic.
                lock (_queues)
                {
                    success = _queues[i].TryDequeue(out item);
                    if (success)
                    {
                        Interlocked.Decrement(ref m_count);
                        return true;
                    }
                }
            }

            // If we get here, we found nothing. 
            // Assign the out parameter to its default value and return false.
            item = new KeyValuePair<int, TValue>(0, default(TValue));
            return false;
        }

        public int Count
        {
            get { return m_count; }
        }

        // Required for ICollection
        void ICollection.CopyTo(Array array, int index)
        {
            CopyTo(array as KeyValuePair<int, TValue>[], index);
        }

        // CopyTo is problematic in a producer-consumer.
        // The destination array might be shorter or longer than what 
        // we get from ToArray due to adds or takes after the destination array was allocated.
        // Therefore, all we try to do here is fill up destination with as much
        // data as we have without running off the end.                
        public void CopyTo(KeyValuePair<int, TValue>[] destination, int destStartingIndex)
        {
            if (destination == null) throw new ArgumentNullException();
            if (destStartingIndex < 0) throw new ArgumentOutOfRangeException();

            int remaining = destination.Length;
            KeyValuePair<int, TValue>[] temp = this.ToArray();
            for (int i = 0; i < destination.Length && i < temp.Length; i++)
                destination[i] = temp[i];
        }

        public KeyValuePair<int, TValue>[] ToArray()
        {
            KeyValuePair<int, TValue>[] result;

            lock (_queues)
            {
                result = new KeyValuePair<int, TValue>[this.Count];
                int index = 0;
                foreach (var q in _queues)
                {
                    if (q.Count > 0)
                    {
                        q.CopyTo(result, index);
                        index += q.Count;
                    }
                }
                return result;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerator<KeyValuePair<int, TValue>> GetEnumerator()
        {
            for (int i = 0; i < priorityCount; i++)
            {
                foreach (var item in _queues[i])
                    yield return item;
            }
        }

        public bool IsSynchronized
        {
            get
            {
                throw new NotSupportedException();
            }
        }

        public object SyncRoot
        {
            get { throw new NotSupportedException(); }
        }
    }

    class PipelineFilter<TInput, TOutput>
    {
        Func<TInput, TOutput> m_processor = null;
        public BlockingCollection<TInput>[] m_input;
        public BlockingCollection<TOutput>[] m_output = null;
        Action<TInput> m_outputProcessor = null;
        CancellationToken m_token;
        public string Name { get; private set; }

        public PipelineFilter(
            BlockingCollection<TInput>[] input,
            Func<TInput, TOutput> processor,
            CancellationToken token,
            string name)
        {
            m_input = input;
            m_output = new BlockingCollection<TOutput>[5];
            for (int i = 0; i < m_output.Length; i++)
                m_output[i] = new BlockingCollection<TOutput>(500);

            m_processor = processor;
            m_token = token;
            Name = name;
        }

        // Use this constructor for the final endpoint, which does
        // something like write to file or screen, instead of
        // pushing to another pipeline filter.
        public PipelineFilter(
            BlockingCollection<TInput>[] input,
            Action<TInput> renderer,
            CancellationToken token,
            string name)
        {
            m_input = input;
            m_outputProcessor = renderer;
            m_token = token;
            Name = name;
        }

        public void Run()
        {
            Console.WriteLine("{0} is running", this.Name);
            while (!m_input.All(bc => bc.IsCompleted) && !m_token.IsCancellationRequested)
            {
                TInput receivedItem;
                int i = BlockingCollection<TInput>.TryTakeFromAny(
                    m_input, out receivedItem, 50, m_token);
                if (i >= 0)
                {
                    if (m_output != null) // we pass data to another blocking collection
                    {
                        TOutput outputItem = m_processor(receivedItem);
                        BlockingCollection<TOutput>.AddToAny(m_output, outputItem);
                        Console.WriteLine("{0} sent {1} to next", this.Name, outputItem);
                    }
                    else // we're an endpoint
                    {
                        m_outputProcessor(receivedItem);
                    }
                }
                else
                    Console.WriteLine("Unable to retrieve data from previous filter");
            }
            if (m_output != null)
            {
                foreach (var bc in m_output) bc.CompleteAdding();
            }
        }
    }

    public class ObjectPool<T>
    {
        private ConcurrentBag<T> _objects;
        private Func<T> _objectGenerator;

        public ObjectPool(Func<T> objectGenerator)
        {
            if (objectGenerator == null) throw new ArgumentNullException("objectGenerator");
            _objects = new ConcurrentBag<T>();
            _objectGenerator = objectGenerator;
        }

        public T GetObject()
        {
            T item;
            if (_objects.TryTake(out item)) return item;
            return _objectGenerator();
        }

        public void PutObject(T item)
        {
            _objects.Add(item);
        }
    }

    // A toy class that requires some resources to create.
    // You can experiment here to measure the performance of the
    // object pool vs. ordinary instantiation.
    class MyClass
    {
        public int[] Nums { get; set; }
        public double GetValue(long i)
        {
            return Math.Sqrt(Nums[i]);
        }
        public MyClass()
        {
            Nums = new int[1000000];
            Random rand = new Random();
            for (int i = 0; i < Nums.Length; i++)
                Nums[i] = rand.Next();
        }
    }
}
