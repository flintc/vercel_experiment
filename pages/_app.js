import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthorizedApolloProvider } from "../AuthorizedApolloProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "../Header";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    >
      <AuthorizedApolloProvider>
        <Header />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  );
}

export default MyApp;
