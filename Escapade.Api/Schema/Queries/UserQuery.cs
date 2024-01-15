using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class UserQuery 
    {
        public UserQuery() : base() { }

        public async Task<IEnumerable<User>> GetAllUserAsync(IUserService service, CancellationToken cancellation)
        {
            return await service.GetAllAsync();
        }

        public async Task<User> GetUserById(IUserService service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

        public async Task<User> GetUserByEmail(IUserService service, string email, CancellationToken cancellation)
        {
            return await service.GetUserByEmailAsync(email);
        }

    }
}
