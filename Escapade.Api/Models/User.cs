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
        public string BirthDate { get; set; }
    }
}
