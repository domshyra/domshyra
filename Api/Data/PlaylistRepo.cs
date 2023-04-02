using Microsoft.EntityFrameworkCore;


public interface IPlaylistRepo
{
    Task<List<PlaylistRatingDto>> GetRatings();
    Task<PlaylistRatingDto?> GetRating(string playlistId);
    Task<PlaylistRatingDto> AddRating(string spotifyId, int rating);
    Task<PlaylistRatingDto> UpdateRating(string spotifyId, int rating);
    Task DeleteRating(string playlistId);
}


public class PlaylistRepo : IPlaylistRepo {
    private readonly PlaylistDbContext _context;

    public PlaylistRepo(PlaylistDbContext context)
    {
        _context = context;
    }

    public async Task<List<PlaylistRatingDto>> GetRatings()
    {
        return await _context.Ratings.Select(e => new PlaylistRatingDto(e.Id, e.Rating, e.SpotifyId, e.Comment)).ToListAsync();
    }

    public async Task<PlaylistRatingDto?> GetRating(string playlistId)
    {
        var entity = await _context.Ratings.SingleOrDefaultAsync(h => h.SpotifyId == playlistId);
        if (entity == null)
            return null;
        return EntityToDetailDto(entity);
    }

    private PlaylistRatingDto EntityToDetailDto(PlaylistRatingEntity entity)
    {
        return new PlaylistRatingDto(entity.Id, entity.Rating, entity.SpotifyId, entity.Comment);
    }

    public async Task<PlaylistRatingDto> AddRating(string spotifyId, int rating)
    {
        var entity = new PlaylistRatingEntity
        {
            Id = Guid.NewGuid(),
            Rating = rating,
            SpotifyId = spotifyId
        };
        _context.Ratings.Add(entity);
        await _context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task<PlaylistRatingDto> UpdateRating(string spotifyId, int rating)
    {
        var entity = await _context.Ratings.SingleOrDefaultAsync(h => h.SpotifyId == spotifyId);
        if (entity == null)
            throw new Exception($"Playlist rating with id {spotifyId} not found");
        entity.Rating = rating;
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return EntityToDetailDto(entity);
    }

    public async Task DeleteRating(string playlistId) {
        Guid id = Guid.Parse(playlistId);
        var entity = await _context.Ratings.SingleOrDefaultAsync(h => h.Id == id);
        if (entity == null)
            throw new Exception($"Playlist rating with id {playlistId} not found");
        _context.Ratings.Remove(entity);
        await _context.SaveChangesAsync();
    }
}