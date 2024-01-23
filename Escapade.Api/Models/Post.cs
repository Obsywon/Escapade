using EscapadeApi.Models.Interfaces;
using Newtonsoft.Json;

public class Post
{
    [JsonProperty(PropertyName = "Titre", Required = Required.Always)]
    public string Title { get; set; }

    [JsonProperty(PropertyName = "Description", Required = Required.Always)]
    public string Description { get; set; }

    [JsonProperty(PropertyName = "Photo")]
    public string ?Photo { get; set; }

    [JsonProperty(PropertyName = "UserId", Required = Required.Always)]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "PlaceId", Required = Required.Always)]
    public string PlaceId { get; set; }
}
