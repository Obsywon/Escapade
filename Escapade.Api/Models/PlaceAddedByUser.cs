using Newtonsoft.Json;

public class PlaceAddedByUser : Place
{
    [JsonProperty(PropertyName = "EnregistrePar", Required = Required.Always)]
    public string UserId { get; set; }
}