using EscapadeApi.Models.Interfaces;
using EscapadeApi.Models;
using Newtonsoft.Json;

public class User : Entity
{
    [JsonProperty(PropertyName = "Nom", Required = Required.Always)]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "Prenom", Required = Required.Always)]
    public string LastName { get; set; }

    [JsonProperty(PropertyName = "Sexe")]
    public string ?Gender { get; set; }

    [JsonProperty(PropertyName = "DateDeNaissance", Required = Required.Always)]
    public DateTime BirthDate { get; set; }

    [JsonProperty(PropertyName = "Email", Required = Required.Always)]
    public string Email { get; set; }

    [JsonProperty(PropertyName = "Password", Required = Required.Always)]
    public string Password { get; set; }

    [JsonProperty(PropertyName = "FirebaseToken")]
    public string ?Token { get; set; }

    [JsonProperty(PropertyName = "Posts")]
    public ICollection<Post>? Posts { get; set; }

    [JsonProperty(PropertyName = "PlacesAddedByUser")]
    public ICollection<PlaceAddedByUser>? PlacesAddedByUser { get; set; }

    [JsonProperty(PropertyName = "FavoritesPlaces")]
    public ICollection<FavoritePlace> ?FavoritePlaces { get; set; }
}