﻿using domshyra.Interfaces;
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
    /// <inheritdoc/>
    public class SpotifyProivder : ISpotifyProivder
    {
        private readonly IConfiguration _configuration;

        /// <inheritdoc/>
        public SpotifyProivder(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        /// <inheritdoc/>
        public async Task<List<PlaylistsModel>> GetPlaylists()
        {
            string authToken = GetAuthToken();

            List<PlaylistsModel> playlists = await GetPlaylists(authToken);

            foreach (PlaylistsModel model in playlists)
            {
                AddAppleMusicURL(model);
            }

            return playlists.OrderBy(x => x.Title).ToList();
        }

        /// <summary>
        /// Used to match the apple music urls to the spotify ones
        /// </summary>
        /// <param name="model"></param>
        private static void AddAppleMusicURL(PlaylistsModel model)
        {
            switch (model.SpotifyId)
            {
                //silver spurs
                case "3vaznYrm9fSPz3ENlcOR3e":
                    model.AppleMusicLink = "https://music.apple.com/us/playlist/silver-spurs-radio/pl.u-xlKY2uXJ4jE0";
                    break;                
                //equ radio
                case "5IUjuF00hzonDk6MzuanBs":
                    model.AppleMusicLink = "https://music.apple.com/us/playlist/equanimity-radio/pl.u-GgN8RCbo4Mrl";
                    break;
                //sticky fingers radio
                case "4WFRmZdZ5RfUvRDC9ijOjM":
                    model.AppleMusicLink = "https://music.apple.com/us/playlist/sticky-fingers-radio/pl.u-8adAahNvzkZG";
                    break;
                default:
                    break;
            };
        }

        
        private static async Task<List<string>> GetPlaylistIds(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/domshyra/playlists?limit=40";

            try
            {
                using HttpClient client = new HttpClient();
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
                        .Where(x => string.Equals(x.owner.display_name, "domshyra", StringComparison.OrdinalIgnoreCase) && x.@public)
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

        private static async Task<List<PlaylistsModel>> GetPlaylists(string authToken)
        {
            string baseUrl = $"https://api.spotify.com/v1/users/domshyra/playlists?limit=40";

            try
            {
                using HttpClient client = new HttpClient();
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
                        .Where(x => string.Equals(x.owner.display_name, "domshyra", StringComparison.OrdinalIgnoreCase) && x.@public)
                        .Select(playlist => new PlaylistsModel()
                        {
                            Description = playlist.description,
                            ImageURL = playlist.images[0].url,
                            SpotifyId = playlist.id,
                            Title = playlist.name,
                            TrackCount = playlist.tracks.total,
                            SpotifyMusicLink = playlist.external_urls.spotify
                        }).ToList();

                    //decode the html
                    foreach (PlaylistsModel playlistModel in playlistsModels)
                    {
                        playlistModel.Description = HttpUtility.HtmlDecode(playlistModel.Description);
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
        /// Get the auth token for my queries since a user isn't authenticating it 
        /// </summary>
        /// <returns></returns>
        private string GetAuthToken()
        {
            //https://developer.spotify.com/documentation/general/guides/authorization-guide/
            string authToken;
            string client_id = _configuration["SecretValues:SecretClientID"];
            string client_secret = _configuration["SecretValues:SecretClientSecret"];

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
            //spotify api https://api.spotify.com/v1/playlists/{playlist_id}
            string baseUrl = $"https://api.spotify.com/v1/playlists/{playlistId}";

            try
            {
                using HttpClient client = new HttpClient();
                //add the spotify auth 
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {authToken}");

                using HttpResponseMessage res = await client.GetAsync(baseUrl);
                using HttpContent content = res.Content;
                string data = await content.ReadAsStringAsync();

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

            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            }

            return null;
        }
    }
}
