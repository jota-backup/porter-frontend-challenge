import { CharacterList } from "./ui/components/CharacterList";
import { Heading } from "./ui/components/Heading";
import { Layout } from "./ui/components/Layout";

function App() {
	return (
		<Layout>
			<Heading />
			<CharacterList />
		</Layout>
	);
}

export default App;
