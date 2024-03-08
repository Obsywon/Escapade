using Escapade.Api.Models;
using EscapadeApi.Repositories.Interfaces;

namespace Escapade.Api.Repositories.Interfaces
{
    public interface IRepositoryUser : IRepository<User>
    {
        public Task<ICollection<Place>> GetFavoritePlacesByIUserdsAsync(string userId);

    }
}
