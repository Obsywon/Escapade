namespace Escapade.Api.Exceptions
{
    public class BirthdateInvalidFormatError : IError
    {
        private BirthdateInvalidFormatError(BirthdateInvalidFormatException ex)
        {
            Message = $"The birthdate {ex.Birthdate} is invalid.";
            Code = 400;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class BirthdateInvalidFormatException : Exception
    {
        public BirthdateInvalidFormatException(string birthdate)
        {
            Birthdate = birthdate;
        }

        public string Birthdate { get; }
    }
}
