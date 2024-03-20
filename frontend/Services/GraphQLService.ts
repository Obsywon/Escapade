import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import env from "../env";


export default function initGraphQLClient(accessToken: string): ApolloClient<NormalizedCacheObject>{
    
const httpLink = createHttpLink();

const authLink = setContext((_, { headers }) => {
  console.log("test");
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

const GraphQLClient = new ApolloClient({
  uri: env.BACKEND_APP_URI,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

return GraphQLClient;
}
