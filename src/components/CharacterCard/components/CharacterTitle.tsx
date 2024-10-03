import { memo } from "react";

import { capitalizeAll } from "@/utils/strings";
import useCharacterInfo from "../hooks/useCharacterInfo";

const CharacterTitle = memo(() => {
  const { characterInfo } = useCharacterInfo();
  const { name, realm } = characterInfo.character;

  return (
    <h2 className="text-center">
      {name} - {capitalizeAll(realm.slug.split("-").join(" "))}
    </h2>
  );
});

CharacterTitle.displayName = "CharacterTitle";
export default CharacterTitle;
