namespace Escapade.Api.Exceptions
{
    public class LastnameInvalidFormatError : IError
    {
        private LastnameInvalidFormatError(LastnameInvalidFormatException ex)
        {
            Message = $"The lastname {ex.Lastname} is invalid.";
            Code = 400;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class LastnameInvalidFormatException : Exception
    {
        public LastnameInvalidFormatException(string lastname)
        {
            Lastname = lastname;
        }

        public string Lastname { get; }
    }
}
