using AzureFunctionEscapade.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Services.Interfaces
{
    public interface IUserService : IService<User>
    {
        public Task<bool> CheckForConflictingUser(User user);

        public Task<string> EncryptPassword(User user);
        public bool IsPasswordSecure(User user);

        public bool IsEmailFormatValid(User user);

        public bool IsNameOrLastNameValid(User user);

        public bool IsBirthDateValid(User user);
    }
}
