using Escapade.Api.Exceptions;
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
        [Error(typeof(VerifyFirebaseTokenException))]
        public async Task<IEnumerable<User>> GetAllUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllAsync();

        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<User> GetUserByIdAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string id, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(id);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<User> GetUserByEmailAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string email, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetUserByEmailAsync(email);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<ICollection<Place>> GetAllFavoritePlacesAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllFavoritePlacesAsync(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<ICollection<Post>> GetAllPostByUserIdAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPostByUserIdAsync(userId);
        }
    }
}
