﻿using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;
using FirebaseAdmin.Auth;
using HotChocolate.Authorization;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class UserQuery 
    {
        public UserQuery() : base() { }

        [Authorize]
        public async Task<IEnumerable<User>> GetAllUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            // Récupérer le token depuis l'en-tête Authorization
            string authorizationHeader = httpContextAccessor.HttpContext.Request.Headers["Authorization"];

            // Extraire le token en enlevant "Bearer " du début
            string token = authorizationHeader.Substring("Bearer ".Length);

            // Utiliser le token comme nécessaire
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            string uid = decodedToken.Uid;

            // Utiliser uid comme nécessaire, par exemple, pour récupérer les utilisateurs
            return await service.GetAllAsync();
            
        }

        public async Task<User> GetUserById(IUserService service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

        public async Task<User> GetUserByEmail(IUserService service, string email, CancellationToken cancellation)
        {
            return await service.GetUserByEmailAsync(email);
        }

    }
}
