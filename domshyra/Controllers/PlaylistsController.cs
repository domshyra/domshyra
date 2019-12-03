using domshyra.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace domshyra.Controllers
{
    public class PlaylistsController : Controller
    {
        public IActionResult Index()
        {
            return View(GetPlaylistsList());
        }

        private List<PlaylistsModel> GetPlaylistsList()
        {
            return new List<PlaylistsModel>()
            {
                new PlaylistsModel()
                {
                    Title = "Silver Spurs Radio",
                    AppleMusicLink = "https://music.apple.com/us/playlist/silver-spurs-radio/pl.u-xlKY2uXJ4jE0",
                    SpotifyMusicLink = "https://open.spotify.com/playlist/3vaznYrm9fSPz3ENlcOR3e?si=DpzKVbI7QumEB9by9a7F4A",
                    Description = "Cowboy songs that remind me of driving around with my grandpa playing Johnny Cash, and red dead redemption.",
                    ImgSrc = "~/images/silver-spurs.jpg"
                }
            };
        }
    }
}