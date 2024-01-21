using System.ComponentModel.DataAnnotations;

namespace EscapadeApi.Models.Interfaces
{
    public abstract class Entity : IEntity
    {
        [Key]
        public string Id { get; set; }
    }
}
