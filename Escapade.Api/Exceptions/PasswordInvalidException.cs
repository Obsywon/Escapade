namespace Escapade.Api.Exceptions
{
    public class PasswordInvalidException : Exception
    {
        public PasswordInvalidException(string password)
        : base($"Le mot de passe {password} n'est pas valide. Il doit contenir au moins 8 caractères dont 1 chiffre et 1 lettre capitale.")
        {
        }
    }
}
