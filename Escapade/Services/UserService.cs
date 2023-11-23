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

namespace AzureFunctionEscapade.Services
{
    public class UserService : Service<User>, IUserService
    {
        public UserService(IRepository<User> repository) : base(repository) { }

        public async Task<bool> CheckForConflictingUser(User user)
        {
            return (await _repository.GetByCondition(x => x.Name == user.Name && x.LastName == user.LastName)).Any();
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
    }
}
