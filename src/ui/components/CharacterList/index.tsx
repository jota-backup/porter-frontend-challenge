import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useCharacters } from "../../../hooks/useCharacters";
import { CharacterCard } from "../CharacterCard";
import { CharacterGrid } from "../CharacterGrid";

const Container = styled.div`
	width: 100%;
`;

const LoadingMessage = styled.div`
	text-align: center;
	padding: 3rem;
	font-size: ${({ theme }) => theme.typography.fontSize.lg};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
	text-align: center;
	padding: 3rem;
	font-size: ${({ theme }) => theme.typography.fontSize.lg};
	color: ${({ theme }) => theme.colors.error};
`;

const EmptyMessage = styled.div`
	text-align: center;
	padding: 3rem;
	font-size: ${({ theme }) => theme.typography.fontSize.lg};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const CharacterList = () => {
	const { t } = useTranslation();
	const { characters, loading, error } = useCharacters();

	if (loading) {
		return (
			<LoadingMessage>{t("dashboard.characterList.loading")}</LoadingMessage>
		);
	}

	if (error) {
		return <ErrorMessage>{t("dashboard.characterList.error")}</ErrorMessage>;
	}

	if (characters.length === 0) {
		return <EmptyMessage>{t("dashboard.characterList.empty")}</EmptyMessage>;
	}

	return (
		<Container>
			<CharacterGrid>
				{characters.map((character) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</CharacterGrid>
		</Container>
	);
};
