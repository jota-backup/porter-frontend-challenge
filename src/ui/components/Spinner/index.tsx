import styled, { keyframes } from "styled-components";
import type { SpinnerProps } from "./types";

const spin = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

const SpinnerContainer = styled.div<{ $size: "default" | "small" }>`
	display: inline-block;
	width: ${({ $size }) => ($size === "small" ? "1.25rem" : "2.5rem")};
	height: ${({ $size }) => ($size === "small" ? "1.25rem" : "2.5rem")};
	border: ${({ $size }) => ($size === "small" ? "2px" : "3px")} solid
		${({ theme }) => theme.colors.gray[300]};
	border-top-color: ${({ theme }) => theme.colors.primary.default};
	border-radius: 50%;
	animation: ${spin} 0.8s linear infinite;
`;

const CenteredWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 3rem;
`;

export const Spinner = ({ size = "default" }: SpinnerProps) => {
	if (size === "default") {
		return (
			<CenteredWrapper>
				<SpinnerContainer $size={size} />
			</CenteredWrapper>
		);
	}

	return <SpinnerContainer $size={size} />;
};
