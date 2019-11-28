namespace Com.Colin.Library.RocketMQ.Remote
{
    interface ISerializer
    {
        byte[] EncodeHeader(RemotingCommand cmd);

        RemotingCommand DecodeHeader(byte[] data);
    }
}
