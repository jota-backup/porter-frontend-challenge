import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BaseCharacterFragment } from "@/types/__generated__/graphql";

export type FavoriteCharacter = BaseCharacterFragment & {
	savedAt: number;
};

interface FavoritesState {
	favorites: Map<string, FavoriteCharacter>;
	addFavorite: (character: BaseCharacterFragment) => void;
	removeFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
	getFavorites: () => FavoriteCharacter[];
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: new Map<string, FavoriteCharacter>(),
			addFavorite: (character) => {
				if (!character.id) return;

				set((state) => {
					const newFavorites = new Map(state.favorites);
					newFavorites.set(character.id as string, {
						...character,
						savedAt: Date.now(),
					});
					return { favorites: newFavorites };
				});
			},
			removeFavorite: (id) => {
				set((state) => {
					const newFavorites = new Map(state.favorites);
					newFavorites.delete(id);
					return { favorites: newFavorites };
				});
			},
			isFavorite: (id) => get().favorites.has(id),
			getFavorites: () => Array.from(get().favorites.values()),
		}),
		{
			name: "favorites-storage",
			storage: {
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;
					const { state } = JSON.parse(str);
					return {
						state: {
							...state,
							favorites: new Map(state.favorites),
						},
					};
				},
				setItem: (name, value) => {
					const str = JSON.stringify({
						state: {
							...value.state,
							favorites: Array.from(value.state.favorites.entries()),
						},
					});
					localStorage.setItem(name, str);
				},
				removeItem: (name) => localStorage.removeItem(name),
			},
		},
	),
);
