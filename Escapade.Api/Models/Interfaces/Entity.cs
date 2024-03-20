using System.ComponentModel.DataAnnotations;

namespace Escapade.Api.Models.Interfaces
{
    public abstract class Entity : IEntity
    {
        [Key]
        public string Id { get; set; }
    }
}
