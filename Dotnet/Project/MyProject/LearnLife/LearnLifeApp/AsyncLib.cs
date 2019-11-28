using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Xml.Linq;

namespace LearnLifeApp
{
    public class SearchInfo : BindableBase
    {
        public SearchInfo()
        {
            list = new ObservableCollection<SearchItemResult>();
            list.CollectionChanged += delegate { OnPropertyChanged("List"); };
        }

        private string searchTerm;

        public string SearchTerm
        {
            get { return searchTerm; }
            set { SetProperty(ref searchTerm, value); }
        }

        private ObservableCollection<SearchItemResult> list;
        public ObservableCollection<SearchItemResult> List
        {
            get
            {
                return list;
            }
        }
    }

    public class BindableBase : INotifyPropertyChanged
    {
        protected void SetProperty<T>(ref T prop, T value, [CallerMemberName] string callerName = "")
        {
            if (!EqualityComparer<T>.Default.Equals(prop, value))
            {
                prop = value;
                OnPropertyChanged(callerName);
            }
        }

        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }

    public class SearchItemResult : BindableBase
    {
        private string title;

        public string Title
        {
            get { return title; }
            set { SetProperty(ref title, value); }
        }

        private string url;
        public string Url
        {
            get { return url; }
            set { SetProperty(ref url, value); }
        }

        private string thumbnailUrl;
        public string ThumbnailUrl
        {
            get { return thumbnailUrl; }
            set { SetProperty(ref thumbnailUrl, value); }
        }

        private string source;
        public string Source
        {
            get { return source; }
            set { SetProperty(ref source, value); }
        }

        //private BitmapImage thumbnailImage;
        //public BitmapImage ThumbnailImage
        //{
        //  get
        //  {
        //    return thumbnailImage;
        //  }
        //  set
        //  {
        //    SetProperty(ref thumbnailImage, value);
        //  }
        //}

        //private BitmapImage image;
        //public BitmapImage Image
        //{
        //  get
        //  {
        //    return image;
        //  }
        //  set
        //  {
        //    SetProperty(ref image, value);
        //  }
        //}

    }

    public class BingRequest : IImageRequest
    {
        private const string AppId = "enter your BING app-id here";

        public BingRequest()
        {
            Count = 50;
            Offset = 0;
        }
        private string searchTerm;

        public string SearchTerm
        {
            get { return searchTerm; }
            set { searchTerm = value; }
        }

        public string Url
        {
            get
            {
                return string.Format("https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Image?Query=%27{0}%27&$top={1}&$skip={2}&$format=Atom", SearchTerm, Count, Offset);
            }
        }



        public int Count { get; set; }
        public int Offset { get; set; }

        public IEnumerable<SearchItemResult> Parse(string xml)
        {
            XElement respXml = XElement.Parse(xml);
            // XNamespace atom = XNamespace.Get("http://www.w3.org/2005/Atom");
            XNamespace d = XNamespace.Get("http://schemas.microsoft.com/ado/2007/08/dataservices");
            XNamespace m = XNamespace.Get("http://schemas.microsoft.com/ado/2007/08/dataservices/metadata");

            return (from item in respXml.Descendants(m + "properties")
                    select new SearchItemResult
                    {
                        Title = new string(item.Element(d + "Title").Value.Take(50).ToArray()),
                        Url = item.Element(d + "MediaUrl").Value,
                        ThumbnailUrl = item.Element(d + "Thumbnail").Element(d + "MediaUrl").Value,
                        Source = "Bing"
                    }).ToList();
        }


        public ICredentials Credentials
        {
            get
            {
                return new NetworkCredential(AppId, AppId);
            }
        }
    }

    public class FlickrRequest : IImageRequest
    {
        private const string AppId = "enter your Flickr app-id here";

        public FlickrRequest()
        {
            Count = 50;
            Page = 1;
        }
        private string searchTerm;

        public string SearchTerm
        {
            get { return searchTerm; }
            set { searchTerm = value; }
        }

        public string Url
        {
            get
            {
                return string.Format("http://api.flickr.com/services/rest?api_key={0}&method=flickr.photos.search&content_type=1&text={1}&per_page={2}&page={3}", AppId, SearchTerm, Count, Page);
            }
        }

        public int Count { get; set; }
        public int Page { get; set; }

        public IEnumerable<SearchItemResult> Parse(string xml)
        {
            XElement respXml = XElement.Parse(xml);
            return (from item in respXml.Descendants("photo")
                    select new SearchItemResult
                    {
                        Title = new string(item.Attribute("title").Value.Take(50).ToArray()),
                        Url = string.Format("http://farm{0}.staticflickr.com/{1}/{2}_{3}_z.jpg",
                        item.Attribute("farm").Value, item.Attribute("server").Value, item.Attribute("id").Value, item.Attribute("secret").Value),
                        ThumbnailUrl = string.Format("http://farm{0}.staticflickr.com/{1}/{2}_{3}_t.jpg",
                        item.Attribute("farm").Value, item.Attribute("server").Value, item.Attribute("id").Value, item.Attribute("secret").Value),
                        Source = "Flickr"
                    }).ToList();
        }

        public ICredentials Credentials
        {
            get { return null; }
        }
    }

    public interface IImageRequest
    {
        string SearchTerm { get; set; }
        string Url { get; }

        IEnumerable<SearchItemResult> Parse(string xml);

        ICredentials Credentials { get; }
    }
}
