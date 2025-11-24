import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/ui/theme";

export const renderWithTheme = (component: React.ReactElement) => {
	return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};
