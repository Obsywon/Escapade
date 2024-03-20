namespace Escapade.Api.Exceptions
{
    public class PasswordInvalidFormatError : IError
    {
        private PasswordInvalidFormatError(PasswordInvalidFormatException ex)
        {
            Message = $"The password {ex.Password} is invalid.";
            Message += "It must have at least 8 characters, 1 capital letter and 1 digit";
            Code = 400;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class PasswordInvalidFormatException : Exception
    {
        public PasswordInvalidFormatException(string password)
        {
            Password = password;
        }

        public string Password { get; }
    }
}
