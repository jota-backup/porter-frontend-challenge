import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useCharacters } from "../../../hooks/useCharacters";
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

export const CharacterList = () => {
	const { t } = useTranslation();
	const [isPending, startTransition] = useTransition();
	const { characters, paginationInfo, setPage } = useCharacters();

	const handlePageChange = (page: number) => {
		startTransition(() => {
			setPage(page);
		});
	};

	if (characters.length === 0) {
		return <EmptyMessage>{t("dashboard.characterList.empty")}</EmptyMessage>;
	}

	return (
		<Container>
			<Pagination
				currentPage={paginationInfo.currentPage}
				totalPages={paginationInfo.pages}
				onPageChange={handlePageChange}
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
