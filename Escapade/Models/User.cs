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
        [Column("prenom")] 
        [Required]
        [MinLength(3)]
        public string Name { get; set; }

        [Column("nom")]
        [Required]
        [MinLength(3)]
        public string LastName { get; set; }

        [Column("genre")]
        public string Genre { get; set; }

        [Column("email")]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Column("mot_de_passe")]
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$")]
        public string Password { get; set; }

        [Column("date_de_naissance")]
        [Required]
        public string BirthDate { get; set; }

    }
}
