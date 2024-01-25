using EscapadeApi.Services.Interfaces;
using FirebaseAdmin.Auth;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class UserQuery 
    {
        public UserQuery() : base() { }

        [Authorize]
        public async Task<IEnumerable<User>> GetAllUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //// Récupérer le token depuis l'en-tête Authorization
            //string authorizationHeader = httpContextAccessor.HttpContext.Request.Headers["Authorization"];

            //// Extraire le token en enlevant "Bearer " du début
            //string token = authorizationHeader.Substring("Bearer ".Length);

            //// Utiliser le token comme nécessaire
            //FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            //string uid = decodedToken.Uid;

            //Utiliser uid comme nécessaire, par exemple, pour récupérer les utilisateurs
            return await service.GetAllAsync();
            
        }

        [Authorize]
        public async Task<User> GetUserByIdAsync(IUserService service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

        [Authorize]
        public async Task<User> GetUserByEmailAsync(IUserService service, string email, CancellationToken cancellation)
        {
            return await service.GetUserByEmailAsync(email);
        }

        [Authorize]
        public async Task<ICollection<Place>> GetAllFavoritePlacesAsync(IUserService service, ClaimsPrincipal claimsPrincipal, CancellationToken cancellation)
        {        
            return await service.GetAllFavoritePlacesAsync(claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        [Authorize]
        public async Task<ICollection<Post>> GetAllPostByUserIdAsync(IUserService service, ClaimsPrincipal claimsPrincipal, CancellationToken cancellation)
        {
            return await service.GetAllPostByUserIdAsync(claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier));
        }
    }
}
