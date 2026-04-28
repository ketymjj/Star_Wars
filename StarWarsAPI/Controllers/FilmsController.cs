using Microsoft.AspNetCore.Mvc;
using StarWarsAPI.Services;

namespace StarWarsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilmsController : ControllerBase
{
    private readonly SwapiService _swapiService;

    public FilmsController(SwapiService swapiService)
    {
        _swapiService = swapiService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1)
    {
        var result = await _swapiService.GetFilmsAsync(page);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _swapiService.GetFilmAsync(id);
        return Ok(result);
    }
}
