using System.Collections.Generic;
using System.Threading.Tasks;
using domshyra.Models;

namespace domshyra.Interfaces
{
    public interface ISpotifyProivder
    {
        List<string> GetPlaylistIds();
        Task<PlaylistsModel> GetPlaylistInfoAsync(string playlistId, string authToken);
        Task<List<PlaylistsModel>> GetPlaylists();
    }
}