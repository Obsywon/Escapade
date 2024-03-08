namespace Escapade.Api.Exceptions
{
    public class NameInvalidFormatError : IError
    {
        private NameInvalidFormatError(NameInvalidFormatException ex)
        {
            Message = $"The name {ex.Name} is invalid.";
            Code = 400;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class NameInvalidFormatException : Exception
    {
        public NameInvalidFormatException(string name)
        {
            Name = name;
        }

        public string Name { get; }
    }
}
