using System.Collections.Generic;
using System.Threading.Tasks;
using domshyra.Models;

namespace domshyra.Interfaces
{
    public interface ISpotifyProivder
    {
        Task<List<PlaylistsModel>> GetPlaylists();
    }
}