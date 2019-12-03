using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using domshyra.Models;
using domshyra.Interfaces;
using System.Net;
using System.Text;
using System.IO;

namespace domshyra.Providers
{
    public class SpotifyProivder : ISpotifyProivder
    {
        public List<PlaylistsModel> GetPlaylists()
        {
            return new List<PlaylistsModel>();
        }

        //TODO: automate this code but for now lets hard code it as a test
        public List<string> GetPlaylistIds()
        {
            return new List<string>()
            {
                "3vaznYrm9fSPz3ENlcOR3e"
            };
        }

        public string GetAuthToken()
        {
            string authToken;

            string url5 = "https://accounts.spotify.com/api/token";

            //request to get the access token

            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url5);

            var plainTextBytes = Encoding.UTF8.GetBytes($"{client_id}:{client_secret}");
            string encodedSecrets = Convert.ToBase64String(plainTextBytes);

            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            webRequest.Accept = "application/json";
            webRequest.Headers.Add("Authorization: Basic" + );
            var request = ("grant_type=client_credentials");
            byte[] req_bytes = Encoding.ASCII.GetBytes(request);
            webRequest.ContentLength = req_bytes.Length;

            Stream strm = webRequest.GetRequestStream();
            strm.Write(req_bytes, 0, req_bytes.Length);
            strm.Close();


            HttpWebResponse resp = (HttpWebResponse)webRequest.GetResponse();

            String json = "";
            using (Stream respStr = resp.GetResponseStream())
            {
                using (StreamReader rdr = new StreamReader(respStr, Encoding.UTF8))
                {
                    //should get back a string i can then turn to json and parse for accesstoken
                    json = rdr.ReadToEnd();
                    rdr.Close();
                }
            }

            authToken = json;

            return authToken;
        }

        public async Task<string> GetPlaylistInfoAsync(string playlistId, string authToken)
        {
            //spotify api https://api.spotify.com/v1/playlists/{playlist_id}
            string baseUrl = $"https://api.spotify.com/v1/playlists/{playlistId}";

            try
            {


                using (HttpClient client = new HttpClient())
                {
                    //add the spotify auth 
                    client.DefaultRequestHeaders.Add("Authorization", authToken);

                    using (HttpResponseMessage res = await client.GetAsync(baseUrl))
                    {
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();

                            if (data != null)
                            {
                                var x = JObject.Parse(data);

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

            return "x";
        }
    }
}
