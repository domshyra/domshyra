using domshyra.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// API call to get the playlist data
        /// </summary>
        /// <returns></returns>
        public async Task<string> GetRadios()
        {
            return JsonConvert.SerializeObject(await _spotifyProivder.GetPlaylists());
        }
    }
}