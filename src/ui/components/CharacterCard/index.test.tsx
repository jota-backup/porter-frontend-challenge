import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";
import { renderWithTheme } from "@/test/utils";
import type { BaseCharacterFragment } from "@/types/__generated__/graphql";

const mockOpenCharacterModal = vi.fn();
const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();
const mockHasFavorite = vi.fn(() => false);
const mockToastSuccess = vi.fn();

vi.mock("@/store/useModalStore", () => ({
	useModalStore: () => ({
		openCharacterModal: mockOpenCharacterModal,
	}),
}));

vi.mock("@/store/useFavoritesStore", () => ({
	useFavoritesStore: (selector: any) => {
		const state = {
			favorites: {
				has: mockHasFavorite,
			},
			addFavorite: mockAddFavorite,
			removeFavorite: mockRemoveFavorite,
		};
		return selector(state);
	},
}));

vi.mock("react-hot-toast", () => ({
	default: {
		success: mockToastSuccess,
	},
}));

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string, params?: any) => {
			const translations: Record<string, string> = {
				"dashboard.characterCard.unknownName": "Unknown Name",
				"dashboard.characterCard.unknownStatus": "Unknown",
				"dashboard.characterCard.unknownOrigin": "Unknown Origin",
				"dashboard.characterCard.addToFavorites": `Add ${params?.name} to favorites`,
				"dashboard.characterCard.removeFromFavorites": `Remove ${params?.name} from favorites`,
				"dashboard.characterCard.addedToFavorites": `${params?.name} added to favorites`,
				"dashboard.characterCard.removedFromFavorites": `${params?.name} removed from favorites`,
				"dashboard.characterCard.viewDetails": `View details for ${params?.name}`,
			};
			return translations[key] || key;
		},
	}),
}));

const { CharacterCard } = await import("./index");

const mockCharacter: BaseCharacterFragment = {
	__typename: "Character",
	id: "1",
	name: "Rick Sanchez",
	status: "Alive",
	image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	origin: {
		__typename: "Location",
		name: "Earth (C-137)",
	},
};

beforeEach(() => {
	vi.clearAllMocks();
	mockHasFavorite.mockReturnValue(false);
	mockToastSuccess.mockClear();
});

test("renders character information correctly", () => {
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
	expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
});

test("renders character image with correct alt text", () => {
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	const image = screen.getByAltText("Rick Sanchez");
	expect(image).toBeInTheDocument();
	expect(image).toHaveAttribute("src", mockCharacter.image);
});

test("displays unknown text when character data is missing", () => {
	const incompleteCharacter: BaseCharacterFragment = {
		__typename: "Character",
		id: "2",
		name: null,
		status: null,
		image: null,
		origin: null,
	};

	renderWithTheme(<CharacterCard character={incompleteCharacter} />);

	expect(screen.getByText("Unknown Name")).toBeInTheDocument();
	expect(screen.getByText("Unknown Origin")).toBeInTheDocument();
});

test("opens character modal when card is clicked", async () => {
	const user = userEvent.setup();
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	await user.click(card);

	expect(mockOpenCharacterModal).toHaveBeenCalledWith("1");
	expect(mockOpenCharacterModal).toHaveBeenCalledTimes(1);
});

test("opens modal when Enter key is pressed", async () => {
	const user = userEvent.setup();
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	card.focus();
	await user.keyboard("{Enter}");

	expect(mockOpenCharacterModal).toHaveBeenCalledWith("1");
});

test("opens modal when Space key is pressed", async () => {
	const user = userEvent.setup();
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	card.focus();
	await user.keyboard(" ");

	expect(mockOpenCharacterModal).toHaveBeenCalledWith("1");
});

test("adds character to favorites when heart button is clicked", async () => {
	const user = userEvent.setup();
	mockHasFavorite.mockReturnValue(false);

	const { container } = renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const heartButton = container.querySelector("button");
	expect(heartButton).not.toBeNull();
	await user.click(heartButton!);

	expect(mockAddFavorite).toHaveBeenCalledWith(mockCharacter);
	expect(mockAddFavorite).toHaveBeenCalledTimes(1);
	expect(mockOpenCharacterModal).not.toHaveBeenCalled();
});

test("removes character from favorites when already favorited", async () => {
	const user = userEvent.setup();
	mockHasFavorite.mockReturnValue(true);

	const { container } = renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const heartButton = container.querySelector("button");
	await user.click(heartButton!);

	expect(mockRemoveFavorite).toHaveBeenCalledWith("1");
	expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
	expect(mockOpenCharacterModal).not.toHaveBeenCalled();
});

test("heart button click does not trigger card click (event propagation)", async () => {
	const user = userEvent.setup();
	const { container } = renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const heartButton = container.querySelector("button");
	await user.click(heartButton!);

	expect(mockOpenCharacterModal).not.toHaveBeenCalled();
});

test("renders StatusBadge with correct status", () => {
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	expect(screen.getByText("Alive")).toBeInTheDocument();
});

test("handles character without id gracefully", async () => {
	const user = userEvent.setup();
	const characterNoId: BaseCharacterFragment = {
		...mockCharacter,
		id: null,
	};

	const { container } = renderWithTheme(
		<CharacterCard character={characterNoId} />,
	);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	await user.click(card);
	expect(mockOpenCharacterModal).not.toHaveBeenCalled();

	const heartButton = container.querySelector("button");
	await user.click(heartButton!);
	expect(mockAddFavorite).not.toHaveBeenCalled();
	expect(mockRemoveFavorite).not.toHaveBeenCalled();
});

test("displays correct aria-label", () => {
	renderWithTheme(<CharacterCard character={mockCharacter} />);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	expect(card).toBeInTheDocument();
});
