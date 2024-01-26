using System.Runtime.InteropServices;

namespace Escapade.Api.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string id)
        : base($"Erreur 404 : l'entité avec l'id {id} n'existe pas.")
        {
        }
    }
}
