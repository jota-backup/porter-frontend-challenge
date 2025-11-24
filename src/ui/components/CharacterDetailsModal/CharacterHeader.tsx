import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import { StatusBadge } from "@/ui/components/StatusBadge";
import type { CharacterHeaderProps } from "./types";

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
	background-color: ${({ theme }) => theme.colors.overlay.light};
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

const ImageOverlay = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 2rem 1.5rem 1.5rem;
	background: linear-gradient(to top, ${({ theme }) => theme.colors.overlay.darkStrong}, transparent);
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

const StyledStatusBadge = styled(StatusBadge)`
	display: inline-block;
	padding: 0.375rem 0.875rem;
	border-radius: 0.5rem;
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const SpeciesText = styled.span`
	font-size: ${({ theme }) => theme.typography.fontSize.base};
	color: white;
`;

export const CharacterHeader = ({
	name,
	image,
	status,
	species,
	isFavorite,
	onToggleFavorite,
}: CharacterHeaderProps) => {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<ImageContainer>
			<Image src={image} alt={name} />
			<FavoriteButton
				type="button"
				onClick={onToggleFavorite}
				aria-label={
					isFavorite
						? t("dashboard.characterCard.removeFromFavorites", { name })
						: t("dashboard.characterCard.addToFavorites", { name })
				}
			>
				<Heart
					size={20}
					color={theme.colors.heart}
					fill={isFavorite ? theme.colors.heart : "none"}
				/>
			</FavoriteButton>
			<ImageOverlay>
				<Name id="character-name">{name}</Name>
				<BadgeGroup>
					<StyledStatusBadge status={status} />
					<SpeciesText>{species}</SpeciesText>
				</BadgeGroup>
			</ImageOverlay>
		</ImageContainer>
	);
};
