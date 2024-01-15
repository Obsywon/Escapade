using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;

namespace EscapadeApi.Repositories
{
    public class PostRepository : Repository<Post>
    {
        public PostRepository(CosmosContext dbContext) : base(dbContext) { }
    }
}
