import { useTranslation } from "react-i18next";
import { Layout } from "./ui/components/Layout";

function App() {
	const { t } = useTranslation();

	return (
		<Layout>
			<h1>{t("hello")}</h1>
		</Layout>
	);
}

export default App;
