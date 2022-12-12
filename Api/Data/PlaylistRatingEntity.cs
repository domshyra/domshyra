public class PlaylistRatingEntity
{
    public Guid Id { get; set; }
    public string SpotifyId { get; set; }
    
    public int Rating { get; set; }
    public string? Comment { get; set; }
}