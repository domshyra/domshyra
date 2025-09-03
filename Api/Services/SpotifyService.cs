using System.Text;
using System.Web;
using Api.Interfaces;
using Api.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Api.Services
{
    /// <inheritdoc/>
    public class SpotifyService : ISpotifyService
    {
        private readonly IConfiguration _configuration;
        private readonly string _username;
        private readonly string _client_id;
        private readonly string _client_secret;
        private readonly HttpClient _httpClient;
        private const string TokenUrl = "https://accounts.spotify.com/api/token";

        /// <inheritdoc/>
        public SpotifyService(IConfiguration Configuration, HttpClient httpClient)
        {
            _configuration = Configuration;
            _username = _configuration["Spotify:Username"] ?? throw new NullReferenceException("Spotify Username is null");
            _client_id = _configuration["Spotify:ClientId"] ?? throw new NullReferenceException("Spotify ClientId is null");
            _client_secret = _configuration["Spotify:ClientSecret"] ?? throw new NullReferenceException("Spotify ClientSecret is null");
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        /// <inheritdoc/>
        public async Task<List<PlaylistsModel>> GetPlaylists()
        {
            string authToken = await GetAuthTokenAsync();

            List<PlaylistsModel> playlists = await GetPlaylists(authToken);

            return [.. playlists.OrderBy(x => x.Title)];
        }

        /// <inheritdoc/>
        public async Task<PlaylistsModel> GetPlaylist(string playlistId)
        {
            string authToken = await GetAuthTokenAsync();
            var playlist = await GetPlaylistInfoAsync(playlistId, authToken);
            if (playlist == null)
            {
                throw new Exception($"Playlist with Id {playlistId} not found or could not be retrieved.");
            }
            return playlist;
        }

        private async Task<List<string>> GetPlaylistIds(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/{_username}/playlists?limit=40";
            try
            {
                var client = _httpClient;
                client.DefaultRequestHeaders.Remove("Authorization");
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");
                using HttpResponseMessage res = await client.GetAsync(baseUrl);
                using HttpContent content = res.Content;
                string data = await content.ReadAsStringAsync();

                if (data != null)
                {
                    dynamic playlistHeader = JObject.Parse(data);

                    //lets get these items into a list I can parse
                    SpotifyPlaylists? playlists = JsonConvert.DeserializeObject<SpotifyPlaylists>(data);
                    if (playlists?.items == null)
                    {
                        return [];
                    }
                    //I only want to display public playlists by me
                    return playlists.items.ToList()
                        .Where(x => string.Equals(x.owner.display_name, _username, StringComparison.OrdinalIgnoreCase) && x.@public)
                        .Select(x => x.id).ToList();
                }
                else
                {
                    Console.WriteLine("NO Data----------");
                }
            }

            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            }

            return [];
        }

        private async Task<List<PlaylistsModel>> GetPlaylists(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/{_username}/playlists?limit=40";
            try
            {
                var client = _httpClient;
                client.DefaultRequestHeaders.Remove("Authorization");
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");
                using HttpResponseMessage res = await client.GetAsync(baseUrl);
                using HttpContent content = res.Content;
                string data = await content.ReadAsStringAsync();

                if (data != null)
                {
                    dynamic playlistHeader = JObject.Parse(data);

                    //lets get these items into a list I can parse
                    //TODO query tracks for more info and get follower count
                    SpotifyPlaylists? playlists = JsonConvert.DeserializeObject<SpotifyPlaylists>(data);
                    if (playlists?.items == null)
                    {
                        return [];
                    }
                    //I only want to display public playlists by me
                    List<PlaylistsModel> playlistsModels = playlists.items.ToList()
                        .Where(x => string.Equals(x.owner.display_name, _username, StringComparison.OrdinalIgnoreCase) && x.@public)
                        .Select(playlist => new PlaylistsModel()
                        {
                            Description = playlist.description,
                            ImageURL = playlist.images[0].url,
                            PlaylistId = playlist.id,
                            Title = playlist.name,
                            TrackCount = playlist.tracks.total,
                            SpotifyMusicLink = playlist.external_urls.spotify
                        }).ToList();


                    foreach (PlaylistsModel playlistModel in playlistsModels)
                    {
                        SetDescriptionAndGenre(playlistModel);
                    }

                    return playlistsModels;
                }
                else
                {
                    Console.WriteLine("NO Data----------");
                }
            }

            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            }

            return new List<PlaylistsModel>();
        }

        /// <summary>
        /// Sets the description and genre for the playlist
        /// </summary>
        /// <param name="playlistModel"></param>
        private static void SetDescriptionAndGenre(PlaylistsModel playlistModel)
        {
            //decode the html
            string decodedDescription = HttpUtility.HtmlDecode(playlistModel.Description);
            var descriptionAndGenre = decodedDescription.Split('(', ')');
            if (descriptionAndGenre.Length > 1)
            {
                playlistModel.Genre = descriptionAndGenre[1].Trim();
                playlistModel.Description = descriptionAndGenre[0].Trim();
            }
            else
            {
                playlistModel.Genre = "Genreless";
                playlistModel.Description = decodedDescription.Trim();
            }
        }

        /// <summary>
        /// Get the auth token for my queries since a user isn't authenticating it 
        /// </summary>
        /// <returns></returns>
        private async Task<string> GetAuthTokenAsync()
        {
            //? https://developer.spotify.com/documentation/general/guides/authorization-guide/
            string authToken;

            //endcode the clientId and client secret
            byte[] plainTextBytes = Encoding.UTF8.GetBytes($"{_client_id}:{_client_secret}");
            string encodedAppInfo = Convert.ToBase64String(plainTextBytes);
            try
            {
                if (string.IsNullOrEmpty(_client_id) || string.IsNullOrEmpty(_client_secret))
                {
                    throw new NullReferenceException($"{nameof(_client_id)} is {_client_id}, and {nameof(_client_secret)} is {_client_secret}. These both need to be populated. Make sure client secrets are updated.");
                }
                var client = _httpClient;
                client.DefaultRequestHeaders.Remove("Authorization");
                client.DefaultRequestHeaders.Add("Authorization", $"Basic {encodedAppInfo}");
                var requestData = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials")
                };
                using var content = new FormUrlEncodedContent(requestData);
                using HttpResponseMessage response = await client.PostAsync(TokenUrl, content);
                string json = await response.Content.ReadAsStringAsync();
                response.EnsureSuccessStatusCode();
                var spotifyAuth = JsonConvert.DeserializeObject<SpotifyAuth>(json);
                if (spotifyAuth == null || string.IsNullOrEmpty(spotifyAuth.access_token))
                {

                    throw new Exception("Failed to retrieve Spotify access token.");
                }
                authToken = spotifyAuth.access_token;
                return authToken;
            }
            catch (HttpRequestException e)
            {
                //Make sure clientId and Secrets are set
                Console.WriteLine(e.Message);
                // Console.WriteLine(ParseCurl(encodedAppInfo));
                throw;
            }
        }
        private string ParseCurl(string encodedAppInfo)
        {
            string requestCurl;
            requestCurl = $"curl -X POST {TokenUrl} \\\n" +
                          "  -H \"Content-Type: application/x-www-form-urlencoded\" \\\n" +
                          "  -H \"Accept: application/json\" \\\n" +
                          "  -d \"grant_type=client_credentials\" \\\n" +
                          $"  -d \"Authorization=Basic {encodedAppInfo}\"";

            return requestCurl;
        }

        private async Task<PlaylistsModel?> GetPlaylistInfoAsync(string playlistId, string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/playlists/{playlistId}";
            try
            {
                var client = _httpClient;
                client.DefaultRequestHeaders.Remove("Authorization");
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");
                using HttpResponseMessage res = await client.GetAsync(baseUrl);
                using HttpContent content = res.Content;
                string data = await content.ReadAsStringAsync();
                if (data != null)
                {
                    dynamic playlistJSON = JObject.Parse(data);
                    PlaylistsModel playlist = new()
                    {
                        SpotifyMusicLink = playlistJSON.href,
                        ImageURL = playlistJSON.images[0].url,
                        Title = playlistJSON.name,
                        Description = playlistJSON.description,
                        PlaylistId = playlistJSON.id,
                        TrackCount = playlistJSON.tracks.total,
                        FollowerCount = playlistJSON.followers.total
                    };
                    SetDescriptionAndGenre(playlist);
                    return playlist;
                }
                else
                {
                    Console.WriteLine("NO Data----------");
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            }
            return null;
        }
    }
}