using System.ComponentModel.DataAnnotations;

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
                    return $"{TrackCount:N0} songs and {FollowerCount:N0} followers";
                }
            }
        }


        public PlaylistsModel()
        {

        }
    }
}