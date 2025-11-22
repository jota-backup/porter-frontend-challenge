import { Languages, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AVAILABLE_LOCALES } from "../../../i18n/locales";

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

const LanguageSelectWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	position: relative;
`;

const LanguageSelect = styled.select`
	padding: 0.5rem 1rem 0.5rem 2.5rem;
	background-color: ${({ theme }) => theme.colors.background.secondary};
	border: 1px solid ${({ theme }) => theme.colors.border.default};
	border-radius: 0.5rem;
	color: ${({ theme }) => theme.colors.text.primary};
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	appearance: none;

	&:hover {
		background-color: ${({ theme }) => theme.colors.background.primary};
		border-color: ${({ theme }) => theme.colors.primary.default};
	}

	&:focus {
		outline: none;
		border-color: ${({ theme }) => theme.colors.primary.default};
	}
`;

const LanguageIcon = styled(Languages)`
	position: absolute;
	left: 0.875rem;
	pointer-events: none;
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Nav = () => {
	const { t, i18n } = useTranslation();

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		i18n.changeLanguage(e.target.value);
	};

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
						{t("nav.allChars")}
					</NavLink>
				</NavItem>
				<NavItem>
					<LanguageSelectWrapper>
						<LanguageIcon size={16} />
						<LanguageSelect value={i18n.language} onChange={handleLanguageChange}>
							{AVAILABLE_LOCALES.map((locale) => (
								<option key={locale.code} value={locale.code}>
									{locale.flag} {locale.name}
								</option>
							))}
						</LanguageSelect>
					</LanguageSelectWrapper>
				</NavItem>
			</NavList>
		</NavContainer>
	);
};
