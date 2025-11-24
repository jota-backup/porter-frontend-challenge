import { gql } from "@apollo/client";
import { BASE_CHARACTER_FRAGMENT } from "@/graphql/fragments/BaseCharacter";

export const GET_CHARACTER_DETAILS = gql`
	${BASE_CHARACTER_FRAGMENT}
	query GetCharacterDetails($id: ID!) {
		character(id: $id) {
			...BaseCharacter
			species
			gender
			type
			location {
				name
			}
			episode {
				id
			}
			created
		}
	}
`;
