import { Heart, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import { useFavorite } from "../../../hooks/useFavorite";
import { useModalStore } from "../../../store/useModalStore";
import type { BaseCharacterFragment } from "../../../types/__generated__/graphql";
import { StatusBadge } from "../StatusBadge";

interface CharacterCardProps {
	character: BaseCharacterFragment;
}

const Card = styled.div`
	cursor: pointer;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background.primary};
	border-radius: 0.75rem;
	box-shadow: ${({ theme }) => theme.shadows.sm};
	transition: box-shadow 0.2s ease;
	padding: 1.25rem;

	&:hover {
		box-shadow: ${({ theme }) => theme.shadows.md};
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.primary.default};
		outline-offset: 2px;
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

const PositionedStatusBadge = styled(StatusBadge)`
	position: absolute;
	bottom: 0.75rem;
	left: 0.75rem;
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
	const theme = useTheme();
	const { openCharacterModal } = useModalStore();
	const { isFavorite: isCharacterFavorite, toggleFavorite } =
		useFavorite(character);

	const handleCardClick = () => {
		if (character.id) {
			openCharacterModal(character.id);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleCardClick();
		}
	};

	const name = character.name ?? t("dashboard.characterCard.unknownName");
	const status = character.status ?? t("dashboard.characterCard.unknownStatus");
	const image = character.image ?? "";

	return (
		<Card
			role="button"
			tabIndex={0}
			onClick={handleCardClick}
			onKeyDown={handleKeyDown}
			aria-label={`View details for ${name}`}
		>
			<ImageContainer>
				<Image src={image} alt={name} />
				<HeartButton type="button" onClick={toggleFavorite}>
					<Heart
						size={20}
						color={theme.colors.heart}
						fill={isCharacterFavorite ? theme.colors.heart : "none"}
					/>
				</HeartButton>
				<PositionedStatusBadge status={status} />
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
