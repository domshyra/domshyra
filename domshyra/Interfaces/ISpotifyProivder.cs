using System.Collections.Generic;
using System.Threading.Tasks;
using domshyra.Models;

namespace domshyra.Interfaces
{
    public interface ISpotifyProivder
    {
        List<string> GetPlaylistIds();
        Task<string> GetPlaylistInfoAsync(string playlistId, string authToken);
        List<PlaylistsModel> GetPlaylists();
    }
}