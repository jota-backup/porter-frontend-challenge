import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { BaseCharacterFragment } from "@/types/__generated__/graphql";

interface UseFavoriteCharacterOptions {
	character: BaseCharacterFragment | null | undefined;
	onAdd?: () => void;
	onRemove?: () => void;
}

export const useFavoriteCharacter = ({
	character,
	onAdd,
	onRemove,
}: UseFavoriteCharacterOptions) => {
	const isCharacterFavorite = useFavoritesStore((state) =>
		character?.id ? state.favorites.has(character.id) : false,
	);

	const addFavorite = useFavoritesStore((state) => state.addFavorite);
	const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

	const toggleFavorite = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		if (!character?.id) return;

		if (isCharacterFavorite) {
			removeFavorite(character.id);
			onRemove?.();
		} else {
			addFavorite(character as BaseCharacterFragment);
			onAdd?.();
		}
	};

	return {
		isCharacterFavorite,
		toggleFavorite,
	};
};
