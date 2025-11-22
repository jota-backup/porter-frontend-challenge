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

	return {
		characters: data?.characters?.results ?? [],
		loading,
		error,
	};
};
