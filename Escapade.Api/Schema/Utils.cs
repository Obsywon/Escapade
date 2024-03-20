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
                if (authorizationHeader == null || authorizationHeader.Length <= "Bearer ".Length)
                {
                    throw new VerifyFirebaseTokenException();
                }
                string token = authorizationHeader["Bearer ".Length..];
                Console.WriteLine(token);



                // Utiliser le token comme nécessaire
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

                return decodedToken.Uid;
            }
            catch (Exception ex)
            {
                throw new VerifyFirebaseTokenException();
            }
           
        }
    }
}
