using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Represents a controller for querying Spotify playlists.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class SpotifyController : ControllerBase
    {
        private readonly ILogger<SpotifyController> _logger;
        private readonly ISpotifyService _spotifyService;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="spotifyService"></param>
        public SpotifyController(ILogger<SpotifyController> logger, ISpotifyService spotifyService)
        {
            _logger = logger;
            _spotifyService = spotifyService;
        }

        /// <summary>
        /// returns all playlists
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetSpotifyPlaylists()
        {
            try
            {
                _logger.LogInformation("Getting playlists");
                var response = await _spotifyService.GetPlaylists();
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError("{message}", ex.Message);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// returns a playlist by id
        /// </summary>
        /// <param name="playlistId"></param>
        /// <returns></returns>
        [HttpGet("{playlistId}")]
        public async Task<ActionResult> GetSpotifyPlaylist(string playlistId)
        {
            try
            {
                _logger.LogInformation($"Getting playlist with id {playlistId}");
                var response = await _spotifyService.GetPlaylist(playlistId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError("{message}", ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }


}
