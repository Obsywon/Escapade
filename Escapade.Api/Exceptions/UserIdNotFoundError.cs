namespace Escapade.Api.Exceptions
{
    public class UserIdNotFoundError : IError
    {
        private UserIdNotFoundError(UserIdNotFoundException ex)
        {
            Message = $"The user with id {ex.Id} does not exist.";
            Code = 404;
        }

        public string Message { get; }

        public int Code { get; }
    }

    public class UserIdNotFoundException : Exception
    {
        public UserIdNotFoundException(string id)
        {
            Id = id;
        }

        public string Id { get; }
    }
}
