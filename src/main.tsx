import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./ui/reset.css";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import { theme } from "./ui/theme/index.ts";
import { GlobalStyles } from "./ui/theme/globalStyles.ts";

const client = new ApolloClient({
	link: new HttpLink({ uri: import.meta.env.VITE_RICK_MORTY_GRAPHQL_API_URL }),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</StrictMode>,
);
