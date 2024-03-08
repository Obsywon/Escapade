using Escapade.Api.Models.Interfaces;
using Newtonsoft.Json;

namespace Escapade.Api.Models
{
    public class Place : Entity
    {
        [JsonProperty(PropertyName = "Nom", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Description")]
        public string? Description { get; set; }

        [JsonProperty(PropertyName = "CoordonneesGeographiques", Required = Required.Always)]
        public GeographicCoordinate GeographicCoordinate { get; set; }
    }
}