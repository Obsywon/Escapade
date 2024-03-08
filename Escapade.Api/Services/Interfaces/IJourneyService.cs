using Escapade.Api.Models;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Services.Interfaces
{
    public interface IJourneyService : IService<Journey>
    {
        public Task<Journey> GetRandomJourneyAsync();
    }
}
