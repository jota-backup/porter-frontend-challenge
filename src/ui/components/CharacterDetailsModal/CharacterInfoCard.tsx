import styled from "styled-components";
import type { CharacterInfoCardProps } from "./types";

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
	background-color: ${({ theme }) => theme.colors.overlay.primary};
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

export const CharacterInfoCard = ({
	icon: Icon,
	label,
	value,
}: CharacterInfoCardProps) => {
	return (
		<InfoItem>
			<InfoLabel>
				<IconCircle>
					<Icon size={16} />
				</IconCircle>
				{label}
			</InfoLabel>
			<InfoValue>{value}</InfoValue>
		</InfoItem>
	);
};
