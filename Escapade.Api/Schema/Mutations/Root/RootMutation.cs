namespace Escapade.Api.Schema.Mutations.Root
{
    public class RootMutation
    {
        public UserMutation UserMutation { get; }
        public PostMutation PostMutation { get; }


        public RootMutation(UserMutation userMutation, PostMutation postMutation)
        {
            UserMutation = userMutation;
            PostMutation = postMutation;
        }
    }
}
