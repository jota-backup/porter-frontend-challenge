import styled from "styled-components";
import type { StatusBadgeProps } from "./types";

const Badge = styled.span<{ $status: string }>`
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

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
	return (
		<Badge $status={status} className={className}>
			{status}
		</Badge>
	);
};
