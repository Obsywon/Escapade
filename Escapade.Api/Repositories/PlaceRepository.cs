using Escapade.Api.Models;
using Escapade.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Escapade.Api.Repositories
{
    public class PlaceRepository : Repository<Place>, IRepositoryPlace
    {
        public PlaceRepository(CosmosContext dbContext) : base(dbContext) { }

        public async Task<ICollection<Place>> GetAllPlaceAddedByAllUser()
        {
            return await _dbContext.Set<Place>().ToListAsync();
        }

        public async Task<ICollection<Place>> GetAllPlaceAddedByUser(string userId)
        {
            return await _dbContext.Set<Place>().Where(place => place.UserId == userId).ToListAsync();
        }
    }
}
