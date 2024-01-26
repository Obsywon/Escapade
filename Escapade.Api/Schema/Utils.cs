using Escapade.Api.Exceptions;
using FirebaseAdmin.Auth;

namespace Escapade.Api.Schema
{
    public class Utils
    {
        public static async Task<string> VerifyFirebaseToken(IHttpContextAccessor httpContextAccessor)
        {
            try
            {
                // Récupérer le token depuis l'en-tête Authorization
                string authorizationHeader = httpContextAccessor.HttpContext.Request.Headers["Authorization"];

                // Extraire le token en enlevant "Bearer " du début
                string token = authorizationHeader.Substring("Bearer ".Length);

                // Utiliser le token comme nécessaire
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

                return decodedToken.Uid;
            }
            catch (Exception ex)
            {
                throw new VerifyFirebaseTokenException(ex.Message);
            }
           
        }
    }
}
