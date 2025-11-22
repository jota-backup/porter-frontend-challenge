import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useFilterStore } from "./store/useFilterStore";
import { AllCharactersContainer } from "./ui/components/AllCharactersContainer";
import { ErrorBoundary } from "./ui/components/ErrorBoundary";
import { FavoritesContainer } from "./ui/components/FavoritesContainer";
import { FilterSection } from "./ui/components/FilterSection";
import { Heading } from "./ui/components/Heading";
import { Layout } from "./ui/components/Layout";
import { Spinner } from "./ui/components/Spinner";

function App() {
	const { activeFilter } = useFilterStore();

	return (
		<>
			<Toaster position="bottom-right" />
			<Layout>
				<Heading />
				<FilterSection />
				<ErrorBoundary>
					{activeFilter === "all" ? (
						<Suspense fallback={<Spinner />}>
							<AllCharactersContainer />
						</Suspense>
					) : (
						<FavoritesContainer />
					)}
				</ErrorBoundary>
			</Layout>
		</>
	);
}

export default App;
