using Escapade.Api.Models;
using Escapade.Api.Repositories.Interfaces;
using Escapade.Api.Repositories;
using Escapade.Api.Services.Interfaces;
using EscapadeApi.Services.Interfaces;
using EscapadeApi.Repositories.Interfaces;

namespace Escapade.Api.Services
{
    public class JourneyService : Service<Journey>, IJourneyService
    {
        public JourneyService(IRepositoryJourney repository) : base(repository) { }

        public async Task<Journey> GetRandomJourneyAsync()
        {
            return await (_repository as JourneyRepository).GetRandomJourneyAsync();
        }
    }
}
