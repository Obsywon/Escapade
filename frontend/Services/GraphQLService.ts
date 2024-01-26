import { useAuth } from './../contexts/AuthContext';
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import env from "../env";


export default function useGraphQLQueries(){
    
const httpLink = createHttpLink();
const {accessToken} = useAuth();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken?.token ? `Bearer ${accessToken.token}` : "",
    },
  };
});

const GraphQLClient = new ApolloClient({
  uri: env.BACKEND_APP_URI,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

return {GraphQLClient}
}
