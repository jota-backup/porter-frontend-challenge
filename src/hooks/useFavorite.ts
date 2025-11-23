import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "../store/useFavoritesStore";
import type { BaseCharacterFragment } from "../types/__generated__/graphql";

export const useFavorite = (
	character: BaseCharacterFragment | null | undefined,
) => {
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
	const { t } = useTranslation();

	const isCharacterFavorite = character?.id ? isFavorite(character.id) : false;

	const toggleFavorite = (e?: React.MouseEvent) => {
		e?.stopPropagation();

		if (!character?.id) return;

		const characterName =
			character.name || t("dashboard.characterCard.unknownName");

		if (isCharacterFavorite) {
			removeFavorite(character.id);
			toast.success(`${characterName} removed from favorites`);
		} else {
			addFavorite(character);
			toast.success(`${characterName} added to favorites`);
		}
	};

	return {
		isFavorite: isCharacterFavorite,
		toggleFavorite,
	};
};
