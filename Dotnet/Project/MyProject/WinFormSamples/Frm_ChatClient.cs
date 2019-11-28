using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Net.Sockets;
using System.IO;
using System.Threading;
using System.Text;

namespace Com.Colin.Win
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Frm_ChatClient : Form
    {
		private TextBox ChatOut;
		private StatusBar statusBar1;

		/// <summary>
		/// Required designer variable.
		/// </summary>
		private Container components = null;
		private Button btnConnect;
		private Button btnSend;
		private int serverport;
		private NetworkStream ns;
		private StreamReader sr;
		private TcpClient clientsocket;
		private Thread receive = null;
		private string serveraddress;
		private ListBox lbChatters;
		private RichTextBox rtbChatIn;
		private Button btnDisconnect;
		private string clientname;
		private bool connected = false;
		private bool logging = false;
		private Button btnLog;
		private StreamWriter logwriter;

		public Frm_ChatClient()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();
			serverport = 5555;
			btnDisconnect.Enabled = false;
			btnSend.Enabled = false;
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
            this.btnLog = new System.Windows.Forms.Button();
            this.rtbChatIn = new System.Windows.Forms.RichTextBox();
            this.btnSend = new System.Windows.Forms.Button();
            this.ChatOut = new System.Windows.Forms.TextBox();
            this.btnConnect = new System.Windows.Forms.Button();
            this.lbChatters = new System.Windows.Forms.ListBox();
            this.statusBar1 = new System.Windows.Forms.StatusBar();
            this.btnDisconnect = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnLog
            // 
            this.btnLog.Location = new System.Drawing.Point(451, 86);
            this.btnLog.Name = "btnLog";
            this.btnLog.Size = new System.Drawing.Size(96, 26);
            this.btnLog.TabIndex = 9;
            this.btnLog.Text = "Start Logging";
            this.btnLog.Click += new System.EventHandler(this.btnLog_Click);
            // 
            // rtbChatIn
            // 
            this.rtbChatIn.Font = new System.Drawing.Font("Tahoma", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.rtbChatIn.Location = new System.Drawing.Point(10, 17);
            this.rtbChatIn.Name = "rtbChatIn";
            this.rtbChatIn.ReadOnly = true;
            this.rtbChatIn.Size = new System.Drawing.Size(288, 229);
            this.rtbChatIn.TabIndex = 6;
            this.rtbChatIn.Text = "";
            // 
            // btnSend
            // 
            this.btnSend.Location = new System.Drawing.Point(317, 250);
            this.btnSend.Name = "btnSend";
            this.btnSend.Size = new System.Drawing.Size(77, 26);
            this.btnSend.TabIndex = 5;
            this.btnSend.Text = "Send";
            this.btnSend.Click += new System.EventHandler(this.btnSend_Click);
            // 
            // ChatOut
            // 
            this.ChatOut.Font = new System.Drawing.Font("Tahoma", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ChatOut.Location = new System.Drawing.Point(10, 250);
            this.ChatOut.Name = "ChatOut";
            this.ChatOut.Size = new System.Drawing.Size(288, 23);
            this.ChatOut.TabIndex = 2;
            this.ChatOut.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.ChatOut_KeyPress);
            // 
            // btnConnect
            // 
            this.btnConnect.Location = new System.Drawing.Point(451, 17);
            this.btnConnect.Name = "btnConnect";
            this.btnConnect.Size = new System.Drawing.Size(96, 26);
            this.btnConnect.TabIndex = 4;
            this.btnConnect.Text = "Connect";
            this.btnConnect.Click += new System.EventHandler(this.btnConnect_Click);
            // 
            // lbChatters
            // 
            this.lbChatters.ItemHeight = 12;
            this.lbChatters.Location = new System.Drawing.Point(326, 17);
            this.lbChatters.Name = "lbChatters";
            this.lbChatters.SelectionMode = System.Windows.Forms.SelectionMode.None;
            this.lbChatters.Size = new System.Drawing.Size(106, 196);
            this.lbChatters.TabIndex = 7;
            // 
            // statusBar1
            // 
            this.statusBar1.Location = new System.Drawing.Point(0, 326);
            this.statusBar1.Name = "statusBar1";
            this.statusBar1.Size = new System.Drawing.Size(563, 17);
            this.statusBar1.SizingGrip = false;
            this.statusBar1.TabIndex = 3;
            this.statusBar1.Text = "Disconnected";
            // 
            // btnDisconnect
            // 
            this.btnDisconnect.Location = new System.Drawing.Point(451, 52);
            this.btnDisconnect.Name = "btnDisconnect";
            this.btnDisconnect.Size = new System.Drawing.Size(96, 26);
            this.btnDisconnect.TabIndex = 8;
            this.btnDisconnect.Text = "Disconnect";
            this.btnDisconnect.Click += new System.EventHandler(this.btnDisconnect_Click);
            // 
            // ChatClientForm1
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(6, 14);
            this.ClientSize = new System.Drawing.Size(563, 343);
            this.Controls.Add(this.btnLog);
            this.Controls.Add(this.btnDisconnect);
            this.Controls.Add(this.lbChatters);
            this.Controls.Add(this.rtbChatIn);
            this.Controls.Add(this.btnSend);
            this.Controls.Add(this.btnConnect);
            this.Controls.Add(this.statusBar1);
            this.Controls.Add(this.ChatOut);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Name = "ChatClientForm1";
            this.Text = "ChatClient";
            this.ResumeLayout(false);
            this.PerformLayout();

		}
		#endregion
		protected override void OnClosed(EventArgs e)
		{
			QuitChat();
			if(receive != null && receive.IsAlive)
				receive.Abort();
			
			base.OnClosed(e);
		}

		private void EstablishConnection()
		{
			statusBar1.Text = "Connecting to Server";
			try 
			{
				clientsocket = new TcpClient(serveraddress,  serverport);
				ns = clientsocket.GetStream();
				sr = new StreamReader(ns);
				connected = true;
			}
			catch (Exception ex)
			{
				MessageBox.Show("Could not connect to Server", "Error",
					MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
				statusBar1.Text = "Disconnected";
			}
		}

		private void RegisterWithServer()
		{
			try 
			{
				string command = "CONN|" + ChatOut.Text;
                byte[] outbytes = Encoding.ASCII.GetBytes(command.ToCharArray());
				ns.Write(outbytes,0,outbytes.Length);
				
				string serverresponse = sr.ReadLine();
				serverresponse.Trim();
				string[] tokens = serverresponse.Split(new Char[]{'|'});
				if(tokens[0] == "LIST")
				{
					statusBar1.Text = "Connected";
					btnDisconnect.Enabled = true;
				}
				for(int n=1; n<tokens.Length-1; n++)
					lbChatters.Items.Add(tokens[n].Trim(new char[]{'\r','\n'}));
				this.Text = clientname + ": Connected to Chat Server";
				
			}
			catch (Exception e)
			{
				MessageBox.Show("Error Registering","Error",
					MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
			}
		}
		
		private void ReceiveChat()
		{
			bool keepalive = true;
			while (keepalive) 
			{
				try
				{
					Byte[] buffer = new Byte[2048];
					ns.Read(buffer,0,buffer.Length);
					string chatter = System.Text.Encoding.ASCII.GetString(buffer);

					string[] tokens = chatter.Split(new Char[]{'|'});

					if (tokens[0] == "CHAT")
					{
						rtbChatIn.AppendText(tokens[1]);
						if(logging)
							logwriter.WriteLine(tokens[1]);
					}
					if (tokens[0] == "JOIN")
					{
						rtbChatIn.AppendText(tokens[1].Trim() );
						rtbChatIn.AppendText(" has joined the Chat\r\n");
						if(logging){
							logwriter.Write(tokens[1]);
							logwriter.WriteLine(" has joined the Chat");
						}
						//string newguy = tokens[1].Trim(new char[]{'\r','\n'});
						lbChatters.Items.Add(tokens[1].Trim(new char[]{'\r','\n'}));
					}
					if (tokens[0] == "GONE")
					{
						rtbChatIn.AppendText(tokens[1].Trim() );
						rtbChatIn.AppendText(" has left the Chat\r\n");
						if(logging){
							logwriter.Write(tokens[1]);
							logwriter.WriteLine(" has left the Chat");
						}
						lbChatters.Items.Remove(tokens[1].Trim(new char[]{'\r','\n'}));
					}
					if (tokens[0] == "QUIT")
					{
						ns.Close();
						clientsocket.Close();
						keepalive = false;
						statusBar1.Text = "Server has stopped";
						connected= false;
						btnSend.Enabled = false;
						btnDisconnect.Enabled = false;
					}
				}
				catch(Exception e){}
			}
		}
		private void QuitChat() 
		{
			if(connected) {
				try{
					string command = "GONE|" + clientname;
					Byte[] outbytes = System.Text.Encoding.ASCII.GetBytes(command.ToCharArray());
					ns.Write(outbytes,0,outbytes.Length);
					clientsocket.Close();
				}
				catch(Exception ex){
				}
			}
			if(logging)
				logwriter.Close();

			if(receive != null && receive.IsAlive)
				receive.Abort();
			this.Text = "ChatClient";
			
		}
		private void StartStopLogging() 
		{
			if(!logging){
				if(!Directory.Exists("logs"))
					Directory.CreateDirectory("logs");
				string fname = "logs\\" + DateTime.Now.ToString("ddMMyyHHmm") + ".txt";
				logwriter = new StreamWriter(new FileStream(fname, FileMode.OpenOrCreate,
					FileAccess.Write));
				logging = true;
				btnLog.Text = "Stop Logging";
				statusBar1.Text = "Connected - Log on";
			}
			else{
				logwriter.Close();
				logging = false;
				btnLog.Text = "Start Logging";
				statusBar1.Text = "Connected - Log off";
			}

		}
        /*
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(String[] args) 
		{
			ChatClientForm cf = new ChatClientForm1();
			if(args.Length == 0)
				cf.serveraddress = "localhost";
			else
				cf.serveraddress = args[0];

			Application.Run(cf);
		}
        */
		private void btnConnect_Click(object sender, System.EventArgs e)
		{
			clientname = ChatOut.Text;
			EstablishConnection();
			
			if(connected)
			{
				RegisterWithServer();
				receive = new Thread(new ThreadStart(ReceiveChat));
				receive.Start();
				btnSend.Enabled = true;
				btnConnect.Enabled = false;
				ChatOut.Text = "";
			}
		}

		private void btnSend_Click(object sender, System.EventArgs e)
		{
			try{
				string pubcommand = "CHAT|" + clientname +": "+ChatOut.Text + "\r\n";
				Byte[] outbytes = System.Text.Encoding.ASCII.GetBytes(pubcommand.ToCharArray());
				ns.Write(outbytes,0,outbytes.Length);
				ChatOut.Text = "";
				}
			catch(Exception ex){
				MessageBox.Show("Connection with Server lost","Error",
					MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
				ns.Close();
				clientsocket.Close();
				if(receive != null && receive.IsAlive)
					receive.Abort();
				connected = false;
				statusBar1.Text = "Disconnected";
			}
		}

		private void btnDisconnect_Click(object sender, System.EventArgs e)
		{
			QuitChat();
			btnDisconnect.Enabled = false;
			btnConnect.Enabled = true;
			btnSend.Enabled = false;
			ns.Close();
			clientsocket.Close();
			receive.Abort();
			connected = false;
			lbChatters.Items.Clear();
			statusBar1.Text = "Disconnected";
			rtbChatIn.Text = "";
		}

		private void ChatOut_KeyPress(object sender, System.Windows.Forms.KeyPressEventArgs e) {
			if(e.KeyChar == '\r')
				if(connected)
					btnSend_Click(sender, e);
				else
					btnConnect_Click(sender, e);
		}

		private void btnLog_Click(object sender, System.EventArgs e) {
			StartStopLogging();
		}

	}
}
