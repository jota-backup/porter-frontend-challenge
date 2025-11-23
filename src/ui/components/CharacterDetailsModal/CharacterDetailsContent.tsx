import { useSuspenseQuery } from "@apollo/client/react";
import { Dna, Globe, Heart, MapPin, Monitor, User2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFavorite } from "../../../hooks/useFavorite";
import { GET_CHARACTER_DETAILS } from "../../../graphql/queries/getCharacterDetails";
import type {
	BaseCharacterFragment,
	GetCharacterDetailsQuery,
	GetCharacterDetailsQueryVariables,
} from "../../../types/__generated__/graphql";
import { Spinner } from "../Spinner";

interface CharacterDetailsContentProps {
	characterId: string;
}

const Content = styled.div``;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	height: 320px;
	overflow: hidden;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const ImageOverlay = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 2rem 1.5rem 1.5rem;
	background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`;

const Name = styled.h2`
	font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
	font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
	color: white;
	margin: 0 0 0.75rem 0;
`;

const BadgeGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const StatusBadge = styled.span<{ $status: string }>`
	display: inline-block;
	padding: 0.375rem 0.875rem;
	border-radius: 0.5rem;
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
	background-color: ${({ theme, $status }) => {
		switch ($status.toLowerCase()) {
			case "alive":
				return theme.colors.success;
			case "dead":
				return theme.colors.error;
			default:
				return theme.colors.gray[500];
		}
	}};
	color: ${({ theme }) => theme.colors.text.inverse};
	text-transform: capitalize;
`;

const SpeciesText = styled.span`
	font-size: ${({ theme }) => theme.typography.fontSize.base};
	color: white;
`;

const FavoriteButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 4.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border: none;
	background-color: rgba(255, 255, 255, 0.9);
	cursor: pointer;
	border-radius: 50%;
	transition: all 0.2s ease;
	z-index: 20;
	box-shadow: ${({ theme }) => theme.shadows.md};

	&:hover {
		background-color: white;
		transform: scale(1.05);
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.primary.default};
		outline-offset: 2px;
	}
`;

const InfoSection = styled.div`
	padding: 1.5rem;
`;

const InfoGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 1.25rem;
	background-color: ${({ theme }) => theme.colors.background.secondary};
	border-radius: 0.75rem;
	border: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const InfoLabel = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const IconCircle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	border-radius: 0.5rem;
	background-color: rgba(99, 102, 241, 0.1);
	color: ${({ theme }) => theme.colors.primary.default};

	svg {
		color: ${({ theme }) => theme.colors.primary.default};
	}
`;

const InfoValue = styled.div`
	font-size: ${({ theme }) => theme.typography.fontSize.base};
	font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
	color: ${({ theme }) => theme.colors.text.primary};
	padding-left: 2.5rem;
`;

const EpisodesCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.5rem;
	background-color: ${({ theme }) => theme.colors.background.secondary};
	border-radius: 0.75rem;
	border: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const EpisodesInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const EpisodeIconCircle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3rem;
	height: 3rem;
	border-radius: 0.75rem;
	background-color: ${({ theme }) => theme.colors.primary.default};
	color: white;
`;

const EpisodesText = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

const EpisodeLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const EpisodeCount = styled.span`
	font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
	font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
	color: ${({ theme }) => theme.colors.text.primary};
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
	const { isFavorite: isCharacterFavorite, toggleFavorite } = useFavorite(
		character as BaseCharacterFragment | null | undefined,
	);

	if (!character) return null;

	const name = character.name ?? t("dashboard.characterCard.unknownName");
	const status = character.status ?? t("dashboard.characterCard.unknownStatus");
	const image = character.image ?? "";
	const species = character.species ?? <Spinner size="small" />;

	return (
		<Content>
			<ImageContainer>
				<Image src={image} alt={name} />
				<FavoriteButton
					type="button"
					onClick={toggleFavorite}
					aria-label={
						isCharacterFavorite
							? `Remove ${name} from favorites`
							: `Add ${name} to favorites`
					}
				>
					<Heart
						size={20}
						color="#EF4444"
						fill={isCharacterFavorite ? "#EF4444" : "none"}
					/>
				</FavoriteButton>
				<ImageOverlay>
					<Name id="character-name">{name}</Name>
					<BadgeGroup>
						<StatusBadge $status={status}>{status}</StatusBadge>
						<SpeciesText>{species}</SpeciesText>
					</BadgeGroup>
				</ImageOverlay>
			</ImageContainer>

			<InfoSection>
				<InfoGrid>
					<InfoItem>
						<InfoLabel>
							<IconCircle>
								<Dna size={16} />
							</IconCircle>
							{t("dashboard.characterModal.species")}
						</InfoLabel>
						<InfoValue>
							{character.species ?? <Spinner size="small" />}
						</InfoValue>
					</InfoItem>

					<InfoItem>
						<InfoLabel>
							<IconCircle>
								<User2 size={16} />
							</IconCircle>
							{t("dashboard.characterModal.gender")}
						</InfoLabel>
						<InfoValue>
							{character.gender ?? <Spinner size="small" />}
						</InfoValue>
					</InfoItem>

					<InfoItem>
						<InfoLabel>
							<IconCircle>
								<MapPin size={16} />
							</IconCircle>
							{t("dashboard.characterModal.location")}
						</InfoLabel>
						<InfoValue>
							{character.location?.name ?? <Spinner size="small" />}
						</InfoValue>
					</InfoItem>

					<InfoItem>
						<InfoLabel>
							<IconCircle>
								<Globe size={16} />
							</IconCircle>
							{t("dashboard.characterModal.origin")}
						</InfoLabel>
						<InfoValue>
							{character.origin?.name ||
								t("dashboard.characterCard.unknownOrigin")}
						</InfoValue>
					</InfoItem>
				</InfoGrid>

				<EpisodesCard>
					<EpisodesInfo>
						<EpisodeIconCircle>
							<Monitor size={24} />
						</EpisodeIconCircle>
						<EpisodesText>
							<EpisodeLabel>
								{t("dashboard.characterModal.featuredIn")}
							</EpisodeLabel>
							{character.episode ? (
								<EpisodeCount>
									{character.episode.length}{" "}
									{t(
										character.episode.length === 1
											? "dashboard.characterModal.episode"
											: "dashboard.characterModal.episodes",
									)}
								</EpisodeCount>
							) : (
								<Spinner size="small" />
							)}
						</EpisodesText>
					</EpisodesInfo>
				</EpisodesCard>
			</InfoSection>
		</Content>
	);
};
