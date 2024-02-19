using Escapade.Api.Models;
using Escapade.Api.Repositories.Interfaces;
using EscapadeApi;
using EscapadeApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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
