﻿using Escapade.Api.Services.Interfaces;
using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;
using Firebase.Auth.Requests;
using FirebaseAdmin.Auth;
using FirebaseAdminAuthentication.DependencyInjection.Models;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Escapade.Api.Schema.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class UserMutation
    {
        #region HotChocolate

        private readonly IConfiguration _configuration;

        public UserMutation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        public async Task<User> RegisterUserAsync(IUserService userService, string name, string lastname, string email, string password, DateTime birthDate, CancellationToken cancellationToken)
        {
            try
            {
                // Vérifier les informations de l'utilisateur
                if (await userService.CheckForConflictingUserAsync(email))
                {
                    throw new InvalidOperationException("email address is already in use.");
                }
                else if (!userService.IsPasswordSecure(password))
                {
                    throw new InvalidOperationException("password is invalid.");
                }
                else if (!userService.IsNameAndLastNameValid(name, lastname))
                {
                    throw new InvalidOperationException("user's name is invalid.");
                }
                else if (!userService.IsBirthDateValid(birthDate))
                {
                    throw new InvalidOperationException("birthdate is invalid.");
                }

                // Cryptage du mdp
                password = await userService.EncryptPasswordAsync(password);

                // Créer un nouvel utilisateur dans Firebase
                var firebaseUser = await FirebaseAuth.DefaultInstance.CreateUserAsync(new UserRecordArgs
                {
                    DisplayName = $"{name} {lastname}",
                    Email = email,
                    Password = password,
                    EmailVerified = true,
                    Disabled = false,
                }, cancellationToken);


                // Récupérer l'ID Firebase de l'utilisateur nouvellement créé
                string uidString = firebaseUser.Uid;

                // Récupérer le token Firebase associé à l'utilisateur
                string firebaseToken = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(uidString);


                // Créer un nouvel utilisateur
                User newUser = new User
                {
                    Id = uidString,
                    Name = name,
                    LastName = lastname,
                    Email = email,
                    Password = password,
                    BirthDate = birthDate,
                    Token = firebaseToken,
                };

                // Enregistrer l'utilisateur dans CosmoDb
                var user = await userService.CreateAsync(newUser);

                return user;

            }
            catch (FirebaseAuthException ex)
            {
                // Gérer les erreurs d'authentification Firebase
                Console.WriteLine("Erreur lors de l'enregistrement de l'utilisateur : " + ex.Message);
                throw;
            }

            catch (Exception ex)
            {
                // Gérer les erreurs d'authentification Firebase
                Console.WriteLine("Erreur lors de l'enregistrement de l'utilisateur : " + ex.Message);
                throw;
            }
        }

        [AllowAnonymous]
        public async Task<User> LoginUserAsync(IUserService userService, string email, string psw)
        {
            try
            {
                // Récupérer l'utilisateur depuis votre service (par exemple, depuis CosmosDB) en utilisant l'email
                User user = await userService.GetUserByEmailAsync(email);

                psw = userService.EncryptPasswordAsync(psw).Result;

                using (var httpClient = new HttpClient())
                {
                    string firebaseUri = _configuration["Firebase:Uri"];
                    string firebaseApiKey = _configuration["Firebase:ApiKey"];

                    string apiUrl = $"{firebaseUri}{firebaseApiKey}";

                    var request = new
                    {
                        email,
                        password=psw,
                        returnSecureToken = true
                    };

                    var response = await httpClient.PostAsJsonAsync(apiUrl, request);

                    if (response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();

                        // Désérialiser la réponse JSON
                        var responseObject = JsonConvert.DeserializeObject<VerifyPasswordResponse>(responseContent);

                        // Accéder à la propriété idToken
                        string idToken = responseObject.IdToken;

                        user.Token = idToken;
                        var userUpdated = await userService.UpdateAsync(user);

                        return userUpdated;
                    }
                    else
                    {
                        // Gérer les erreurs
                        Console.WriteLine($"Erreur lors de la connexion de l'utilisateur : {response.StatusCode}");
                        var responseContent = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(responseContent);
                        // Retourner ou jeter une exception indiquant que la connexion a échoué
                        return null; // ou throw new Exception("La connexion a échoué");
                    }
                }
            }
            catch (FirebaseAuthException ex)
            {
                // Gérer les erreurs d'authentification Firebase
                Console.WriteLine($"Erreur lors de l'authentification Firebase : {ex.Message}");
                // Retourner ou jeter une exception indiquant que l'authentification a échoué
                return null;
            }
        }

        [Authorize]
        public async Task AddNewFavoritePlace(IUserService userService, IPlaceService placeService, ClaimsPrincipal claimsPrincipal, string placeId, CancellationToken cancellationToken)
        {
            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);

            User currentUser = null;
            Place currentPlace;

            if (await userService.IsFoundAsync(userId))
                currentUser = await userService.GetByIdAsync(userId);

            if(await placeService.IsFoundAsync(placeId))
                currentPlace = await placeService.GetByIdAsync(userId);

            FavoritePlace favoritePlace = new FavoritePlace();
            favoritePlace.PlaceId = placeId;

            currentUser.FavoritePlaces.Add(favoritePlace);

            await userService.UpdateAsync(currentUser);
        }

        [Authorize]
        public async Task UpdateUserAsync(IUserService userService, ClaimsPrincipal claimsPrincipal, string name, string lastname, DateTime birthDate, string gender , CancellationToken cancellationToken)
        {
            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);

            User currentUser = null;

            if (await userService.IsFoundAsync(userId))
                currentUser = await userService.GetByIdAsync(userId);

            currentUser.Name = name;
            currentUser.LastName = lastname;
            currentUser.BirthDate = birthDate;
            currentUser.Gender = gender;

            await userService.UpdateAsync(currentUser);
        }

        #endregion
    }
}
