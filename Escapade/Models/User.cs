using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureFunctionEscapade.Models.Interfaces;

namespace AzureFunctionEscapade.Models
{
    public class User : Entity
    {
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

    }
}
