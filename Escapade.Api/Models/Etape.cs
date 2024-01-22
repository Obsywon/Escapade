using Newtonsoft.Json;

public class Etape
{
    [JsonProperty(PropertyName = "PlaceId", Required = Required.Always)]
    public string PlaceId { get; set; }

    [JsonProperty(PropertyName = "Ordre")]
    public int Ordre { get; set; }
}