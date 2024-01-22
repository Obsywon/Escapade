using EscapadeApi.Models.Interfaces;
using Newtonsoft.Json;

public class Trajet : Entity
{
    [JsonProperty(PropertyName = "UserId", Required = Required.Always)]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "Etapes")]
    public List<Etape> Etapes { get; set; }
}