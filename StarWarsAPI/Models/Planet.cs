using System.Text.Json.Serialization;

namespace StarWarsAPI.Models;

public class Planet
{
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("rotation_period")]
    public string RotationPeriod { get; set; } = string.Empty;

    [JsonPropertyName("orbital_period")]
    public string OrbitalPeriod { get; set; } = string.Empty;

    public string Diameter { get; set; } = string.Empty;
    public string Climate { get; set; } = string.Empty;
    public string Gravity { get; set; } = string.Empty;
    public string Terrain { get; set; } = string.Empty;

    [JsonPropertyName("surface_water")]
    public string SurfaceWater { get; set; } = string.Empty;

    public string Population { get; set; } = string.Empty;
    public List<string> Residents { get; set; } = new();
    public List<string> Films { get; set; } = new();
    public string Url { get; set; } = string.Empty;
}
