import { memo } from "react";

import { useTranslation } from "react-i18next";

const LanguageSelector = memo(() => {
  const { t, i18n } = useTranslation("common");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;

    i18n.changeLanguage(value);
  };

  return (
    <select onChange={handleLanguageChange}>
      <option value="en_EN">{t("languageSelector.english")}</option>
      <option value="es_ES">{t("languageSelector.spanish")}</option>
    </select>
  );
});

LanguageSelector.displayName = "LanguageSelector";
export default LanguageSelector;
