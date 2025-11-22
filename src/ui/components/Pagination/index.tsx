import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { Spinner } from "../Spinner";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isPending?: boolean;
}

const PaginationWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
`;

const PaginationContainer = styled.div<{ $disabled: boolean }>`
	display: flex;
	justify-content: center;
	opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
	pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
	transition: opacity 0.2s ease;

	.pagination {
		display: flex;
		list-style: none;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
		flex-wrap: wrap;
		justify-content: center;
	}

	.page-item {
		a {
			padding: 0.5rem 0.75rem;
			border-radius: 0.375rem;
			border: 1px solid ${({ theme }) => theme.colors.border.default};
			background-color: ${({ theme }) => theme.colors.background.primary};
			color: ${({ theme }) => theme.colors.text.primary};
			cursor: pointer;
			transition: all 0.2s ease;
			user-select: none;
			font-size: ${({ theme }) => theme.typography.fontSize.sm};
			min-width: 2.25rem;
			text-align: center;

			&:hover {
				background-color: ${({ theme }) => theme.colors.background.secondary};
				border-color: ${({ theme }) => theme.colors.primary.default};
			}
		}
	}

	.active {
		a {
			background-color: ${({ theme }) => theme.colors.primary.default};
			color: ${({ theme }) => theme.colors.text.inverse};
			border-color: ${({ theme }) => theme.colors.primary.default};

			&:hover {
				background-color: ${({ theme }) => theme.colors.primary.dark};
			}
		}
	}

	.disabled {
		a {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	.previous,
	.next {
		display: none;

		@media (min-width: 768px) {
			display: block;
		}

		a {
			font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
		}
	}
`;

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	isPending = false,
}: PaginationProps) => {
	const { t } = useTranslation();

	if (totalPages <= 1) {
		return null;
	}

	return (
		<PaginationWrapper>
			<PaginationContainer $disabled={isPending}>
				<ReactPaginate
					breakLabel="..."
					nextLabel={t("dashboard.pagination.next")}
					onPageChange={(selectedItem) =>
						onPageChange(selectedItem.selected + 1)
					}
					pageRangeDisplayed={3}
					marginPagesDisplayed={1}
					pageCount={totalPages}
					previousLabel={t("dashboard.pagination.previous")}
					renderOnZeroPageCount={null}
					forcePage={currentPage - 1}
					containerClassName="pagination"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					previousClassName="page-item previous"
					nextClassName="page-item next"
					activeClassName="active"
					disabledClassName="disabled"
				/>
			</PaginationContainer>
			{isPending && <Spinner size="small" />}
		</PaginationWrapper>
	);
};
