namespace Escapade.Api.Exceptions
{
    public class BadCredentialLoginError : IError
    {
        private BadCredentialLoginError(BadCredentialLoginException ex)
        {
            Message = $"The email {ex.Email} or the password {ex.Password} is invalid.";
            Code = 401 ;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class BadCredentialLoginException : Exception
    {
        public BadCredentialLoginException(string email, string password)
        {
            Email = email;
            Password = password;
        }

        public string Email { get; }
        public string Password { get; }
    }
}
