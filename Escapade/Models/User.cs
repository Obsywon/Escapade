using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureFunctionEscapade.Models.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AzureFunctionEscapade.Models
{
    public class User : Entity
    {
        [JsonProperty(PropertyName = "id", NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "prenom", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "nom", Required = Required.Always)]
        public string LastName { get; set; }

        [JsonProperty(PropertyName = "sexe")]
        public string Gender { get; set; }

        [JsonProperty(PropertyName = "email", Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "mot_de_passe", Required = Required.Always)]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "date_de_naissance", Required = Required.Always)]
        public string BirthDate { get; set; }

        public User(string id, string name, string lastName, string gender, string email, string password, string birthDate)
        {
            Id = id;
            Name = name;
            LastName = lastName;
            Gender = gender;
            Email = email;
            Password = password;
            BirthDate = birthDate;
        }
    }
}
