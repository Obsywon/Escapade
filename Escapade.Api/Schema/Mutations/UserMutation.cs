using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;
using Firebase.Auth.Requests;
using FirebaseAdmin.Auth;
using HotChocolate.Authorization;
using Newtonsoft.Json;

namespace Escapade.Api.Schema.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class UserMutation
    {
        #region HotChocolate

        [AllowAnonymous]
        public async Task<User> RegisterUserAsync(IUserService userService, string name, string lastname, string email, string password, DateTime birthDate, CancellationToken cancellationToken)
        {
            try
            {
                // Vérifier les informations de l'utilisateur
                if (await userService.CheckForConflictingUser(email))
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
                password = await userService.EncryptPassword(password);

                // Créer un nouvel utilisateur dans Firebase
                var firebaseUser = await FirebaseAuth.DefaultInstance.CreateUserAsync(new UserRecordArgs
                {
                    DisplayName = $"{name} {lastname}",
                    Email = email,
                    Password = password,
                    EmailVerified = false,
                    Disabled = false,
                }, cancellationToken);


                // Récupérer l'ID Firebase de l'utilisateur nouvellement créé
                string uidString = firebaseUser.Uid;

                // Récupérer le token Firebase associé à l'utilisateur
                string firebaseToken = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(uidString);

                // Convertir la chaîne en Guid
                //Guid.TryParse(uidString, out Guid uid);

                // Créer un nouvel utilisateur
                User newUser = new User
                {
                    Id = uidString,
                    Name = name,
                    LastName = lastname,
                    Email = email,
                    Password = password,
                    BirthDate = birthDate
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
        public async Task<User> LoginUserAsync(IUserService userService, string email, string password)
        {
            try
            {
                // Récupérer l'utilisateur depuis votre service (par exemple, depuis CosmosDB) en utilisant l'email
                User user = await userService.GetUserByEmailAsync(email);

                var passwordEncrypted = userService.EncryptPassword(password);

                using (var httpClient = new HttpClient())
                {
                    var apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + "AIzaSyCfaZTRP3qpC_XqVpZgMAEs2b10E0-j12c";

                    var request = new
                    {
                        email,
                        passwordEncrypted,
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

            #endregion

        }
    }
}
