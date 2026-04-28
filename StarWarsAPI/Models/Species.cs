using System.Text.Json.Serialization;

namespace StarWarsAPI.Models;

public class Species
{
    public string Name { get; set; } = string.Empty;
    public string Classification { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;

    [JsonPropertyName("average_height")]
    public string AverageHeight { get; set; } = string.Empty;

    [JsonPropertyName("skin_colors")]
    public string SkinColors { get; set; } = string.Empty;

    [JsonPropertyName("hair_colors")]
    public string HairColors { get; set; } = string.Empty;

    [JsonPropertyName("eye_colors")]
    public string EyeColors { get; set; } = string.Empty;

    [JsonPropertyName("average_lifespan")]
    public string AverageLifespan { get; set; } = string.Empty;

    public string? Homeworld { get; set; }
    public string Language { get; set; } = string.Empty;
    public List<string> People { get; set; } = new();
    public List<string> Films { get; set; } = new();
    public string Url { get; set; } = string.Empty;
}
