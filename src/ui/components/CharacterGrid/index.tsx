import type { ReactNode } from "react";
import styled from "styled-components";

interface CharacterGridProps {
	children: ReactNode;
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1.5rem;
	width: 100%;
`;

export const CharacterGrid = ({ children }: CharacterGridProps) => {
	return <Grid>{children}</Grid>;
};
