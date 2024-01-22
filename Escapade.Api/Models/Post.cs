using EscapadeApi.Models.Interfaces;
using Newtonsoft.Json;

namespace EscapadeApi.Models
{
    public class Post : Entity
    {
        [JsonProperty(PropertyName = "Titre", Required = Required.Always)]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "Description", Required = Required.Always)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "Photo")]
        public string Picture { get; set; }

        [JsonProperty(PropertyName = "Utilisateur", Required = Required.Always)]
        public string UserId { get; set; }
    }
}
