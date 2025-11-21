export const colors = {
	primary: {
		default: "#6366F1",
		light: "#A5B4FC",
		dark: "#4F46E5",
	},

	success: "#22C55E",
	warning: "#F59E0B",
	error: "#EF4444",
	info: "#3B82F6",

	gray: {
		50: "#F9FAFB",
		100: "#F3F4F6",
		200: "#E5E7EB",
		300: "#D1D5DB",
		400: "#9CA3AF",
		500: "#6B7280",
		600: "#4B5563",
		700: "#374151",
		800: "#1F2937",
		900: "#111827",
	},

	background: {
		primary: "#FFFFFF",
		secondary: "#F9FAFB",
		tertiary: "#E5E7EB",
		dark: "#111827",
	},

	text: {
		primary: "#111827",
		secondary: "#4B5563",
		tertiary: "#6B7280",
		disabled: "#9CA3AF",
		inverse: "#FFFFFF",
	},

	border: {
		light: "#E5E7EB",
		default: "#D1D5DB",
		dark: "#9CA3AF",
	},
} as const;

export type ColorPalette = typeof colors;
