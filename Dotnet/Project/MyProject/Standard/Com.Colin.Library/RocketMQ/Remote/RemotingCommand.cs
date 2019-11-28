using System;
using System.Collections.Generic;
using System.Text;

namespace Com.Colin.Library.RocketMQ.Remote
{
    internal class RemotingCommand
    {

        private static Int32 opaque = 0;

        private static int RPCType = 0;
        private static int RPCOneWay = 1;
        private static int ResponseType = 1;

        private static int FLAG = 0;

        private static byte LANGUAGE = 10;

        private static int VERSION = 137;

        public Int16 Code { get; set; }

        public Byte Language { get; set; }

        public Int16 Version { get; set; }

        public Int32 Opaque { get; set; }

        public Int32 Flag { get; set; }

        public String Remark { get; set; }

        public Dictionary<string, string> ExtFields { get; set; }

        public Byte[] Body { get; set; }

    }
}
