import { useTranslation } from "react-i18next";
import styled from "styled-components";

const HeadingContainer = styled.div`
	margin-bottom: 2rem;
`;

const Title = styled.h1`
	font-size: 2rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
	font-size: 1rem;
	font-weight: 400;
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
`;

export const Heading = () => {
	const { t } = useTranslation();

	return (
		<HeadingContainer>
			<Title>{t("dashboard.heading.title")}</Title>
			<Subtitle>{t("dashboard.heading.subtitle")}</Subtitle>
		</HeadingContainer>
	);
};
