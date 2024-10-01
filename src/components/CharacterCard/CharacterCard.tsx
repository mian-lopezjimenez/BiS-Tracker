import { createContext, FC, memo } from "react";

import { CharacterInfo, CharacterMedia } from "@/types/characters";

import {
  CharacterLeftItems,
  CharacterRightItems,
  CharacterRender,
  CharacterHandsItems,
  CharacterTitle,
} from "./components";

import useCharacterMedia from "./hooks/useCharacterMedia";

interface Props {
  characterInfo: CharacterInfo;
}

interface CharacterData {
  characterInfo: CharacterInfo;
  characterMedia: CharacterMedia;
}

export const CharacterInfoContext = createContext<CharacterData>(
  {} as CharacterData
);
const { Provider } = CharacterInfoContext;

const CharacterCard: FC<Props> = memo(({ characterInfo }) => {
  const { characterMedia } = useCharacterMedia(characterInfo);

  return (
    <Provider
      value={{
        characterInfo,
        characterMedia,
      }}
    >
      <div className="z-1 w-full relative flex flex-wrap justify-between h-fit rounded border-2 border-blue-300 p-4">
        <CharacterLeftItems />

        <div className="flex-1 flex flex-col items-center">
          <CharacterTitle />

          <CharacterRender />

          <CharacterHandsItems />
        </div>

        <CharacterRightItems />
      </div>
    </Provider>
  );
});

CharacterCard.displayName = "CharacterCard";
export default CharacterCard;
