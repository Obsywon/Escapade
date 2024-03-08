using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using EscapadeApi.Services.Interfaces;
using FirebaseAdmin.Auth;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class UserQuery 
    {

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<IEnumerable<User>> GetAllUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllAsync();

        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        [Error(typeof(UserIdNotFoundError))]
        public async Task<User> GetUserByIdAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string id, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(id);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        [Error(typeof(UserEmailNotFoundError))]
        public async Task<User> GetUserByEmailAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string email, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetUserByEmailAsync(email);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Place>> GetAllFavoritePlacesAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllFavoritePlacesAsync(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Post>> GetAllPostAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPostByUserIdAsync(userId);
        }
    }
}
