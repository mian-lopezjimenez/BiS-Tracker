import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { memo, useEffect } from "react";

import { useTranslation } from "react-i18next";

const LanguageSelector = memo(() => {
  const { t, i18n } = useTranslation("common");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;

    setLocalStorage("language", value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    const storedLanguage = getLocalStorage("language", "en_EN");
    setLocalStorage("language", storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, []);

  return (
    <select defaultValue={i18n.language} onChange={handleLanguageChange}>
      <option value="en_EN">{t("languageSelector.english")}</option>
      <option value="es_ES">{t("languageSelector.spanish")}</option>
    </select>
  );
});

LanguageSelector.displayName = "LanguageSelector";
export default LanguageSelector;
