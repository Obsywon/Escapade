namespace Escapade.Api.Exceptions
{
    public class VerifyFirebaseTokenException : Exception
    {
        public VerifyFirebaseTokenException(string message)
        : base($"Erreur 500, Impossible de vérifier le token fournit dans le header de l'API : {message} ")
        {
        }
    }
}
