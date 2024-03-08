using Escapade.Api.Models;
using Escapade.Api.Repositories.Interfaces;
using EscapadeApi;
using Microsoft.EntityFrameworkCore;

namespace Escapade.Api.Repositories
{
    public class JourneyRepository : Repository<Journey>, IRepositoryJourney
    {
        public JourneyRepository(CosmosContext dbContext) : base(dbContext) { }

        public async Task<Journey> GetRandomJourneyAsync()
        {
            var allJourneys = await _dbContext.Set<Journey>().ToListAsync();

            if (allJourneys == null || !allJourneys.Any())
            {
                return null;
            }

            var randomIndex = new Random().Next(0, allJourneys.Count);

            var randomJourney = allJourneys[randomIndex];

            return randomJourney;     
        }
    }
}
