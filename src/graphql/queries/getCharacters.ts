import { gql } from "@apollo/client";
import { BASE_CHARACTER_FRAGMENT } from "../fragments/BaseCharacter";

export const GET_CHARACTERS = gql`
	${BASE_CHARACTER_FRAGMENT}
	query GetCharacters($name: String) {
		characters(filter: { name: $name }) {
			results {
				...BaseCharacter
			}
		}
	}
`;
