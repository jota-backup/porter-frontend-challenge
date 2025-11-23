import { Monitor } from "lucide-react";
import styled from "styled-components";
import type { CharacterEpisodesProps } from "./types";

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

export const CharacterEpisodes = ({ label, count }: CharacterEpisodesProps) => {
	return (
		<EpisodesCard>
			<EpisodesInfo>
				<EpisodeIconCircle>
					<Monitor size={24} />
				</EpisodeIconCircle>
				<EpisodesText>
					<EpisodeLabel>{label}</EpisodeLabel>
					<EpisodeCount>{count}</EpisodeCount>
				</EpisodesText>
			</EpisodesInfo>
		</EpisodesCard>
	);
};
