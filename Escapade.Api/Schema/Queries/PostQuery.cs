using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class PostQuery
    {
        public PostQuery() : base() { }

        public async Task<IEnumerable<Post>> GetAllPostAsync(IPostService service, CancellationToken cancellation)
        {
            return await service.GetAllAsync();
        }

        public async Task<Post> GetPostById(IPostService service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

    }
}
