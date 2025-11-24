import { useState } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useFilterStore } from "@/store/useFilterStore";
import { CharacterListView } from "@/ui/components/CharacterListView";

const ITEMS_PER_PAGE = 20;

export const FavoritesContainer = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { getFavorites } = useFavoritesStore();
	const { searchName } = useFilterStore();

	const allFavorites = getFavorites();

	const filteredFavorites = searchName
		? allFavorites.filter((char) =>
				char.name?.toLowerCase().includes(searchName.toLowerCase()),
			)
		: allFavorites;

	const totalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE) || 1;
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedCharacters = filteredFavorites.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<CharacterListView
			characters={paginatedCharacters}
			paginationInfo={{
				currentPage,
				totalPages,
			}}
			onPageChange={handlePageChange}
			isPending={false}
		/>
	);
};
