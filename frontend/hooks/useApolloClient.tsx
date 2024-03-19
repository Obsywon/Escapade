import { ApolloClient, HttpLink, InMemoryCache, NormalizedCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";
import env from "../env";
import { firebaseAuth } from "../services/AuthService";
import { IdTokenResult } from "firebase/auth";


export type ApolloTokenHookReturn = {
    accessToken: IdTokenResult | undefined;
    accessLoaded: boolean;
    client: ApolloClient<NormalizedCacheObject>;
}

export default function useApolloToken() : ApolloTokenHookReturn
{
    const [accessToken, setAccessToken] = useState<IdTokenResult | undefined>(undefined);
    const [accessLoaded, setAccessLoaded] = useState<boolean>(false);

    // Gère l'authentification automatique à l'application
    useEffect(() => {
        const sub = firebaseAuth.onAuthStateChanged((user) => {
            if (user == null) { // Pas authentifié
                setAccessLoaded(true);
                setAccessToken(accessToken);
                return null;
            }
            user // Authentification possible
                ?.getIdTokenResult()
                .then((accessToken) => {
                    setAccessToken(accessToken);
                })
                .catch((error) => console.error(error))
                .finally(() => setAccessLoaded(true));
        });
        return sub;
    }, []);

    const httpLink = new HttpLink({
        uri: env.BACKEND_APP_URI,
    });

    const authLink = setContext((_, { headers }) => {

        return {
            preserveHeaderCase: true,
            headers: {
                ...headers,
                Authorization: `Bearer ${accessToken?.token}`,
            },
        };
    });


    const client = new ApolloClient({
        uri: env.BACKEND_APP_URI,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
    (async () => {
        await client.clearStore();
    })();

    return {
        accessToken, accessLoaded, client
    }
}