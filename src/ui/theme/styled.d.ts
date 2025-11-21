import "styled-components";
import type { ColorPalette } from "./colors";
import type { ShadowPalette } from "./shadows";
import type { Typography } from "./typography";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: ColorPalette;
		shadows: ShadowPalette;
		typography: Typography;
	}
}
