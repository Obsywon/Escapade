using Newtonsoft.Json;
using Escapade.Api.Models.Interfaces;

namespace Escapade.Api.Models
{
    public class User : Entity
    {
        [JsonProperty(PropertyName = "Nom", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Prenom", Required = Required.Always)]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "Ville")]
        public string? City { get; set; }

        [JsonProperty(PropertyName = "Pays")]
        public string? Country { get; set; }

        [JsonProperty(PropertyName = "NumeroTelephone")]
        public string? PhoneNumber { get; set; }

        [JsonProperty(PropertyName = "Description")]
        public string? Description { get; set; }

        [JsonProperty(PropertyName = "Sexe")]
        public string? Gender { get; set; }

        [JsonProperty(PropertyName = "DateDeNaissance", Required = Required.Always)]
        public DateTime BirthDate { get; set; }

        [JsonProperty(PropertyName = "Email", Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Password", Required = Required.Always)]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "FirebaseToken")]
        public string? Token { get; set; }

        [JsonProperty(PropertyName = "Posts")]
        public ICollection<Post>? Posts { get; set; } = new List<Post>();

        [JsonProperty(PropertyName = "PlacesAddedByUser")]
        public ICollection<Place>? PlacesAddedByUser { get; set; } = new List<Place>();

        [JsonProperty(PropertyName = "FavoritesPlaces")]
        public ICollection<FavoritePlace>? FavoritePlaces { get; set; } = new List<FavoritePlace>();
    }
}