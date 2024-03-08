namespace Escapade.Api.Exceptions
{
    public class VerifyFirebaseTokenError : IError
    {
        private VerifyFirebaseTokenError(VerifyFirebaseTokenException ex)
        {
            Message = $"The user is not authorized.";
            Code = 401;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class VerifyFirebaseTokenException : Exception
    {
        public VerifyFirebaseTokenException() { }

    }
}
