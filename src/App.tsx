import { Suspense } from "react";
import { CharacterList } from "./ui/components/CharacterList";
import { ErrorBoundary } from "./ui/components/ErrorBoundary";
import { Heading } from "./ui/components/Heading";
import { Layout } from "./ui/components/Layout";
import { Spinner } from "./ui/components/Spinner";

function App() {
	return (
		<Layout>
			<Heading />
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<CharacterList />
				</Suspense>
			</ErrorBoundary>
		</Layout>
	);
}

export default App;
