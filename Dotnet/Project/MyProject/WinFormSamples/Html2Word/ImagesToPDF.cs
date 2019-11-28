using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace PicsToPDF
{
    class ImagesToPDF
    {
        public static void ConvertJPG2PDF(string[] jpgs, string pdf)
        {
            if (jpgs.Length < 1 || string.IsNullOrEmpty(pdf)) return;
            Document document = new Document(iTextSharp.text.PageSize.A4, 0, 0, 0, 0);
            using (FileStream stream = new FileStream(pdf, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                PdfWriter.GetInstance(document, stream);
                document.Open();
                for (int i = 0; i < jpgs.Length; i++)
                {
                    string jpgfile = jpgs[i];
                    using (FileStream imageStream = new FileStream(jpgfile, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                    {

                        Image image = Image.GetInstance(imageStream);
                        if (image.Height > iTextSharp.text.PageSize.A4.Height - 0)
                        {
                            image.ScaleToFit(iTextSharp.text.PageSize.A4.Width - 0, iTextSharp.text.PageSize.A4.Height - 0);
                        }
                        else if (image.Width > iTextSharp.text.PageSize.A4.Width - 0)
                        {
                            image.ScaleToFit(iTextSharp.text.PageSize.A4.Width - 0, iTextSharp.text.PageSize.A4.Height - 0);
                        }
                        image.Alignment = iTextSharp.text.Image.ALIGN_MIDDLE;
                        document.Add(image);
                    }
                }

                document.Close();
            }
        }

        public static void ConvertWord2PDF(string Word, string SavePath)
        {
            if (string.IsNullOrEmpty(SavePath)) return;

            Document document = new Document(iTextSharp.text.PageSize.A4, 0, 0, 0, 0);
            using (FileStream stream = new FileStream(SavePath, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                PdfWriter.GetInstance(document, stream);
                document.Open();
                string Wordfile = Word;
                using (FileStream Stream = new FileStream(Wordfile, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {

                }
                document.Close();
            }
        }
    }
}
