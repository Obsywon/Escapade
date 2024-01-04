using Newtonsoft.Json;

namespace Escapade.Api.Schema.Users
{
    public class UserInput
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
