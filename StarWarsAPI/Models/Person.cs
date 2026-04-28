using System.Text.Json.Serialization;

namespace StarWarsAPI.Models;

public class Person
{
    public string Name { get; set; } = string.Empty;
    public string Height { get; set; } = string.Empty;
    public string Mass { get; set; } = string.Empty;

    [JsonPropertyName("hair_color")]
    public string HairColor { get; set; } = string.Empty;

    [JsonPropertyName("skin_color")]
    public string SkinColor { get; set; } = string.Empty;

    [JsonPropertyName("eye_color")]
    public string EyeColor { get; set; } = string.Empty;

    [JsonPropertyName("birth_year")]
    public string BirthYear { get; set; } = string.Empty;

    public string Gender { get; set; } = string.Empty;
    public string Homeworld { get; set; } = string.Empty;
    public List<string> Films { get; set; } = new();
    public List<string> Species { get; set; } = new();
    public List<string> Vehicles { get; set; } = new();
    public List<string> Starships { get; set; } = new();
    public string Url { get; set; } = string.Empty;
}
