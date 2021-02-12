using System.Collections.Generic;
using System.Threading.Tasks;
using domshyra.Models;

namespace domshyra.Interfaces
{
    /// <summary>
    /// Provides methods to query Spotify
    /// </summary>
    public interface ISpotifyProivder
    {
        /// <summary>
        /// Gets playlists from Spotify
        /// </summary>
        /// <returns></returns>
        Task<List<PlaylistsModel>> GetPlaylists();
    }
}