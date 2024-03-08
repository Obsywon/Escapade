using Escapade.Api.Models;

namespace Escapade.Api.Services.Interfaces
{
    public interface IPlaceService : IService<Place>
    {
        public Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByUser(string userId);
    }
}
