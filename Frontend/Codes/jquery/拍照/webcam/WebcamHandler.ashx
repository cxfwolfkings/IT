<%@ WebHandler Language="C#" Class="WebcamHandler" %>

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;

public class WebcamHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/html";
        string op = context.Request["op"] == null ? "" : context.Request["op"].ToString();
        if (op == "webcam")
        {
            if (!string.IsNullOrEmpty(context.Request["pix"]))
            {
                if (!string.IsNullOrEmpty(context.Request["w"]) && !string.IsNullOrEmpty(context.Request["h"]) && !string.IsNullOrEmpty(context.Request["pix"]) && !string.IsNullOrEmpty(context.Request["planid"]) && !string.IsNullOrEmpty(context.Request["examkey"]))
                {
                    string planid = context.Request["planid"];
                    string examkey = context.Request["examkey"];
                    string width = context.Request["w"];
                    string height = context.Request["h"];
                    string pix = context.Request["pix"];
                    int w = int.Parse(width);
                    int h = int.Parse(height);
                    string savePath = context.Server.MapPath("~/UpLoad/" + planid + "/");
                    Bitmap bmap = new Bitmap(w, h);
                    string[] rows = pix.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < rows.Length; i++)
                    {
                        string[] col = rows[i].Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                        for (int j = 0; j < col.Length; j++)
                        {
                            Color color = Color.FromArgb(Convert.ToInt32(col[j]));
                            Color reColor = Color.FromArgb(255, color);
                            bmap.SetPixel(j, i, reColor);
                        }
                    }
                    DirectoryInfo dirPath = new DirectoryInfo(savePath);
                    if (!dirPath.Exists)
                    {
                        dirPath.Create();
                    }
                    DateTime dt = DateTime.Now;
                    string fileName = examkey + "&" + dt.ToString("yyyy-MM-dd HH时mm分ss秒", System.Globalization.DateTimeFormatInfo.InvariantInfo) + ".jpg";
                    savePath += fileName;
                    bmap.Save(savePath);
                    context.Response.Write("success");
                }
            }
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}