namespace Escapade.Api.Exceptions
{
    public class EmailInvalidFormatException : Exception
    {
        public EmailInvalidFormatException(string email)
        : base($"L'email {email} n'est pas valide. Veuillez renseigner un email selon le format : johndoe@email.fr")
        {
        }
    }
}
