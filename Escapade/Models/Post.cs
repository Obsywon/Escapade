using AzureFunctionEscapade.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AzureFunctionEscapade.Models
{
    public class Post : Entity
    {
        [JsonProperty(PropertyName = "Titre", Required = Required.Always)]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "Description", Required = Required.Always)]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "Photo")]
        public string Picture { get; set; }

        //[JsonProperty(PropertyName = "Utilisateur", Required = Required.Always)]
        //public User User { get; set; }
    }
}
