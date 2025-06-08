using System.Web;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Password controller
    /// </summary> 
    [ApiController]
    [Route("[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly ILogger<PasswordController> _logger;
        private readonly string _password;


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="configuration"></param>
        public PasswordController(ILogger<PasswordController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _password = configuration["SitePassword"] ?? throw new ArgumentNullException("SitePassword");
        }

        /// <summary>
        /// gets all blobs in the path
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]

        public ActionResult Enter([FromBody] string password)
        {

            if (password == _password)
            {
                return Ok();
            }
            return BadRequest("Incorrect password");
        }

    }

}
