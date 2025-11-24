import { useTransition } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterListView } from "@/ui/components/CharacterListView";

export const AllCharactersContainer = () => {
	const [isPending, startTransition] = useTransition();
	const { characters, paginationInfo, setPage } = useCharacters();

	const handlePageChange = (page: number) => {
		startTransition(() => {
			setPage(page);
		});
	};

	return (
		<CharacterListView
			characters={characters}
			paginationInfo={{
				currentPage: paginationInfo.currentPage,
				totalPages: paginationInfo.pages,
			}}
			onPageChange={handlePageChange}
			isPending={isPending}
		/>
	);
};
