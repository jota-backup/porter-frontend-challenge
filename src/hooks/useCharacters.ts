import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { GET_CHARACTERS } from "../graphql/queries/getCharacters";
import { useFilterStore } from "../store/useFilterStore";
import type {
	GetCharactersQuery,
	GetCharactersQueryVariables,
} from "../types/__generated__/graphql";

export const useCharacters = (variables?: GetCharactersQueryVariables) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { searchName } = useFilterStore();
	const [debouncedSearchName] = useDebounce(searchName, 500);

	const { data } = useSuspenseQuery<
		GetCharactersQuery,
		GetCharactersQueryVariables
	>(GET_CHARACTERS, {
		variables: {
			...variables,
			name: debouncedSearchName || undefined,
			page: currentPage,
		},
	});

	const results = data?.characters?.results ?? [];

	// Filter out completely null entries from the array. This is necessary to achieve type safety given the nullable properties coming from the API Schema that we leverage to generate our types with Codegen.
	const characters = results.filter((character) => character !== null);

	const info = data?.characters?.info;

	return {
		characters,
		paginationInfo: {
			count: info?.count ?? 0,
			pages: info?.pages ?? 0,
			next: info?.next ?? null,
			prev: info?.prev ?? null,
			currentPage,
		},
		setPage: setCurrentPage,
	};
};
