import styled from "styled-components";
import { Nav } from "@/ui/components/Nav";
import type { LayoutProps } from "./types";

const LayoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const Header = styled.header`
	background-color: ${({ theme }) => theme.colors.background.primary};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
	padding: 1rem 2rem;
`;

const Main = styled.main`
	flex: 1;
	padding: 2rem;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

export const Layout = ({ children }: LayoutProps) => {
	return (
		<LayoutContainer>
			<Header>
				<Nav />
			</Header>
			<Main>{children}</Main>
		</LayoutContainer>
	);
};
