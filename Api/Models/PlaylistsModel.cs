using System.ComponentModel.DataAnnotations;
using System.Web;
using Newtonsoft.Json;

namespace Models
{
    public class PlaylistsModel
    {
        public string Title { get; set; }
        public string AnchorId
        {
            get
            {
                return Title.ToLower().Trim().Replace(" ", "-");
            }
        }
        public string Description { get; set; }
        public string Genre { get; set; }
        public string SpotifyMusicLink { get; set; }
        public string ImageURL { get; set; }
        public string SpotifyId { get; set; }
        [DisplayFormat(DataFormatString = "{0:n0}")]
        public int TrackCount { get; set; }
        public int FollowerCount { get; set; }
        public string TrackAndFollowerText
        {
            get
            {
                if (FollowerCount == 0)
                {
                    return $"{TrackCount:N0} songs";
                }
                else
                {
                    return $"{TrackCount:N0} songs, {FollowerCount:N0} followers";
                }
            }
        }


        public PlaylistsModel()
        {

        }
        public PlaylistsModel(dynamic playlist)
        {
            //href from singleton and external_urls.spotify from array
            if (PropertyExists(playlist, "href"))
            {
                SpotifyMusicLink = playlist?.href;
            }
            else if (PropertyExists(playlist, "external_urls.spotify")) {
                SpotifyMusicLink = playlist?.external_urls.spotify;
            }
            ImageURL = playlist.images[0].url;
            Title = playlist.name;
            SpotifyId = playlist.id;
            TrackCount = playlist?.tracks?.total ?? 0;
            if (PropertyExists(playlist, "followers"))
            {
                SpotifyMusicLink = playlist?.followers?.total ?? 0;
            }

            string decodedDescription = HttpUtility.HtmlDecode(playlist?.description);
            var descriptionAndGenre = decodedDescription.Split('(', ')');
            if (descriptionAndGenre.Length > 1)
            {
                Genre = descriptionAndGenre[1].Trim();
                Description = descriptionAndGenre[0].Trim();
            }
            else
            {
                Genre = "Genreless";
                Description = decodedDescription.Trim();
            }
        }

        private static bool PropertyExists(dynamic obj, string name) {
        if (obj == null) return false;
        if (obj is IDictionary<string, object> dict) {
            return dict.ContainsKey(name);
        }
        return obj.GetType().GetProperty(name) != null;
    }
    }
}