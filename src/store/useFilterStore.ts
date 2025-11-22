import { create } from "zustand";

export type FilterType = "all" | "favorites";

interface FilterState {
	searchName: string;
	activeFilter: FilterType;
	setSearchName: (name: string) => void;
	setActiveFilter: (filter: FilterType) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	searchName: "",
	activeFilter: "all",
	setSearchName: (name) => set({ searchName: name }),
	setActiveFilter: (filter) => set({ activeFilter: filter }),
}));
