using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;

namespace EscapadeApi.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(CosmosContext dbContext) : base(dbContext) { }

    }
}
