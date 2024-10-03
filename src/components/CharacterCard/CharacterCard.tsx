import { createContext, FC, memo, useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { CharacterInfo, CharacterMedia } from "@/types/characters";
import { getCharacter } from "@/utils/api";
import { useAuth } from "@/hooks/index";
import useCharacterMedia from "./hooks/useCharacterMedia";
import useCharacters from "@/stores/characters";

import {
  CharacterLeftItems,
  CharacterRightItems,
  CharacterRender,
  CharacterHandsItems,
  CharacterTitle,
  CharacterActions,
  CharacterBisList,
} from "./components";

interface Props {
  characterInfo: CharacterInfo;
}

interface CharacterData {
  characterInfo: CharacterInfo;
  characterMedia: CharacterMedia;
  showBiS: boolean;
  setShowBiS: (value: boolean) => void;
}

export const CharacterInfoContext = createContext<CharacterData>(
  {} as CharacterData
);
const { Provider } = CharacterInfoContext;

const CharacterCard: FC<Props> = memo(({ characterInfo }) => {
  const [character, setCharacter] = useState(characterInfo);
  const [showBiS, setShowBiS] = useState(false);
  const { characterMedia } = useCharacterMedia(characterInfo);
  const { hasToUpdate, region } = useCharacters();
  const { i18n } = useTranslation();
  const { token } = useAuth();

  const getCharacterInfo = async () => {
    if (hasToUpdate) {
      const newCharacterInfo = await getCharacter({
        language: i18n.language,
        name: character.character.name,
        realmSlug: character.character.realm.slug,
        region,
        token,
      });

      if (newCharacterInfo) {
        setCharacter(newCharacterInfo);
      }
    }
  };

  useEffect(() => {
    getCharacterInfo();
  }, []);

  return (
    <Provider
      value={{
        characterInfo,
        characterMedia,
        showBiS,
        setShowBiS,
      }}
    >
      <div className="z-1 w-full relative flex flex-wrap justify-between h-fit rounded border-2 border-blue-300 p-4">
        <CharacterActions />

        {!showBiS && (
          <>
            <CharacterLeftItems />

            <div className="flex-1 flex flex-col items-center">
              <CharacterTitle />

              <CharacterRender />

              <CharacterHandsItems />
            </div>

            <CharacterRightItems />
          </>
        )}

        {showBiS && <CharacterBisList />}
      </div>
    </Provider>
  );
});

CharacterCard.displayName = "CharacterCard";
export default CharacterCard;
