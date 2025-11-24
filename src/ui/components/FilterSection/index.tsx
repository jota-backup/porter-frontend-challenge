import { Heart, Search, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFilterStore } from "@/store/useFilterStore";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`;

const SearchInputWrapper = styled.div`
	position: relative;
	flex: 1;
	max-width: 100%;

	@media (min-width: 768px) {
		max-width: 400px;
	}
`;

const SearchIcon = styled(Search)`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 0.75rem 1rem 0.75rem 3rem;
	border: 1px solid ${({ theme }) => theme.colors.border.default};
	border-radius: 0.5rem;
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	color: ${({ theme }) => theme.colors.text.primary};
	background-color: ${({ theme }) => theme.colors.background.primary};
	transition: border-color 0.2s ease;

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary.default};
	}

	&::placeholder {
		color: ${({ theme }) => theme.colors.text.secondary};
	}
`;

const ToggleGroup = styled.div`
	display: flex;
	gap: 0.25rem;
	background-color: ${({ theme }) => theme.colors.background.primary};
	padding: 0.25rem;
	border-radius: 0.5rem;
	border: 1px solid ${({ theme }) => theme.colors.border.default};
	width: fit-content;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.625rem 1.25rem;
	border: none;
	border-radius: 0.375rem;
	font-size: ${({ theme }) => theme.typography.fontSize.sm};
	font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all 0.2s ease;
	background-color: ${({ theme, $active }) =>
		$active ? theme.colors.primary.default : "transparent"};
	color: ${({ theme, $active }) =>
		$active ? theme.colors.text.inverse : theme.colors.text.primary};

	&:hover {
		background-color: ${({ theme, $active }) =>
			$active ? theme.colors.primary.dark : theme.colors.background.secondary};
	}

	svg {
		width: 1.125rem;
		height: 1.125rem;
	}
`;

export const FilterSection = () => {
	const { t } = useTranslation();
	const { searchName, activeFilter, setSearchName, setActiveFilter } =
		useFilterStore();

	return (
		<Container>
			<SearchInputWrapper>
				<SearchIcon size={18} />
				<SearchInput
					type="text"
					placeholder={t("dashboard.filter.searchPlaceholder")}
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
				/>
			</SearchInputWrapper>

			<ToggleGroup>
				<ToggleButton
					$active={activeFilter === "all"}
					onClick={() => setActiveFilter("all")}
				>
					<Users />
					{t("dashboard.filter.allUsers")}
				</ToggleButton>
				<ToggleButton
					$active={activeFilter === "favorites"}
					onClick={() => setActiveFilter("favorites")}
				>
					<Heart />
					{t("dashboard.filter.favorites")}
				</ToggleButton>
			</ToggleGroup>
		</Container>
	);
};
