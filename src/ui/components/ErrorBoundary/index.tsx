import { Component } from "react";
import { withTranslation } from "react-i18next";
import styled from "styled-components";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

const ErrorContainer = styled.div`
	text-align: center;
	padding: 3rem;
`;

const ErrorTitle = styled.h2`
	font-size: ${({ theme }) => theme.typography.fontSize.xl};
	font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
	color: ${({ theme }) => theme.colors.error};
	margin: 0 0 1rem 0;
`;

const ErrorMessage = styled.p`
	font-size: ${({ theme }) => theme.typography.fontSize.base};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
`;

class ErrorBoundaryComponent extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<ErrorContainer>
					<ErrorTitle>{this.props.t("dashboard.error.title")}</ErrorTitle>
					<ErrorMessage>{this.props.t("dashboard.error.message")}</ErrorMessage>
				</ErrorContainer>
			);
		}

		return this.props.children;
	}
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
