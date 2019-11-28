using System.Collections.Generic;
namespace Com.Colin.Library.RocketMQ.Remote
{
    internal interface ICustomHeader
    {
        Dictionary<string, string> Encode();
    }
}
