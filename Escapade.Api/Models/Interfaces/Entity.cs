using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace EscapadeApi.Models.Interfaces
{
    public abstract class Entity : IEntity
    {
        [Key]
        public Guid Id { get; set; }
    }
}
