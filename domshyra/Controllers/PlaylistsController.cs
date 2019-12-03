using domshyra.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace domshyra.Controllers
{
    public class PlaylistsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //private List<PlaylistsModel> GetPlaylistsList()
        //{
        //    return new List<PlaylistsModel>()
        //    {
        //        new PlaylistsModel()
        //        {
        //            Title = ""
        //        }
        //    }
        //}
    }
}