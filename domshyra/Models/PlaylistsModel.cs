using System;
using System.ComponentModel.DataAnnotations;

namespace domshyra.Models
{
    public class PlaylistsModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string AppleMusicLink { get; set; }
        public string SpotifyMusicLink { get; set; }
        public string ImageURL { get; set; }
        public string SpotifyId { get; set; }
        [DisplayFormat(DataFormatString = "{0:n0}")]
        public string TrackCount { get; set; }
        public string FollowerCount { get; set; }
        public string TrackAndFollowerText
        {
            get
            {
                if (string.IsNullOrWhiteSpace(FollowerCount))
                {
                    return $"{TrackCount} tracks";
                }
                else
                {
                    return $"{TrackCount} tracks and {FollowerCount} followers";
                }
            }
        }
        public string CrossFadeText { get; }

        public PlaylistsModel()
        {
            string helpURL = "https://support.spotify.com/us/article/crossfade-feature/";
            CrossFadeText = $"For best radio experience use <a href='{helpURL}' title='Crossfade recommened at 6 seconds or more' aria-label='Crossfade from spotify recommened at 6 seconds or more' data-toggle='tooltip' data-placement='bottom'>Spotiy's crossfade feature</a>";
        }
    }
}
