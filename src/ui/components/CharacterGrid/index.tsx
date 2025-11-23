import styled from "styled-components";
import type { CharacterGridProps } from "./types";

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 1.5rem;
	width: 100%;
`;

export const CharacterGrid = ({ children }: CharacterGridProps) => {
	return <Grid>{children}</Grid>;
};
