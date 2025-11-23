import { X } from "lucide-react";
import { Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { useModalStore } from "../../../store/useModalStore";
import { ErrorBoundary } from "../ErrorBoundary";
import { Spinner } from "../Spinner";
import { CharacterDetailsContent } from "./CharacterDetailsContent";

const Dialog = styled.dialog`
	border: none;
	border-radius: 1rem;
	padding: 0;
	max-width: 600px;
	width: 90vw;
	max-height: 90vh;
	overflow-y: auto;
	box-shadow: ${({ theme }) => theme.shadows.lg};
	margin: auto;
	position: fixed;
	inset: 0;

	&::backdrop {
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}
`;

const CloseButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border: none;
	background-color: rgba(255, 255, 255, 0.9);
	color: ${({ theme }) => theme.colors.text.secondary};
	cursor: pointer;
	border-radius: 50%;
	transition: all 0.2s ease;
	z-index: 20;
	box-shadow: ${({ theme }) => theme.shadows.md};

	&:hover {
		background-color: white;
		color: ${({ theme }) => theme.colors.text.primary};
	}

	&:focus-visible {
		outline: 2px solid ${({ theme }) => theme.colors.primary.default};
		outline-offset: 2px;
	}
`;

export const CharacterDetailsModal = () => {
	const { isModalOpen, selectedCharacterId, closeModal } = useModalStore();
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isModalOpen && !dialog.open) {
			dialog.showModal();
		} else if (!isModalOpen && dialog.open) {
			dialog.close();
		}

		return () => {
			if (dialog.open) {
				dialog.close();
			}
		};
	}, [isModalOpen]);

	const handleCancel = (e: React.SyntheticEvent) => {
		e.preventDefault();
		closeModal();
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			closeModal();
		}
	};

	if (!isModalOpen || !selectedCharacterId) return null;

	return (
		<Dialog
			ref={dialogRef}
			onCancel={handleCancel}
			onClick={handleBackdropClick}
			aria-labelledby="character-name"
		>
			<CloseButton onClick={closeModal} aria-label="Close modal">
				<X size={20} />
			</CloseButton>

			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<CharacterDetailsContent characterId={selectedCharacterId} />
				</Suspense>
			</ErrorBoundary>
		</Dialog>
	);
};
