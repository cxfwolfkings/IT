namespace SC.WPFSamples
{
    public class Book
    {
        public string Title { get; set; }
        public string Publisher { get; set; }

        public override string ToString()
        {
            return Title;
        }
    }
}
