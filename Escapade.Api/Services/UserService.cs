using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;
using System.Text;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Escapade.Api.Repositories.Interfaces;
using EscapadeApi.Repositories;

namespace EscapadeApi.Services
{
    public class UserService : Service<User>, IUserService
    {
        public UserService(IRepositoryUser repository) : base(repository) { }

        public async Task<bool> CheckForConflictingUserAsync(string email)
        {
            return (await _repository.GetByConditionAsync(x => x.Email == email)).Any();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return (await _repository.GetByConditionAsync(x => x.Email == email)).FirstOrDefault();
        }

        public async Task<string> EncryptPasswordAsync(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // Convertir le mot de passe en un tableau de bytes
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

                // Utiliser MemoryStream pour envelopper le tableau de bytes
                using (MemoryStream stream = new MemoryStream(passwordBytes))
                {
                    // Calculer le hash de manière asynchrone
                    byte[] hashedBytes = await sha256.ComputeHashAsync(stream);

                    // Convertir le tableau de bytes en une chaîne hexadécimale
                    StringBuilder builder = new StringBuilder();
                    for (int i = 0; i < hashedBytes.Length; i++)
                    {
                        builder.Append(hashedBytes[i].ToString("x2"));
                    }

                    return builder.ToString();
                }
            }
        }

        public bool IsPasswordSecure(string password)
        {
            // Vérifier si le mot de passe a au moins 8 caractères
            if (password.Length < 8)
            {
                return false;
            }

            // Vérifier la présence de lettres minuscules, majuscules et chiffres dans le mot de passe
            string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$";
            Regex regex = new Regex(passwordPattern);

            // Vérifier si le mot de passe correspond au format attendu
            return regex.IsMatch(password);
        }

        public bool IsEmailFormatValid(string email)
        {
            // Utiliser une expression régulière pour valider le format de l'e-mail
            string emailPattern = @"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
            Regex regex = new Regex(emailPattern);

            // Vérifier si l'e-mail correspond au format attendu
            return regex.IsMatch(email);
        }

        public bool IsNameAndLastNameValid(string name, string lastName)
        {
            // Vérifier si le champ a au moins 3 caractères alphabétiques
            string nameAndLastNamePattern = @"^[a-zA-Z]{3,}$";
            Regex regex = new Regex(nameAndLastNamePattern);

            // Vérifier si le nom correspond au format attendu
            return (regex.IsMatch(name) && regex.IsMatch(lastName));
        }

        public bool IsBirthDateValid(DateTime birthDate)
        {
            // Vérifier si la date de naissance est au format "DD-MM-YYYY"
            string datePattern = @"^\d{2}-\d{2}-\d{4}$";
            Regex regex = new Regex(datePattern);

            // Vérifier si la date de naissance correspond au format attendu
            return regex.IsMatch(birthDate.ToString("dd-mm-yyyy"));
        }

        public async Task<ICollection<Place>> GetAllFavoritePlacesAsync(string userId)
        {
            return await (_repository as UserRepository).GetFavoritePlacesByIUserdsAsync(userId);
        }

        public async Task<ICollection<Post>> GetAllPostByUserIdAsync(string userId)
        {
            return await (_repository as UserRepository).GetAllPostByUserIdAsync(userId);
        }
    }
}
