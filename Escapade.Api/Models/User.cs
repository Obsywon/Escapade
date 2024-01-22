using Newtonsoft.Json;
using EscapadeApi.Models.Interfaces;
using System.Diagnostics;

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

        [JsonProperty(PropertyName = "MotDePasse", Required = Required.Always)]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "DateDeNaissance", Required = Required.Always)]
        public DateTime BirthDate { get; set; }

        [JsonProperty(PropertyName = "FirebaseToken")]
        public string Token { get; set; }

        [JsonProperty(PropertyName = "Favorites")]
        public List<Favorite> Favorites { get; set; }

        [JsonProperty(PropertyName = "Posts")]
        public List<Post> Posts { get; set; }

        [JsonProperty(PropertyName = "Trajets")]
        public List<Trajet> Trajets { get; set; }
    }
}
