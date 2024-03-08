namespace Escapade.Api.Exceptions
{
    public class UserEmailNotFoundError : IError
    {
        private UserEmailNotFoundError(UserEmailNotFoundException ex)
        {
            Message = $"The user with email {ex.Email} does not exist.";
            Code = 404;
        }


        public string Message { get; }

        public int Code { get; }
    }

    public class UserEmailNotFoundException : Exception
    {
        public UserEmailNotFoundException(string email)
        {
            Email = email;
        }

        public string Email { get; }

    }
}
