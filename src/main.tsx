import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n";
import "./utils/reset.css";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import { theme } from "./ui/theme/index.ts";

const client = new ApolloClient({
	link: new HttpLink({ uri: import.meta.env.VITE_RICK_MORTY_GRAPHQL_API_URL }),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</StrictMode>,
);
