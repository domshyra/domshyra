namespace domshyra.Models
{
    public class SpotifyPlaylistHeader
    {
        public string id { get; set; }
        public bool @public { get; set; }
        public Owner owner { get; set; }
        public Image[] images { get; set; }
        public string description { get; set; }
        public string name { get; set; }
        public Track tracks { get; set; }
        public ExternalUrls external_urls { get; set; }
    }

    public class Owner
    {
        public string display_name { get; set; }
    }
    public class Image
    {
        public string url { get; set; }
    }
    public class Track
    {
        public string href { get; set; }
        public int total { get; set; }
    }
    public class ExternalUrls
    {
        public string spotify { get; set; }
    }

}
