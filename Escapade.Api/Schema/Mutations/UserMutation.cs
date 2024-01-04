using EscapadeApi.Models;
using Newtonsoft.Json;
using System.Text;
using EscapadeApi.Services.Interfaces;
using FirebaseAdmin.Auth;
using Escapade.Api.Schema.Mutations.Interface;

namespace Escapade.Api.Schema.Mutations
{
    public class UserMutation : Mutation<User>, IUserMutation
    {
        public UserMutation() : base() { }

        #region API Rest
        public async Task<User> CreateUserRestApi(IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");


            var jsonContent = JsonConvert.SerializeObject(newUser);
            var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("api/users", stringContent, cancellationToken);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var createdUser = JsonConvert.DeserializeObject<User>(responseContent);

            return createdUser;
        }

        public async Task<User> UpdateUserRestApi(IHttpClientFactory clientFactory, Guid userId, User updatedUser, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");


            var jsonContent = JsonConvert.SerializeObject(updatedUser);
            var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await client.PutAsync($"api/users/{userId}", stringContent, cancellationToken);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var modifiedUser = JsonConvert.DeserializeObject<User>(responseContent);

            return modifiedUser;
        }

        public async Task DeleteUserRestApi(IHttpClientFactory clientFactory, Guid userId, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");

            var response = await client.DeleteAsync($"api/users/{userId}", cancellationToken);

            response.EnsureSuccessStatusCode();
        }

        #endregion

        #region HotChocolate

        public async Task<User> RegisterUser(IUserService userService, string name, string lastname, string email, string password, DateTime birthDate, CancellationToken cancellationToken)
        {
            try
            {
                // Vérifier les informations de l'utilisateur
                if (userService.IsEmailFormatValid(email) && userService.IsBirthDateValid(birthDate) && userService.IsPasswordSecure(password))
                {
                    // Créer un nouvel utilisateur dans Firebase
                    var user = await FirebaseAuth.DefaultInstance.CreateUserAsync(new UserRecordArgs
                    {
                        DisplayName = $"{name} {lastname}",
                        Email = email,
                        Password = password,
                        EmailVerified = false,
                        Disabled = false,
                    }, cancellationToken);


                    // Récupérer l'ID Firebase de l'utilisateur nouvellement créé
                    string uidString = user.Uid;

                    // Convertir la chaîne en Guid
                    if (Guid.TryParse(uidString, out Guid uid))
                    {
                        // Créer un nouvel utilisateur
                        User newUser = new User
                        {
                            Id = uid,
                            Name = name,
                            LastName = lastname,
                            Email = email,
                            Password = password,
                            BirthDate = birthDate
                        };

                        // Enregistrer l'utilisateur dans CosmoDb
                        return await userService.CreateAsync(newUser);
                    }
                }
                User u = new User
                {
                    Name = name,
                    LastName = lastname,
                    Email = email,
                    Password = password,
                    BirthDate = birthDate
                };
                return u;
            }
            catch (FirebaseAuthException ex)
            {
                // Gérer les erreurs d'authentification Firebase
                Console.WriteLine($"Erreur lors de l'enregistrement de l'utilisateur : {ex.Message}");
                throw;
            }
        }

        #endregion 
    }
}
