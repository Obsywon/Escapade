namespace Escapade.Api.Exceptions
{
    public class BirthDateInvalidFormatException : Exception
    {
        public BirthDateInvalidFormatException(DateTime birthDate)
        : base($"La date de naissance {birthDate} n'est pas valide. Veuillez vérifiez ce champ.")
        {
        }
    }
}
