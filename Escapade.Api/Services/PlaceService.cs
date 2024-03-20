using Escapade.Api.Models;
using Escapade.Api.Repositories;
using Escapade.Api.Repositories.Interfaces;
using Escapade.Api.Services.Interfaces;

namespace Escapade.Api.Services
{
    public class PlaceService : Service<Place>, IPlaceService
    {
        public PlaceService(IRepositoryPlace repository) : base(repository) { }

        public async Task<ICollection<Place>> GetAllPlaceAddedByUser(string userId)
        {
            try
            {
                return (ICollection<Place>)await GetByConditionAsync(place => place.UserId == userId);
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
