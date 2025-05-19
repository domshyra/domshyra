using System.Net;
using System.Text;
using System.Web;
using Interfaces;
using Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Providers
{
    /// <inheritdoc/>
    public class SpotifyService : ISpotifyService
    {
        private readonly IConfiguration _configuration;
        private readonly string _username;

        /// <inheritdoc/>
        public SpotifyService(IConfiguration Configuration)
        {
            _configuration = Configuration;
            _username = _configuration["Spotify:Username"];
        }

        /// <inheritdoc/>
        public async Task<List<PlaylistsModel>> GetPlaylists()
        {
            string authToken = GetAuthToken();

            List<PlaylistsModel> playlists = await GetPlaylists(authToken);

            return playlists.OrderBy(x => x.Title).ToList();
        }

        public async Task<PlaylistsModel> GetPlaylist(string playlistId)
        {
            string authToken = GetAuthToken();

            return await GetPlaylistInfoAsync(playlistId, authToken);
        }

        private async Task<List<string>> GetPlaylistIds(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/{_username}/playlists?limit=40";

            try
            {
                using HttpClient client = new();
                //add the spotify auth 
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");

                using HttpResponseMessage res = await client.GetAsync(baseUrl);
                using HttpContent content = res.Content;
                string data = await content.ReadAsStringAsync();

                if (data != null)
                {
                    dynamic playlistHeader = JObject.Parse(data);

                    //lets get these items into a list I can parse
                    SpotifyPlaylists playlists = JsonConvert.DeserializeObject<SpotifyPlaylists>(data);

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

            return new List<string>();
        }

        private async Task<List<PlaylistsModel>> GetPlaylists(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/{_username}/playlists?limit=40";

            try
            {
                using HttpClient client = new();
                //add the spotify auth 
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");

                using HttpResponseMessage res = await client.GetAsync(baseUrl);
                using HttpContent content = res.Content;
                string data = await content.ReadAsStringAsync();

                if (data != null)
                {
                    dynamic playlistHeader = JObject.Parse(data);

                    //lets get these items into a list I can parse
                    //TODO query tracks for more info and get follower count
                    SpotifyPlaylists playlists = JsonConvert.DeserializeObject<SpotifyPlaylists>(data);

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
        private string GetAuthToken()
        {
            //https://developer.spotify.com/documentation/general/guides/authorization-guide/
            string authToken;
            string client_id = _configuration["Spotify:ClientId"];
            string client_secret = _configuration["Spotify:ClientSecret"];

            //url to query
            string authTokenURL = "https://accounts.spotify.com/api/token";

            //request to get the access token

            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(authTokenURL);
            //endcode the clientId and client secret
            byte[] plainTextBytes = Encoding.UTF8.GetBytes($"{client_id}:{client_secret}");
            string encodedAppInfo = Convert.ToBase64String(plainTextBytes);

            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            webRequest.Accept = "application/json";
            webRequest.Headers.Add($"Authorization: Basic {encodedAppInfo}");
            string request = ("grant_type=client_credentials");
            byte[] req_bytes = Encoding.ASCII.GetBytes(request);
            webRequest.ContentLength = req_bytes.Length;

            Stream strm = webRequest.GetRequestStream();
            strm.Write(req_bytes, 0, req_bytes.Length);
            strm.Close();


            try
            {
                if (string.IsNullOrEmpty(client_id) || string.IsNullOrEmpty(client_secret))
                {
                    throw new NullReferenceException($"{nameof(client_id)} is {client_id}, and {nameof(client_secret)} is {client_secret}. These both need to be populated. Make sure client secrets are updated.");
                }
                HttpWebResponse resp = (HttpWebResponse)webRequest.GetResponse();

                using (Stream respStr = resp.GetResponseStream())
                {
                    using StreamReader rdr = new StreamReader(respStr, Encoding.UTF8);
                    //should get back a string i can then turn to json and parse for accesstoken
                    string json = rdr.ReadToEnd();

                    authToken = JsonConvert.DeserializeObject<SpotifyAuth>(json).access_token;

                    rdr.Close();
                }

                return authToken;
            }
            catch (WebException e)
            {
                //Make sure clientId and Secrets are set
                Console.WriteLine(e.Message);
                throw;
            }
        }

        private static async Task<PlaylistsModel> GetPlaylistInfoAsync(string playlistId, string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/playlists/{playlistId}";

            try
            {
                using HttpClient client = new();
                //add the spotify auth 
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