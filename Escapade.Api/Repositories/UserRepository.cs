using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Repositories.Interfaces;
using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;
using Firebase.Auth.Repository;
using Microsoft.EntityFrameworkCore;

namespace EscapadeApi.Repositories
{
    public class UserRepository : Repository<User>, IRepositoryUser
    {
        public UserRepository(CosmosContext dbContext) : base(dbContext) { }

        public async Task<ICollection<Post>> GetAllPostByUserIdAsync(string userId)
        {
            try
            {
                var user = await GetByIdAsync(userId);

                if (user == null)
                    throw new UserIdNotFoundException(userId);

                if (user?.Posts == null || !user.Posts.Any())
                {
                    return new List<Post>();
                }

                return await _dbContext.Set<Post>().Where(post => post.UserId == userId).ToListAsync();
            }
            catch (Exception ex) 
            {
                throw;
            }
            
        }

        public async Task<ICollection<Place>> GetFavoritePlacesByIUserdsAsync(string userId)
        {
            var user = await GetByIdAsync(userId);

            if (user?.FavoritePlaces == null || !user.FavoritePlaces.Any())
            {
                return new List<Place>();
            }

            var favoritePlaceIds = user.FavoritePlaces.Select(fp => fp.PlaceId).ToList();

            // Utiliser la méthode GetFavoritePlacesByIdsAsync pour récupérer les lieux favoris
            return await _dbContext.Set<Place>().Where(place => favoritePlaceIds.Contains(place.Id)).ToListAsync();
        }

    }
}
