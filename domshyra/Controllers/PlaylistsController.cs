using domshyra.Interfaces;
using domshyra.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace domshyra.Controllers
{
    public class PlaylistsController : Controller
    {
        private readonly ISpotifyProivder _spotifyProivder;

        public PlaylistsController(ISpotifyProivder spotifyProivder)
        {
            _spotifyProivder = spotifyProivder;
        }

        public async Task<IActionResult> Index()
        {
            List<PlaylistsModel> playlists = await _spotifyProivder.GetPlaylists();

            return View(playlists);
        }

    }
}