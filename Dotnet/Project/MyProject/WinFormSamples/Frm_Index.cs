using Com.Colin.Win.Model;
using System;
using System.Collections;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Windows.Forms;

namespace Com.Colin.Win
{
    /// <summary>
    /// 单文档界面(SDI)应用程序（如记事本和画图程序）仅支持一次打开一个窗口或文档。如果需要编辑多个文档，必须创建 SDI 应用程序的多个实例。
    /// 
    /// 而使用多文档界面(MDI)程序（如 Word 和 AdobePhotoshop）时，用户可以同时编辑多个文档。
    /// 
    /// MDI 程序中的应用程序窗口称为父窗口，应用程序内部的窗口称为子窗口。
    /// 
    /// 虽然 MDI 应用程序可以具有多个子窗口，但是每个子窗口却只能有一个父窗口。此外，处于活动状态的子窗口最大数目是1。
    /// 
    /// 子窗口本身不能再成为父窗口，而且不能移动到它们的父窗口区域之外。除此以外，子窗口的行为与任何其他窗口一样（如可以关闭、最小化和调整大小等）。
    /// </summary>
    public partial class Frm_Index : Form
    {
        private string listenIP = "127.0.0.1";
        private int listenPort = 5555;
        private ArrayList clients;

        public Frm_Index()
        {
            InitializeComponent();
        }

        private void 简易聊天ToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            //ChatServer win = new ChatServer();
            //win.Show();
        }

        private void StartListening()
        {
            TcpListener listener = new TcpListener(IPAddress.Parse(listenIP), listenPort);
            listener.Start();
            while (true)
            {
                try
                {
                    Socket clientSocket = listener.AcceptSocket();
                    Thread clientService = new Thread(new ParameterizedThreadStart(ServiceClient));
                    Hashtable inParameters = new Hashtable
                    {
                        { "client", clientSocket }, { "clientService", clientService }
                    };
                    clientService.Start(inParameters);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }
            }
            //listener.Stop();
        }

        private void ServiceClient(object obj)
        {
            Hashtable inParameters = obj as Hashtable;
            Socket client = inParameters["client"] as Socket;
            Thread clientService = inParameters["clientService"] as Thread;
            bool keepalive = true;
            while (keepalive)
            {
                Byte[] buffer = new Byte[1024];
                client.Receive(buffer);
                string clientcommand = System.Text.Encoding.ASCII.GetString(buffer);

                string[] tokens = clientcommand.Split(new Char[] { '|' });
                Console.WriteLine(clientcommand);

                if (tokens[0] == "CONN")
                {
                    for (int n = 0; n < clients.Count; n++)
                    {
                        Client cl = (Client)clients[n];
                        SendToClient(cl, "JOIN|" + tokens[1]);
                    }
                    EndPoint ep = client.RemoteEndPoint;
                    //string add = ep.ToString();
                    Client c = new Client(tokens[1], ep, clientService, client);
                    clients.Add(c);
                    string message = "LIST|" + GetChatterList() + "\r\n";
                    SendToClient(c, message);
                }
                if (tokens[0] == "CHAT")
                {
                    for (int n = 0; n < clients.Count; n++)
                    {
                        Client cl = (Client)clients[n];
                        SendToClient(cl, clientcommand);
                    }
                }
                if (tokens[0] == "PRIV")
                {
                    string destclient = tokens[3];
                    for (int n = 0; n < clients.Count; n++)
                    {
                        Client cl = (Client)clients[n];
                        if (cl.Name.CompareTo(tokens[3]) == 0)
                            SendToClient(cl, clientcommand);
                        if (cl.Name.CompareTo(tokens[1]) == 0)
                            SendToClient(cl, clientcommand);
                    }
                }
                if (tokens[0] == "GONE")
                {
                    int remove = 0;
                    bool found = false;
                    int c = clients.Count;
                    for (int n = 0; n < c; n++)
                    {
                        Client cl = (Client)clients[n];
                        SendToClient(cl, clientcommand);
                        if (cl.Name.CompareTo(tokens[1]) == 0)
                        {
                            remove = n;
                            found = true;
                        }
                    }
                    if (found)
                        clients.RemoveAt(remove);
                    client.Close();
                    keepalive = false;
                }
            }
        }

        private void SendToClient(Client cl, string message)
        {
            try
            {
                byte[] buffer = System.Text.Encoding.ASCII.GetBytes(message.ToCharArray());
                cl.Sock.Send(buffer, buffer.Length, 0);
            }
            catch (Exception e)
            {
                cl.Sock.Close();
                cl.CLThread.Abort();
                clients.Remove(cl);
            }
        }

        private string GetChatterList()
        {
            string chatters = "";
            for (int n = 0; n < clients.Count; n++)
            {
                Client cl = (Client)clients[n];
                chatters += cl.Name;
                chatters += "|";
            }
            chatters.Trim(new char[] { '|' });
            return chatters;
        }
    }
}
