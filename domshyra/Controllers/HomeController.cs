using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using domshyra.Models;

namespace domshyra.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View();
        }
        public ActionResult Intrests()
        {
            IntrestModel model = new IntrestModel();

            return View(model);
        }
        public IActionResult AboutMe()
        {
            return View();
        }
        public IActionResult Skills()
        {
            return View();
        }
    }
}