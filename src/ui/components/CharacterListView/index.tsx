import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CharacterCard } from "@/ui/components/CharacterCard";
import { CharacterGrid } from "@/ui/components/CharacterGrid";
import { Pagination } from "@/ui/components/Pagination";
import type { CharacterListViewProps } from "./types";

const Container = styled.div`
	width: 100%;
`;

const EmptyMessage = styled.div`
	text-align: center;
	padding: 3rem;
	font-size: ${({ theme }) => theme.typography.fontSize.lg};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

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
