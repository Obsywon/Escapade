using Newtonsoft.Json;
using EscapadeApi.Models.Interfaces;

namespace EscapadeApi.Models
{
    public class User : Entity
    {

        [JsonProperty(PropertyName = "Prenom", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Nom", Required = Required.Always)]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "Sexe")]
        public string Gender { get; set; }

        [JsonProperty(PropertyName = "Email", Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Mot De Passe", Required = Required.Always)]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "Date De Naissance", Required = Required.Always)]
        public DateTime BirthDate { get; set; }

        [JsonProperty(PropertyName = "Firebase Token")]
        public string Token { get; set; }
    }
}
