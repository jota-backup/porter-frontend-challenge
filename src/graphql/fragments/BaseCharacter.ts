import { gql } from "@apollo/client";

export const BASE_CHARACTER_FRAGMENT = gql`
	fragment BaseCharacter on Character {
		id
		name
		status
		origin {
			name
		}
	}
`;
