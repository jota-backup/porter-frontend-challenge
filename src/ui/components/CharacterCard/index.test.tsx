import { ThemeProvider } from "styled-components";
import { beforeEach, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import type { BaseCharacterFragment } from "@/types/__generated__/graphql";
import { theme } from "@/ui/theme";

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

const renderWithTheme = async (component: React.ReactElement) => {
	return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

beforeEach(() => {
	vi.clearAllMocks();
	mockHasFavorite.mockReturnValue(false);
	mockToastSuccess.mockClear();
});

test("renders character information correctly", async () => {
	const { getByText } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	await expect.element(getByText("Rick Sanchez")).toBeInTheDocument();
	await expect.element(getByText("Earth (C-137)")).toBeInTheDocument();
});

test("renders character image with correct alt text", async () => {
	const { getByAltText } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const image = getByAltText("Rick Sanchez");
	await expect.element(image).toBeInTheDocument();
	await expect.element(image).toHaveAttribute("src", mockCharacter.image);
});

test("displays unknown text when character data is missing", async () => {
	const incompleteCharacter: BaseCharacterFragment = {
		__typename: "Character",
		id: "2",
		name: null,
		status: null,
		image: null,
		origin: null,
	};

	const { getByText } = await renderWithTheme(
		<CharacterCard character={incompleteCharacter} />,
	);

	await expect.element(getByText("Unknown Name")).toBeInTheDocument();
	await expect.element(getByText("Unknown Origin")).toBeInTheDocument();
});

test("opens character modal when card is clicked", async () => {
	const screen = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	await card.click();

	expect(mockOpenCharacterModal).toHaveBeenCalledWith("1");
	expect(mockOpenCharacterModal).toHaveBeenCalledTimes(1);
});

test("opens modal when Enter key is pressed", async () => {
	const { container } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const card = container.querySelector('[role="button"]');
	expect(card).not.toBeNull();

	const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
	card?.dispatchEvent(event);

	expect(mockOpenCharacterModal).toHaveBeenCalledWith("1");
});

test("opens modal when Space key is pressed", async () => {
	const { container } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const card = container.querySelector('[role="button"]');
	expect(card).not.toBeNull();

	const event = new KeyboardEvent("keydown", { key: " ", bubbles: true });
	card?.dispatchEvent(event);

	expect(mockOpenCharacterModal).toHaveBeenCalledWith("1");
});

test("adds character to favorites when heart button is clicked", async () => {
	mockHasFavorite.mockReturnValue(false);

	const { container } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const heartButton = container.querySelector("button");
	expect(heartButton).not.toBeNull();
	heartButton?.click();

	expect(mockAddFavorite).toHaveBeenCalledWith(mockCharacter);
	expect(mockAddFavorite).toHaveBeenCalledTimes(1);
	expect(mockOpenCharacterModal).not.toHaveBeenCalled();
});

test("removes character from favorites when already favorited", async () => {
	mockHasFavorite.mockReturnValue(true);

	const { container } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const heartButton = container.querySelector("button");
	heartButton?.click();

	expect(mockRemoveFavorite).toHaveBeenCalledWith("1");
	expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
	expect(mockOpenCharacterModal).not.toHaveBeenCalled();
});

test("heart button click does not trigger card click (event propagation)", async () => {
	const { container } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const heartButton = container.querySelector("button");
	heartButton?.click();

	expect(mockOpenCharacterModal).not.toHaveBeenCalled();
});

test("renders StatusBadge with correct status", async () => {
	const { getByText } = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	await expect.element(getByText("Alive")).toBeInTheDocument();
});

test("handles character without id gracefully", async () => {
	const characterNoId: BaseCharacterFragment = {
		...mockCharacter,
		id: null,
	};

	const screen = await renderWithTheme(
		<CharacterCard character={characterNoId} />,
	);

	// Click the card (the div with role="button")
	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	await card.click();
	expect(mockOpenCharacterModal).not.toHaveBeenCalled();

	// Click the heart button
	const { container } = screen;
	const heartButton = container.querySelector("button");
	heartButton?.click();
	expect(mockAddFavorite).not.toHaveBeenCalled();
	expect(mockRemoveFavorite).not.toHaveBeenCalled();
});

test("displays correct aria-label", async () => {
	const screen = await renderWithTheme(
		<CharacterCard character={mockCharacter} />,
	);

	const card = screen.getByRole("button", {
		name: "View details for Rick Sanchez",
	});
	await expect.element(card).toBeInTheDocument();
});
