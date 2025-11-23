import { create } from "zustand";

interface ModalState {
	isModalOpen: boolean;
	selectedCharacterId: string | null;
	openCharacterModal: (id: string) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isModalOpen: false,
	selectedCharacterId: null,
	openCharacterModal: (id) =>
		set({ isModalOpen: true, selectedCharacterId: id }),
	closeModal: () => set({ isModalOpen: false, selectedCharacterId: null }),
}));
