namespace Escapade.Api.Exceptions
{
    public class EmailTakenError : IError
    {
        private EmailTakenError(UserEmailTakenException ex)
        {
            Message = $"The email {ex.Email} is already taken.";
            Code = 409;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class UserEmailTakenException : Exception
    {
        public UserEmailTakenException(string email)
        {
            Email = email;
        }

        public string Email { get; }
    }
}
