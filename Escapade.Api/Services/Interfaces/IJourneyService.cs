using Escapade.Api.Models;

namespace Escapade.Api.Services.Interfaces
{
    public interface IJourneyService : IService<Journey>
    {
        public Task<Journey> GetRandomJourneyAsync();
    }
}
