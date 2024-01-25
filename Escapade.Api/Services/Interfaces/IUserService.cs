using EscapadeApi.Models;

namespace EscapadeApi.Services.Interfaces
{
    public interface IUserService : IService<User>
    {
        public Task<User> GetUserByEmailAsync(string email);

        public Task<bool> CheckForConflictingUserAsync(string email);

        public Task<bool> UserIsFoundAsync(string userId);

        public Task<string> EncryptPasswordAsync(string password);

        public bool IsPasswordSecure(string password);

        public bool IsEmailFormatValid(string email);

        public bool IsNameAndLastNameValid(string name, string lastName);

        public bool IsBirthDateValid(DateTime birthDate);
    }
}
