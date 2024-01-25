using Escapade.Api.Services.Interfaces;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Services
{
    public class PlaceService : Service<Place>, IPlaceService
    {
        public PlaceService(IRepository<Place> repository) : base(repository) { }
    }
}
