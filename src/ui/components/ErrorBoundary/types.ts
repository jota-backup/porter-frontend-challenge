import type { ReactNode } from "react";
import type { WithTranslation } from "react-i18next";

export interface ErrorBoundaryProps extends WithTranslation {
	children: ReactNode;
	fallback?: ReactNode;
}

export interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}
