import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const isBrowser = typeof window !== "undefined";

i18n
	.use(HttpBackend)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		supportedLngs: ["en", "fr"],
		interpolation: {
			escapeValue: false,
		},
		backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
		detection: isBrowser ? {} : undefined,
	});

export default i18n;
