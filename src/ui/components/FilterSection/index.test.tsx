import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderWithTheme } from "@/test/utils";

const mockSetSearchName = vi.fn();
const mockSetActiveFilter = vi.fn();
let mockSearchName = "";
let mockActiveFilter = "all";

vi.mock("@/store/useFilterStore", () => ({
	useFilterStore: () => ({
		searchName: mockSearchName,
		activeFilter: mockActiveFilter,
		setSearchName: mockSetSearchName,
		setActiveFilter: mockSetActiveFilter,
	}),
}));

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				"dashboard.filter.searchPlaceholder": "Search by name...",
				"dashboard.filter.allUsers": "All Users",
				"dashboard.filter.favorites": "Favorites",
			};
			return translations[key] || key;
		},
	}),
}));

const { FilterSection } = await import("./index");

beforeEach(() => {
	vi.clearAllMocks();
	mockSearchName = "";
	mockActiveFilter = "all";
});

describe("FilterSection", () => {
	describe("Rendering", () => {
		test("renders search input with correct placeholder", () => {
			const { container } = renderWithTheme(<FilterSection />);

			const searchInput = container.querySelector(
				'input[placeholder="Search by name..."]',
			);
			expect(searchInput).not.toBeNull();
			expect(searchInput).toHaveAttribute("type", "text");
		});

		test("renders both filter buttons", () => {
			renderWithTheme(<FilterSection />);

			expect(screen.getByText("All Users")).toBeInTheDocument();
			expect(screen.getByText("Favorites")).toBeInTheDocument();
		});

		test("renders toggle group with both buttons", () => {
			const { container } = renderWithTheme(<FilterSection />);

			const buttons = container.querySelectorAll("button");
			expect(buttons.length).toBe(2);
		});
	});

	describe("Search Input Functionality", () => {
		test("displays current search value from store", () => {
			mockSearchName = "Rick";
			const { container } = renderWithTheme(<FilterSection />);

			const searchInput = container.querySelector(
				'input[type="text"]',
			) as HTMLInputElement;
			expect(searchInput).not.toBeNull();
			expect(searchInput?.value).toBe("Rick");
		});

		test("calls setSearchName when user types in search input", async () => {
			const user = userEvent.setup();
			const { container } = renderWithTheme(<FilterSection />);

			const searchInput = container.querySelector(
				'input[type="text"]',
			) as HTMLInputElement;
			expect(searchInput).not.toBeNull();

			await user.type(searchInput, "Morty");

			expect(mockSetSearchName).toHaveBeenCalled();
			expect(mockSetSearchName).toHaveBeenCalledTimes(5);
		});
	});

	describe("Filter Buttons Functionality", () => {
		test("calls setActiveFilter with 'all' when All Users button is clicked", async () => {
			const user = userEvent.setup();
			renderWithTheme(<FilterSection />);

			const allUsersButton = screen.getByText("All Users");
			await user.click(allUsersButton);

			expect(mockSetActiveFilter).toHaveBeenCalledWith("all");
			expect(mockSetActiveFilter).toHaveBeenCalledTimes(1);
		});

		test("calls setActiveFilter with 'favorites' when Favorites button is clicked", async () => {
			const user = userEvent.setup();
			renderWithTheme(<FilterSection />);

			const favoritesButton = screen.getByText("Favorites");
			await user.click(favoritesButton);

			expect(mockSetActiveFilter).toHaveBeenCalledWith("favorites");
			expect(mockSetActiveFilter).toHaveBeenCalledTimes(1);
		});

		test("buttons contain correct text content", () => {
			const { container } = renderWithTheme(<FilterSection />);

			const buttons = container.querySelectorAll("button");
			const buttonTexts = Array.from(buttons).map((btn) =>
				btn.textContent?.trim(),
			);

			expect(buttonTexts).toContain("All Users");
			expect(buttonTexts).toContain("Favorites");
		});
	});
});
