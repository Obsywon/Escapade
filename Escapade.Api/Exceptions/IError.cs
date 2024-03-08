namespace Escapade.Api.Exceptions
{
    public interface IError
    {
        string Message { get; }

        int Code { get; }
    }
}
