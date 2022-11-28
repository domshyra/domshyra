using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Interfaces
{
    /// <summary>
    /// Provides methods to query Spotify
    /// </summary>
    public interface ISpotifyProvider
    {
        /// <summary>
        /// Gets playlists from Spotify
        /// </summary>
        /// <returns></returns>
        Task<List<PlaylistsModel>> GetPlaylists();
    }
}