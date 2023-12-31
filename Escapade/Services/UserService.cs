using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories.Interfaces;
using AzureFunctionEscapade.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IO;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace AzureFunctionEscapade.Services
{
    public class UserService : Service<User>, IUserService
    {
        public UserService(IRepository<User> repository) : base(repository) { }

        public async Task<bool> CheckForConflictingUser(User user)
        {
            return (await _repository.GetByCondition(x => x.Email == user.Email)).Any();
        }

        public async Task<string> EncryptPassword(User user)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // Convertir le mot de passe en un tableau de bytes
                byte[] passwordBytes = Encoding.UTF8.GetBytes(user.Password);

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
        /*
        public bool IsPasswordSecure(User user)
        {
            // Vérifier si le mot de passe a au moins 8 caractères
            if (user.Password.Length < 8)
            {
                return false;
            }

            // Vérifier la présence de lettres minuscules, majuscules et chiffres dans le mot de passe
            string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$";
            Regex regex = new Regex(passwordPattern);

            // Vérifier si le mot de passe correspond au format attendu
            return regex.IsMatch(user.Password);
        }

        public bool IsEmailFormatValid(User user)
        {
            // Utiliser une expression régulière pour valider le format de l'e-mail
            string emailPattern = @"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
            Regex regex = new Regex(emailPattern);

            // Vérifier si l'e-mail correspond au format attendu
            return regex.IsMatch(user.Email);
        }

        public bool IsNameOrLastNameValid(User user)
        {
            // Vérifier si le champ a au moins 3 caractères alphabétiques
            string namePattern = @"^[a-zA-Z]{3,}$";
            Regex regex = new Regex(namePattern);

            // Vérifier si le nom correspond au format attendu
            return (regex.IsMatch(user.Name) && regex.IsMatch(user.LastName));
        }

        public bool IsBirthDateValid(User user)
        {
            // Vérifier si la date de naissance est au format "DD-MM-YYYY"
            string datePattern = @"^\d{2}-\d{2}-\d{4}$";
            Regex regex = new Regex(datePattern);

            // Vérifier si la date de naissance correspond au format attendu
            return regex.IsMatch(user.BirthDate);
        }
        */
    }
}
