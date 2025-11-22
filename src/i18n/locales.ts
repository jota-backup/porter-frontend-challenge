export const AVAILABLE_LOCALES = [
	{
		code: "pt",
		name: "Português",
		flag: "🇧🇷",
	},
	{
		code: "en",
		name: "English",
		flag: "🇺🇸",
	},
] as const;

export type LocaleCode = (typeof AVAILABLE_LOCALES)[number]["code"];
