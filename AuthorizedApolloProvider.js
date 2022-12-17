import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export function AuthorizedApolloProvider({ children }) {
  const { getAccessTokenSilently, isLoading, isAuthenticated, ...rest } =
    useAuth0();
  if (isLoading) return <div>Loading...</div>;
  const httpLink = createHttpLink({
    // uri: process.env.REACT_APP_HASURA_API,
    // uri: "https://adequate-ladybug-87.hasura.app/v1/graphql",
    uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_API,
  });
  console.log("????", isAuthenticated);
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_WS_API,
      connectionParams: async () => {
        const token = await getAccessTokenSilently();
        return {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        };
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
  const authLink = setContext(async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      // console.log("ADFADFSADF", token);
      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {};
    }
  });
  const apolloClient = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
