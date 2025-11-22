import { Heart, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFavoritesStore } from "../../../store/useFavoritesStore";
import type { BaseCharacterFragment } from "../../../types/__generated__/graphql";

interface CharacterCardProps {
	character: BaseCharacterFragment;
}

const Card = styled.div`
	background-color: ${({ theme }) => theme.colors.background.primary};
	border-radius: 0.75rem;
	box-shadow: ${({ theme }) => theme.shadows.sm};
	transition: box-shadow 0.2s ease;
	padding: 1.25rem;

	&:hover {
		box-shadow: ${({ theme }) => theme.shadows.md};
	}
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 175px;
	overflow: hidden;
	background-color: ${({ theme }) => theme.colors.gray[100]};
	position: relative;
	border-radius: 0.75rem;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 0.75rem;
`;

const HeartButton = styled.button`
	position: absolute;
	top: 0.75rem;
	right: 0.75rem;
	background-color: ${({ theme }) => theme.colors.background.primary};
	border: none;
	border-radius: 50%;
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: ${({ theme }) => theme.shadows.sm};
	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.1);
	}
`;

const StatusBadge = styled.span<{ $status: string }>`
	position: absolute;
	bottom: 0.75rem;
	left: 0.75rem;
	padding: 0.25rem 0.75rem;
	border-radius: 0.375rem;
	font-size: ${({ theme }) => theme.typography.fontSize.xs};
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

const Content = styled.div`
	padding: 1rem 0 0 0;
`;

const Name = styled.h3`
	font-size: ${({ theme }) => theme.typography.fontSize.lg};
	font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0 0 0.5rem 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const Origin = styled.p`
	display: flex;
	align-items: center;
	gap: 0.375rem;
	font-size: ${({ theme }) => theme.typography.fontSize.xs};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	svg {
		flex-shrink: 0;
	}
`;

export const CharacterCard = ({ character }: CharacterCardProps) => {
	const { t } = useTranslation();
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

	const isCharacterFavorite = character.id ? isFavorite(character.id) : false;

	const toggleFavorite = () => {
		if (!character.id) return;

		const characterName = character.name || t("dashboard.characterCard.unknownName");

		if (isCharacterFavorite) {
			removeFavorite(character.id);
			toast.success(`${characterName} removed from favorites`);
		} else {
			addFavorite(character);
			toast.success(`${characterName} added to favorites`);
		}
	};

	const name = character.name ?? t("dashboard.characterCard.unknownName");
	const status = character.status ?? t("dashboard.characterCard.unknownStatus");
	const image = character.image ?? "";

	return (
		<Card>
			<ImageContainer>
				<Image src={image} alt={name} />
				<HeartButton type="button" onClick={toggleFavorite}>
					<Heart
						size={20}
						color="#EF4444"
						fill={isCharacterFavorite ? "#EF4444" : "none"}
					/>
				</HeartButton>
				<StatusBadge $status={status}>{status}</StatusBadge>
			</ImageContainer>
			<Content>
				<Name>{name}</Name>
				<Origin>
					<MapPin size={14} />
					{character.origin?.name || t("dashboard.characterCard.unknownOrigin")}
				</Origin>
			</Content>
		</Card>
	);
};
