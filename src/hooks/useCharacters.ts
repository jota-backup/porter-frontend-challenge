import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "../graphql/queries/getCharacters";
import type {
	GetCharactersQuery,
	GetCharactersQueryVariables,
} from "../types/__generated__/graphql";

export const useCharacters = (variables?: GetCharactersQueryVariables) => {
	const { data, loading, error } = useQuery<
		GetCharactersQuery,
		GetCharactersQueryVariables
	>(GET_CHARACTERS, {
		variables,
	});

	const results = data?.characters?.results ?? [];

	// Filter out completely null entries from the array. This is necessary to achieve type safety given the nullable properties coming from the API Schema that we leverage to generate our types with Codegen.
	const characters = results.filter((character) => character !== null);

	return {
		characters,
		loading,
		error,
	};
};
