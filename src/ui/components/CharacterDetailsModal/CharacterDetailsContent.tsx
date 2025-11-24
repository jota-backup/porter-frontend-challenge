import { useSuspenseQuery } from "@apollo/client/react";
import { Dna, Globe, MapPin, User2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { GET_CHARACTER_DETAILS } from "@/graphql/queries/getCharacterDetails";
import { useFavoriteCharacter } from "@/hooks/useFavoriteCharacter";
import type {
	BaseCharacterFragment,
	GetCharacterDetailsQuery,
	GetCharacterDetailsQueryVariables,
} from "@/types/__generated__/graphql";
import { Spinner } from "@/ui/components/Spinner";
import { CharacterEpisodes } from "./CharacterEpisodes";
import { CharacterHeader } from "./CharacterHeader";
import { CharacterInfoCard } from "./CharacterInfoCard";
import type { CharacterDetailsContentProps } from "./types";

const Content = styled.div``;

const InfoSection = styled.div`
	padding: 1.5rem;
`;

const InfoGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

export const CharacterDetailsContent = ({
	characterId,
}: CharacterDetailsContentProps) => {
	const { t } = useTranslation();
	const { data } = useSuspenseQuery<
		GetCharacterDetailsQuery,
		GetCharacterDetailsQueryVariables
	>(GET_CHARACTER_DETAILS, {
		variables: { id: characterId },
		returnPartialData: true,
	});

	const character = data?.character;

	const { isCharacterFavorite, toggleFavorite } = useFavoriteCharacter({
		character: character as BaseCharacterFragment,
	});

	if (!character) {
		return null;
	}

	const name = character.name ?? t("dashboard.characterCard.unknownName");
	const status = character.status ?? t("dashboard.characterCard.unknownStatus");
	const image = character.image ?? "";
	const species = character.species ?? <Spinner size="small" />;

	const episodeCount = character.episode ? (
		<>
			{character.episode.length}{" "}
			{t(
				character.episode.length === 1
					? "dashboard.characterModal.episode"
					: "dashboard.characterModal.episodes",
			)}
		</>
	) : (
		<Spinner size="small" />
	);

	return (
		<Content>
			<CharacterHeader
				name={name}
				image={image}
				status={status}
				species={species}
				isFavorite={isCharacterFavorite}
				onToggleFavorite={toggleFavorite}
			/>

			<InfoSection>
				<InfoGrid>
					<CharacterInfoCard
						icon={Dna}
						label={t("dashboard.characterModal.species")}
						value={character.species ?? <Spinner size="small" />}
					/>

					<CharacterInfoCard
						icon={User2}
						label={t("dashboard.characterModal.gender")}
						value={character.gender ?? <Spinner size="small" />}
					/>

					<CharacterInfoCard
						icon={MapPin}
						label={t("dashboard.characterModal.location")}
						value={character.location?.name ?? <Spinner size="small" />}
					/>

					<CharacterInfoCard
						icon={Globe}
						label={t("dashboard.characterModal.origin")}
						value={
							character.origin?.name ||
							t("dashboard.characterCard.unknownOrigin")
						}
					/>
				</InfoGrid>

				<CharacterEpisodes
					label={t("dashboard.characterModal.featuredIn")}
					count={episodeCount}
				/>
			</InfoSection>
		</Content>
	);
};
