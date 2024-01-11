using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Schema.Mutations
{
    public class Mutation
    {
        public async Task<User> Search(IService<User> service)
        {
            return await service.GetByIdAsync(new Guid().ToString());
        }
    }
}
