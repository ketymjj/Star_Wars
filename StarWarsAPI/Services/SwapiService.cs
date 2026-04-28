using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using StarWarsAPI.Models;

namespace StarWarsAPI.Services;

public class SwapiService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(30);
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public SwapiService(HttpClient httpClient, IMemoryCache cache)
    {
        _httpClient = httpClient;
        _cache = cache;
    }

    public async Task<SwapiResponse<Person>> GetPeopleAsync(int page = 1)
        => await GetCachedAsync<SwapiResponse<Person>>($"people/?page={page}");

    public async Task<Person> GetPersonAsync(int id)
        => await GetCachedAsync<Person>($"people/{id}/");

    public async Task<SwapiResponse<Film>> GetFilmsAsync(int page = 1)
        => await GetCachedAsync<SwapiResponse<Film>>($"films/?page={page}");

    public async Task<Film> GetFilmAsync(int id)
        => await GetCachedAsync<Film>($"films/{id}/");

    public async Task<SwapiResponse<Planet>> GetPlanetsAsync(int page = 1)
        => await GetCachedAsync<SwapiResponse<Planet>>($"planets/?page={page}");

    public async Task<Planet> GetPlanetAsync(int id)
        => await GetCachedAsync<Planet>($"planets/{id}/");

    public async Task<SwapiResponse<Starship>> GetStarshipsAsync(int page = 1)
        => await GetCachedAsync<SwapiResponse<Starship>>($"starships/?page={page}");

    public async Task<Starship> GetStarshipAsync(int id)
        => await GetCachedAsync<Starship>($"starships/{id}/");

    public async Task<SwapiResponse<Vehicle>> GetVehiclesAsync(int page = 1)
        => await GetCachedAsync<SwapiResponse<Vehicle>>($"vehicles/?page={page}");

    public async Task<Vehicle> GetVehicleAsync(int id)
        => await GetCachedAsync<Vehicle>($"vehicles/{id}/");

    public async Task<SwapiResponse<Species>> GetSpeciesListAsync(int page = 1)
        => await GetCachedAsync<SwapiResponse<Species>>($"species/?page={page}");

    public async Task<Species> GetSpeciesByIdAsync(int id)
        => await GetCachedAsync<Species>($"species/{id}/");

    private async Task<T> GetCachedAsync<T>(string endpoint)
    {
        if (_cache.TryGetValue(endpoint, out T? cached) && cached != null)
            return cached;

        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<T>(json, _jsonOptions)
            ?? throw new InvalidOperationException($"Failed to deserialize response from {endpoint}");

        _cache.Set(endpoint, result, CacheDuration);
        return result;
    }
}
