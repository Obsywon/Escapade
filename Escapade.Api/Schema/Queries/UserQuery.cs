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

        public async Task<IEnumerable<User>> GetAllUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            return await service.GetAllAsync();

        }

        [Error(typeof(NotFoundException))]
        public async Task<User> GetUserByIdAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

        [Error(typeof(NotFoundException))]
        public async Task<User> GetUserByEmailAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string email, CancellationToken cancellation)
        {
            return await service.GetUserByEmailAsync(email);
        }

        [Error(typeof(NotFoundException))]
        public async Task<ICollection<Place>> GetAllFavoritePlacesAsync(string userId, IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            return await service.GetAllFavoritePlacesAsync(userId);
        }

        [Error(typeof(NotFoundException))]
        public async Task<ICollection<Post>> GetAllPostByUserIdAsync(string userId, IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            return await service.GetAllPostByUserIdAsync(userId);
        }
    }
}
