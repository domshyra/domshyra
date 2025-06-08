using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Represents a controller for managing health status.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly ILogger<HealthController> _logger;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger"></param>
        public HealthController(ILogger<HealthController> logger)
        {
            _logger = logger;
        }


        /// <summary>
        /// returns status of the service
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetHealthStatus()
        {
            try
            {
                string str = "healthy";
                if (str == "healthy")
                {
                    return Ok("Service is healthy");
                }
                else
                {
                    return BadRequest("Service is not healthy");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("{message}", ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }


}
