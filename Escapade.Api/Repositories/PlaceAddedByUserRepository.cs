using Microsoft.EntityFrameworkCore;
using Escapade.Api.Repositories.Interfaces;
using Escapade.Api.Models;

namespace Escapade.Api.Repositories
{
    public class PlaceAddedByUserRepository : Repository<PlaceAddedByUser>, IRepositoryPlaceAddedByUser
    {
        public PlaceAddedByUserRepository(CosmosContext dbContext) : base(dbContext) { }

        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByAllUser()
        {
            return await _dbContext.Set<PlaceAddedByUser>().ToListAsync();
        }

    }
}
