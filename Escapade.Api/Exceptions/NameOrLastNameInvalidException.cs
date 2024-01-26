namespace Escapade.Api.Exceptions
{
    public class NameOrLastNameInvalidFormatException : Exception
    {
        public NameOrLastNameInvalidFormatException(string nameOrLastname)
        : base($"Le champ {nameOrLastname} n'est pas valide. Il doit contenir au moins 3 caractères.")
        {
        }
    }
}
