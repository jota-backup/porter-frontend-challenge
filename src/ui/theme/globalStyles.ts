import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	body {
		font-family: ${({ theme }) => theme.typography.fontFamily};
	}
`;
