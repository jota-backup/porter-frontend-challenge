import { useTranslation } from "react-i18next";
import styled from "styled-components";
import type { BaseCharacterFragment } from "../../../types/__generated__/graphql";
import { CharacterCard } from "../CharacterCard";
import { CharacterGrid } from "../CharacterGrid";
import { Pagination } from "../Pagination";

const Container = styled.div`
	width: 100%;
`;

const EmptyMessage = styled.div`
	text-align: center;
	padding: 3rem;
	font-size: ${({ theme }) => theme.typography.fontSize.lg};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

interface CharacterListViewProps {
	characters: BaseCharacterFragment[];
	paginationInfo: {
		currentPage: number;
		totalPages: number;
	};
	onPageChange: (page: number) => void;
	isPending?: boolean;
}

export const CharacterListView = ({
	characters,
	paginationInfo,
	onPageChange,
	isPending = false,
}: CharacterListViewProps) => {
	const { t } = useTranslation();

	if (characters.length === 0) {
		return <EmptyMessage>{t("dashboard.characterList.empty")}</EmptyMessage>;
	}

	return (
		<Container>
			<Pagination
				currentPage={paginationInfo.currentPage}
				totalPages={paginationInfo.totalPages}
				onPageChange={onPageChange}
				isPending={isPending}
			/>
			<CharacterGrid>
				{characters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</CharacterGrid>
		</Container>
	);
};
