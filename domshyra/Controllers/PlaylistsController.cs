using domshyra.Interfaces;
using domshyra.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace domshyra.Controllers
{
    /// <summary>
    /// Controller for the playlist page
    /// </summary>
    public class PlaylistsController : Controller
    {
        private readonly ISpotifyProivder _spotifyProivder;

        /// <summary>
        /// PlaylistContoller constructor
        /// </summary>
        /// <param name="spotifyProivder"></param>
        public PlaylistsController(ISpotifyProivder spotifyProivder)
        {
            _spotifyProivder = spotifyProivder;
        }

        /// <summary>
        /// Playlist page
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Index()
        {
            List<PlaylistsModel> playlists = await _spotifyProivder.GetPlaylists();

            return View(playlists);
        }
        //TODO
        //[Route("Radio")]
        //public async Task<IActionResult> Radio()
        //{
        //    List<PlaylistsModel> playlists = await _spotifyProivder.GetPlaylists();

        //    return View(playlists);
        //}

    }
}