import type { ReactNode } from "react";
import styled from "styled-components";

interface InfoRowProps {
	label: string;
	value: ReactNode;
}

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 0;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

	&:last-child {
		border-bottom: none;
	}
`;

const Label = styled.span`
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const Value = styled.span`
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	color: ${({ theme }) => theme.colors.text.primary};
	text-align: right;
`;

export const InfoRow = ({ label, value }: InfoRowProps) => {
	return (
		<Row>
			<Label>{label}</Label>
			<Value>{value}</Value>
		</Row>
	);
};
