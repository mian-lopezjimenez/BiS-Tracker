import { FC, memo } from "react";

import { useTranslation } from "react-i18next";

import { EquippedItem } from "@/types/characters";
import useCharacterItemImage from "../hooks/useCharacterItemImage";

interface Props {
  equippedItem?: EquippedItem;
}

const CharacterItemImage: FC<Props> = memo(({ equippedItem }) => {
  const { i18n } = useTranslation();
  const { id } = equippedItem?.item ?? { id: "" };
  const { level } = equippedItem ?? { level: { value: 0 } };
  const { media } = useCharacterItemImage({ equippedItem });

  const getPageLanguage = (language: string) => {
    switch (language) {
      case "es_ES":
        return "es";
      case "en_EN":
        return "en";
      default:
        return "en";
    }
  };

  const pageLang = getPageLanguage(i18n.language);

  return (
    <div className="w-14 h-14">
      {media && (
        <a
          className="q3"
          data-wowhead={`items=${id}`}
          href={`https://www.wowhead.com/${pageLang}/item=${id}?ilvl=${level.value}`}
          target="_blank"
        >
          <img className="w-14 h-14 rounded" src={media} />
        </a>
      )}

      {!media && (
        <div className="w-14 h-14 flex justify-center items-center text-4xl rounded bg-black text-white">
          ?
        </div>
      )}
    </div>
  );
});

CharacterItemImage.displayName = "CharacterItemImage";
export default CharacterItemImage;
