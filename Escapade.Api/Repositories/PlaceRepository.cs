using Escapade.Api.Models;
using Escapade.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Escapade.Api.Repositories
{
    public class PlaceRepository : Repository<Place>, IRepositoryPlace
    {
        public PlaceRepository(CosmosContext dbContext) : base(dbContext) { }

        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByAllUser()
        {
            return await _dbContext.Set<PlaceAddedByUser>().ToListAsync();
        }

        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByUser(string userId)
        {
            return await _dbContext.Set<PlaceAddedByUser>().Where(place => place.UserId == userId).ToListAsync();
        }
    }
}
