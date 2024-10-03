import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/src/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
