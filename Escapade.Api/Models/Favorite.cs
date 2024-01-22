using EscapadeApi.Models.Interfaces;
using Newtonsoft.Json;

public class Favorite : Entity
{
    [JsonProperty(PropertyName = "UserId", Required = Required.Always)]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "PlaceId", Required = Required.Always)]
    public string PlaceId { get; set; }
}
