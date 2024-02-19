namespace Escapade.Api.Exceptions
{
    public class EmailInvalidFormatError : IError
    {
        private EmailInvalidFormatError(EmailInvalidFormatException ex)
        {
            Message = $"The email {ex.Email} is invalid.";
            Code = 400;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class EmailInvalidFormatException : Exception
    {
        public EmailInvalidFormatException(string email)
        {
            Email = email;
        }

        public string Email { get; }
    }
}
