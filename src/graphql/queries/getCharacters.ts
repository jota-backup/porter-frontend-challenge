import { gql } from "@apollo/client";
import { BASE_CHARACTER_FRAGMENT } from "../fragments/BaseCharacter";

export const GET_CHARACTERS = gql`
	${BASE_CHARACTER_FRAGMENT}
	query GetCharacters($name: String, $page: Int) {
		characters(filter: { name: $name }, page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				...BaseCharacter
			}
		}
	}
`;
