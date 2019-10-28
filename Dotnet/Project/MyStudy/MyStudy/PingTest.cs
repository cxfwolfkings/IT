using System;

namespace MyStudy
{
    class pingInterval : IDisposable
    {
        private class pinger : IDisposable
        {
            private pingInterval pingInterval;
            private System.Net.NetworkInformation.Ping ping;
            private System.Net.IPAddress ip;
            public pinger(pingInterval pingInterval)
            {
                this.pingInterval = pingInterval;
                ping = new System.Net.NetworkInformation.Ping();
                ping.PingCompleted += pingCompleted;
            }
            internal void Next()
            {
                while (ping != null)
                {
                    if ((ip = pingInterval.getIP()) == null)
                    {
                        pingInterval.free(this);
                        break;
                    }
                    else
                    {
                        try
                        {
                            ping.SendAsync(ip, 100, this);
                            break;
                        }
                        catch { pingInterval.onCompleted(ip, false); }
                    }
                }
            }
            private void pingCompleted(object sender, System.Net.NetworkInformation.PingCompletedEventArgs e)
            {
                pingInterval.onCompleted(ip, e.Error == null);
                Next();
            }
            public void Dispose()
            {
                if (ping != null)
                {
                    ping.PingCompleted -= pingCompleted;
                    ping.Dispose();
                    ping = null;
                }
            }
        }
        private readonly System.Net.IPAddress[] ips;
        private int ipIndex;
        private readonly object ipLock = new object();
        private readonly int intervalSeconds;
        private Action<System.Net.IPAddress, bool> onCompleted;
        private pinger[] pings;
        private readonly pinger[] freePings;
        private readonly pinger[] nextPings;
        private int freePingIndex;
        private DateTime pingTime;
        private readonly System.Timers.Timer timer;
        private readonly object pingLock = new object();
        public pingInterval(System.Net.IPAddress[] ips, int intervalSeconds, Action<System.Net.IPAddress, bool> onCompleted)
        {
            this.ips = ips;
            this.intervalSeconds = intervalSeconds;
            this.onCompleted = onCompleted;
            freePingIndex = ips.Length / (intervalSeconds * 5) + 1;
            pings = new pinger[freePingIndex];
            freePings = new pinger[freePingIndex];
            nextPings = new pinger[freePingIndex];
            for (int index = freePingIndex; index != 0; pings[index] = freePings[index] = new pinger(this)) --index;
            timer = new System.Timers.Timer(intervalSeconds * 1000);
            timer.Elapsed += next;
            pingTime = DateTime.Now;
            next(null, null);
        }
        private void next(object sender, System.Timers.ElapsedEventArgs e)
        {
            if (sender != null) timer.Stop();
            while (wait())
            {
                System.Threading.Monitor.Enter(pingLock);
                int count = freePingIndex;
                try
                {
                    Array.Copy(freePings, nextPings, freePingIndex);
                    freePingIndex = 0;
                }
                finally { System.Threading.Monitor.Exit(pingLock); }
                while (count != 0) nextPings[--count].Next();
                DateTime now = DateTime.Now;
                if ((pingTime = pingTime.AddSeconds(this.intervalSeconds)) > now)
                {
                    timer.Interval = (pingTime - now).TotalMilliseconds;
                    if (pings != null) timer.Start();
                    break;
                }
            }
        }
        private bool wait()
        {
            System.Threading.Monitor.Enter(ipLock);
            try
            {
                if (pings != null)
                {
                    if (ipIndex != 0) System.Threading.Monitor.Wait(ipLock);
                    ipIndex = ips.Length;
                    return true;
                }
            }
            finally { System.Threading.Monitor.Exit(ipLock); }
            return false;
        }
        private System.Net.IPAddress getIP()
        {
            System.Threading.Monitor.Enter(ipLock);
            try
            {
                if (ipIndex != 0)
                {
                    System.Net.IPAddress ip = ips[--ipIndex];
                    if (ipIndex == 0) System.Threading.Monitor.Pulse(ipLock);
                    return ip;
                }
            }
            finally { System.Threading.Monitor.Exit(ipLock); }
            return null;
        }
        private void free(pinger ping)
        {
            System.Threading.Monitor.Enter(pingLock);
            try
            {
                freePings[freePingIndex++] = ping;
            }
            finally { System.Threading.Monitor.Exit(pingLock); }
        }
        public void Dispose()
        {
            System.Threading.Monitor.Enter(ipLock);
            try
            {
                if (pings != null)
                {
                    timer.Stop();
                    timer.Elapsed -= next;
                    foreach (pinger ping in pings) ping.Dispose();
                    pings = null;
                }
                System.Threading.Monitor.Pulse(ipLock);
            }
            finally { System.Threading.Monitor.Exit(ipLock); }
        }
    }
}
