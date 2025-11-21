import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";
import "./utils/reset.css";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
	link: new HttpLink({ uri: import.meta.env.VITE_RICK_MORTY_GRAPHQL_API_URL }),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</StrictMode>,
);
