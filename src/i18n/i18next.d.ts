import "i18next";
import type messages from "../../public/locales/pt/messages.json";

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "messages";
		resources: {
			messages: typeof messages;
		};
	}
}
