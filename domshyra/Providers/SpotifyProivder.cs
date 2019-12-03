using domshyra.Interfaces;
using domshyra.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace domshyra.Providers
{
    public class SpotifyProivder : ISpotifyProivder
    {
        private readonly IConfiguration _configuration;

        public SpotifyProivder(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        public async Task<List<PlaylistsModel>> GetPlaylists()
        {
            string authToken = GetAuthToken();

            List<PlaylistsModel> playlists = new List<PlaylistsModel>();

            List<string> playlistIds = await GetPlaylistIds(authToken);

            foreach (string playlistId in playlistIds)
            {
                PlaylistsModel model = await GetPlaylistInfoAsync(playlistId, authToken);

                AddAppleMusicURL(model);

                playlists.Add(model);
            }

            return playlists;
        }

        private void AddAppleMusicURL(PlaylistsModel model)
        {
            switch (model.SpotifyId)
            {
                //silver spurs
                case "3vaznYrm9fSPz3ENlcOR3e":
                    model.AppleMusicLink = "https://music.apple.com/us/playlist/silver-spurs-radio/pl.u-xlKY2uXJ4jE0";
                    break;                
                //silver spurs
                case "5IUjuF00hzonDk6MzuanBs":
                    model.AppleMusicLink = "https://music.apple.com/us/playlist/equanimity-radio/pl.u-GgN8RCbo4Mrl";
                    break;
                default:
                    break;
            };
        }

        
        private async Task<List<string>> GetPlaylistIds(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/domshyra/playlists?limit=40";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    //add the spotify auth 
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");

                    using (HttpResponseMessage res = await client.GetAsync(baseUrl))
                    {
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();

                            if (data != null)
                            {
                                dynamic playlistHeader = JObject.Parse(data);

                                SpotifyPlaylists playlists = JsonConvert.DeserializeObject<SpotifyPlaylists>(data);

                                return playlists.items.ToList()
                                    .Where(x => string.Equals(x.owner.display_name, "domshyra", StringComparison.OrdinalIgnoreCase))
                                    .Select(x => x.id).ToList();
                            }
                            else
                            {
                                Console.WriteLine("NO Data----------");
                            }
                        }
                    }
                }
            }

            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            }

            return new List<string>();
        }

        private string GetAuthToken()
        {
            string authToken;
            string client_id = _configuration["SecretValues:SecretClientID"];
            string client_secret = _configuration["SecretValues:SecretClientSecret"];

            //url to query
            string authTokenURL = "https://accounts.spotify.com/api/token";

            //request to get the access token

            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(authTokenURL);
            //endcode the clientId and client secret
            var plainTextBytes = Encoding.UTF8.GetBytes($"{client_id}:{client_secret}");
            string encodedAppInfo = Convert.ToBase64String(plainTextBytes);

            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            webRequest.Accept = "application/json";
            webRequest.Headers.Add($"Authorization: Basic {encodedAppInfo}");
            var request = ("grant_type=client_credentials");
            byte[] req_bytes = Encoding.ASCII.GetBytes(request);
            webRequest.ContentLength = req_bytes.Length;

            Stream strm = webRequest.GetRequestStream();
            strm.Write(req_bytes, 0, req_bytes.Length);
            strm.Close();


            HttpWebResponse resp = (HttpWebResponse)webRequest.GetResponse();

            using (Stream respStr = resp.GetResponseStream())
            {
                using (StreamReader rdr = new StreamReader(respStr, Encoding.UTF8))
                {
                    //should get back a string i can then turn to json and parse for accesstoken
                    var json = rdr.ReadToEnd();

                    authToken = JsonConvert.DeserializeObject<SpotifyAuth>(json).access_token;

                    rdr.Close();
                }
            }

            return authToken;
        }

        private async Task<PlaylistsModel> GetPlaylistInfoAsync(string playlistId, string authToken)
        {
            //spotify api https://api.spotify.com/v1/playlists/{playlist_id}
            string baseUrl = $"https://api.spotify.com/v1/playlists/{playlistId}";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    //add the spotify auth 
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");

                    using (HttpResponseMessage res = await client.GetAsync(baseUrl))
                    {
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();

                            if (data != null)
                            {
                                dynamic playlistJSON = JObject.Parse(data);

                                PlaylistsModel playlist = new PlaylistsModel()
                                {
                                    SpotifyMusicLink = playlistJSON.href,
                                    ImageURL = playlistJSON.images[0].url,
                                    Title = playlistJSON.name,
                                    Description = playlistJSON.description,
                                    SpotifyId = playlistJSON.id
                                };

                                playlist.Description = HttpUtility.HtmlDecode(playlist.Description);

                                return playlist;
                            }
                            else
                            {
                                Console.WriteLine("NO Data----------");
                            }
                        }
                    }
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
