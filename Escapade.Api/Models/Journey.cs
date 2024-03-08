using EscapadeApi.Models.Interfaces;
using Newtonsoft.Json;

namespace Escapade.Api.Models
{
    public class Journey : Entity
    {
        [JsonProperty(PropertyName = "ParDefaut")]
        public bool Default { get; set; }

        [JsonProperty(PropertyName = "LieuDepart", Required = Required.Always)]
        public Place DeparturePlace{ get; set; }

        [JsonProperty(PropertyName = "LieuArrive", Required = Required.Always)]
        public Place ArrivalPlace { get; set; }

        [JsonProperty(PropertyName = "LieuATraverser", Required = Required.Always)]
        public ICollection<Place> PlacesToCross { get; set; }
    }
}
