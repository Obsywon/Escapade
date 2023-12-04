using AzureFunctionEscapade.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Models
{
    public class Post : Entity
    {
        [Column("titre")]
        [Required]
        [MinLength(5)]
        public string Title { get; set; }

        [Column("description")]
        [Required]
        [MinLength(5)]
        public string Description { get; set; }

        [Column("user_id")]
        [Required]
        public string UserId { get; set; }
    }
}
