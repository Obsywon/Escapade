using EscapadeApi.Models.Interfaces;
using Newtonsoft.Json;

public class Place : Entity
{
    [JsonProperty(PropertyName = "Nom", Required = Required.Always)]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "Description")]
    public string? Description { get; set; }

    [JsonProperty(PropertyName = "CoordonneesGeographiques", Required = Required.Always)]
    public string Coordinates { get; set; }

}