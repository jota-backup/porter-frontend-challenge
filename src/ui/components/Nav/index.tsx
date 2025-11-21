import styled from "styled-components";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const NavContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

const Logo = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	background-color: ${({ theme }) => theme.colors.primary.default};
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.text.inverse};
	font-size: 1.25rem;
`;

const BrandText = styled.span`
	font-size: 1.25rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.text.primary};
`;

const NavList = styled.ul`
	display: flex;
	align-items: center;
	gap: 2rem;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const NavItem = styled.li`
	display: flex;
`;

const NavLink = styled.a<{ $active?: boolean }>`
	text-decoration: none;
	padding: 0.5rem 0;
	font-size: 1rem;
	font-weight: 500;
	color: ${({ theme, $active }) =>
		$active ? theme.colors.primary.default : theme.colors.text.secondary};
	cursor: pointer;
	position: relative;
	transition: color 0.2s ease;

	&:hover {
		color: ${({ theme }) => theme.colors.primary.default};
	}

	${({ $active, theme }) =>
		$active &&
		`
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 2px;
			background-color: ${theme.colors.primary.default};
		}
	`}
`;

export const Nav = () => {
	const { t } = useTranslation();

	return (
		<NavContainer>
			<Brand>
				<Logo>
					<Users size={20} />
				</Logo>
				<BrandText>{t("nav.brandName")}</BrandText>
			</Brand>
			<NavList>
				<NavItem>
					<NavLink href="#" $active={true}>
						{t("nav.allUsers")}
					</NavLink>
				</NavItem>
			</NavList>
		</NavContainer>
	);
};
