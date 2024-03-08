using Escapade.Api.Models;
using EscapadeApi.Models;

namespace EscapadeApi.Services.Interfaces
{
    public interface IUserService : IService<User>
    {
        public Task<User> GetUserByEmailAsync(string email);

        public Task<bool> IsEmailAlreadyExist(string email);

        public Task<string> EncryptPasswordAsync(string password);

        public void IsPasswordSecure(string password);

        public void IsEmailFormatValid(string email);

        public void IsNameAndLastNameValid(string name, string lastName);

        public void IsBirthDateValid(DateTime birthDate);

        public Task<ICollection<Place>> GetAllFavoritePlacesAsync(string userId);

        Task<ICollection<Post>> GetRandomPostAsync();
        Task<ICollection<Post>> GetAllPostAsync();
        Task<ICollection<Post>> GetAllPostByUserAsync(string userId);
    }
}
