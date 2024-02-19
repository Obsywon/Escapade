using Escapade.Api.Models;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Repositories.Interfaces
{
    public interface IRepositoryUser : IRepository<User>
    {
        public Task<ICollection<Place>> GetFavoritePlacesByIUserdsAsync(string userId);

        public Task<ICollection<Post>> GetAllPostByUserIdAsync(string userId);
    }
}
