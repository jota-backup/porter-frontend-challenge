import type { BaseCharacterFragment } from "@/types/__generated__/graphql";

export interface CharacterListViewProps {
	characters: BaseCharacterFragment[];
	paginationInfo: {
		currentPage: number;
		totalPages: number;
	};
	onPageChange: (page: number) => void;
	isPending?: boolean;
}
