namespace Escapade.Api.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message)
        : base($"Erreur 400 : {message}.")
        {
        }
    }
}
