using EscapadeApi;
using EscapadeApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Escapade.Api.Repositories
{
    public class PlaceRepository : Repository<Place>
    {
        public PlaceRepository(CosmosContext dbContext) : base(dbContext) { }
    }
}
