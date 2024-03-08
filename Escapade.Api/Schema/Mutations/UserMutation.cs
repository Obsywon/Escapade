using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;
using EscapadeApi.Services.Interfaces;
using Firebase.Auth.Requests;
using FirebaseAdmin.Auth;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Claims;

namespace Escapade.Api.Schema.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class UserMutation
    {

        private readonly IConfiguration _configuration;

        public UserMutation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [Error(typeof(EmailInvalidFormatException))]
        [Error(typeof(PasswordInvalidFormatError))]
        [Error(typeof(EmailTakenError))]
        [Error(typeof(BirthdateInvalidFormatError))]
        [Error(typeof(NameInvalidFormatError))]
        [Error(typeof(LastnameInvalidFormatError))]
        public async Task<User> RegisterUserAsync(IUserService userService, string name, string lastname, string email, string password, DateTime birthDate, CancellationToken cancellationToken)
        {

            #region Verification Input

            userService.IsEmailFormatValid(email);
            userService.IsBirthDateValid(birthDate);
            userService.IsNameAndLastNameValid(name, lastname);
            userService.IsPasswordSecure(password);

            #endregion

            email = email.ToLower();

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
            //string firebaseToken = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(uidString);


            // Créer un nouvel utilisateur
            User newUser = new User
            {
                Id = uidString,
                Name = name,
                LastName = lastname,
                Email = email,
                Password = password,
                BirthDate = birthDate,
                //Token = firebaseToken,
            };

            // Enregistrer l'utilisateur dans CosmoDb
            var user = await userService.CreateAsync(newUser);

            return user;       
        }

        [AllowAnonymous]
        [Error(typeof(BadCredentialLoginError))]
        [Error(typeof(UserEmailNotFoundError))]
        public async Task<User> LoginUserAsync(IUserService userService, string email, string psw, CancellationToken cancellation)
        {
            User user = await userService.GetUserByEmailAsync(email);

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

                throw new BadCredentialLoginException(email, psw);
            }

        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<User> AddNewFavoritePlaceAsync(IUserService userService, IPlaceService placeService, IHttpContextAccessor httpContextAccessor, string userId, string placeId, CancellationToken cancellationToken)
        {
           //var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);

            User currentUser = null;
            Place currentPlace;

            if (await userService.IsFoundAsync(userId))
                currentUser = await userService.GetByIdAsync(userId);

            if(await placeService.IsFoundAsync(placeId))
                currentPlace = await placeService.GetByIdAsync(userId);

            FavoritePlace favoritePlace = new FavoritePlace();
            favoritePlace.PlaceId = placeId;

            currentUser.FavoritePlaces.Add(favoritePlace);

            return await userService.UpdateAsync(currentUser);
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        [Error(typeof(BirthdateInvalidFormatError))]
        [Error(typeof(NameInvalidFormatError))]
        public async Task<User> UpdateUserAsync(IUserService userService, IHttpContextAccessor httpContextAccessor,
            string userId, string name, string lastname, DateTime birthDate, string gender, string city, string country, string phoneNumber, string description, CancellationToken cancellationToken)

        {
            //var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);

            User currentUser = null;

            if (await userService.IsFoundAsync(userId))
                currentUser = await userService.GetByIdAsync(userId);


            #region Verification 

            userService.IsBirthDateValid(birthDate);
            userService.IsNameAndLastNameValid(name, lastname);

            #endregion

            currentUser.Name = name;
            currentUser.LastName = lastname;
            currentUser.BirthDate = birthDate;
            currentUser.Gender = gender;
            currentUser.City = city;
            currentUser.Country = country;
            currentUser.PhoneNumber = phoneNumber;
            currentUser.Description = description;

            return await userService.UpdateAsync(currentUser);
        }

    }
}
