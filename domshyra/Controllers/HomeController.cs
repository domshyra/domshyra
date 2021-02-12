using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using domshyra.Models;

namespace domshyra.Controllers
{
    /// <summary>
    /// Baisic home controller
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Home page
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Projects page
        /// </summary>
        /// <returns></returns>
        public IActionResult Projects()
        {
            return View();
        }
        /// <summary>
        /// Intrests page
        /// </summary>
        /// <returns></returns>
        public ActionResult Interests()
        {
            IntrestModel model = new IntrestModel();

            return View(model);
        }
        /// <summary>
        /// About me page
        /// </summary>
        /// <returns></returns>
        public IActionResult AboutMe()
        {
            return View();
        }
        /// <summary>
        /// Skills page
        /// </summary>
        /// <returns></returns>
        public IActionResult Skills()
        {
            SkillsModel model = new SkillsModel();

            return View(model);
        }
    }
}