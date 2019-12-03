using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace domshyra.Models
{
    public class SpotifyPlaylistHeader
    {
        public string id { get; set; }
        public bool @public { get; set; }
        public Owner owner { get; set; }
    }

    public class Owner
    {
        public string display_name { get; set; }
    }
}
