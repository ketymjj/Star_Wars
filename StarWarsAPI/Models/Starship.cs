using System.Text.Json.Serialization;

namespace StarWarsAPI.Models;

public class Starship
{
    public string Name { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;

    [JsonPropertyName("cost_in_credits")]
    public string CostInCredits { get; set; } = string.Empty;

    public string Length { get; set; } = string.Empty;

    [JsonPropertyName("max_atmosphering_speed")]
    public string MaxAtmospheringSpeed { get; set; } = string.Empty;

    public string Crew { get; set; } = string.Empty;
    public string Passengers { get; set; } = string.Empty;

    [JsonPropertyName("cargo_capacity")]
    public string CargoCapacity { get; set; } = string.Empty;

    public string Consumables { get; set; } = string.Empty;

    [JsonPropertyName("hyperdrive_rating")]
    public string HyperdriveRating { get; set; } = string.Empty;

    public string MGLT { get; set; } = string.Empty;

    [JsonPropertyName("starship_class")]
    public string StarshipClass { get; set; } = string.Empty;

    public List<string> Pilots { get; set; } = new();
    public List<string> Films { get; set; } = new();
    public string Url { get; set; } = string.Empty;
}
