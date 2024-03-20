using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services;
using Escapade.Api.Services.Interfaces;
using HotChocolate.Authorization;

namespace Escapade.Api.Schema.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class PostMutation
    {
        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<User> UpdatePostAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string postId, string title, string description, string photo, CancellationToken cancellationToken)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);

            // Récupérez l'utilisateur
            var user = await service.GetByIdAsync(userId);

            // Vérifiez si l'utilisateur existe
            if (user == null)
            {
                throw new Exception(); 
            }

            // Recherchez le post dans la liste des posts de l'utilisateur
            var post = user.Posts.FirstOrDefault(p => p.Id == postId);
            if (post == null)
            {
                throw new Exception(); 
            }

            // Mettez à jour les propriétés du post
            post.Title = title;
            post.Description = description;
            post.Photo = photo;

            // Enregistrez les modifications dans le service
            await service.UpdateAsync(user);

            return user;
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<User> AddPostToUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string title, string description, string userId, string placeId, CancellationToken cancellationToken)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);

            Post post = new Post
            {
                Title = title,
                Description = description,
                UserId = userId,
                PlaceId = placeId,
            };

            User user = await service.GetByIdAsync(userId);
            user.Posts.Add(post);

            return await service.UpdateAsync(user);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task DeletePostAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string postId, CancellationToken cancellationToken)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);

            // Récupérez l'utilisateur
            var user = await service.GetByIdAsync(userId);

            // Vérifiez si l'utilisateur existe
            if (user == null)
            {
                throw new Exception(); // Gérer l'erreur si l'utilisateur n'est pas trouvé
            }

            // Vérifiez si le post appartient à l'utilisateur
            var post = user.Posts.FirstOrDefault(p => p.Id == postId);
            if (post == null)
            {
                throw new Exception(); // Gérer l'erreur si le post n'est pas trouvé
            }

            // Supprimez le post de la liste des posts de l'utilisateur
            user.Posts.Remove(post);

            // Enregistrez les modifications dans le service
            await service.UpdateAsync(user);
        }
    }
}
