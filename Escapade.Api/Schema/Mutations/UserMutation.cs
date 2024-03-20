using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;
using Firebase.Auth.Requests;
using FirebaseAdmin.Auth;
using HotChocolate.Authorization;
using Newtonsoft.Json;

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

            // Créer un nouvel utilisateur
            User newUser = new User
            {
                Id = uidString,
                Name = name,
                LastName = lastname,
                Email = email,
                Password = password,
                BirthDate = birthDate,
            };

            // Enregistrer l'utilisateur dans CosmoDb
            var user = await userService.CreateAsync(newUser);

            return user;       
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<User> AddNewFavoritePlaceAsync(IUserService userService, IPlaceService placeService, IHttpContextAccessor httpContextAccessor, string placeId, CancellationToken cancellationToken)
        {
           var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);

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

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        [Error(typeof(BirthdateInvalidFormatError))]
        [Error(typeof(NameInvalidFormatError))]
        public async Task<User> UpdateUserAsync(IUserService userService, IHttpContextAccessor httpContextAccessor, string userId, string name, string lastName, DateTime birthDate, string gender, string city, string country, string phoneNumber, string description, CancellationToken cancellationToken)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);

            User currentUser = null;

            if (await userService.IsFoundAsync(userId))
                currentUser = await userService.GetByIdAsync(userId);


            #region Verification 

            userService.IsBirthDateValid(birthDate);
            userService.IsNameAndLastNameValid(name, lastName);

            #endregion

            currentUser.Name = name;
            currentUser.LastName = lastName;
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
