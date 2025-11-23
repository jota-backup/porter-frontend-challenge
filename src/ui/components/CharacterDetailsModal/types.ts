import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface CharacterDetailsContentProps {
	characterId: string;
}

export interface CharacterHeaderProps {
	name: string;
	image: string;
	status: string;
	species: ReactNode;
	isFavorite: boolean;
	onToggleFavorite: () => void;
}

export interface CharacterEpisodesProps {
	label: string;
	count: ReactNode;
}

export interface CharacterInfoCardProps {
	icon: LucideIcon;
	label: string;
	value: ReactNode;
}

export interface InfoRowProps {
	label: string;
	value: ReactNode;
}
