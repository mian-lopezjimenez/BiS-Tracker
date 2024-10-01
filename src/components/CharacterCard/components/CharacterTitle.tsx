import { memo } from "react";

import useCharacterInfo from "../hooks/useCharacterInfo";
import useCharacters from "@/stores/characters";
import { setLocalStorage } from "@/utils/localStorage";

const CharacterTitle = memo(() => {
  const { characterInfo } = useCharacterInfo();
  const { characters, deleteCharacter } = useCharacters();
  const { name, realm, id } = characterInfo.character;

  const handleDeleteCharacter = (id: number) => {
    deleteCharacter(id);
    setLocalStorage(
      "characters",
      characters.filter((c) => c.character.id !== id)
    );
  };

  return (
    <h2 className="text-center">
      {name} - {realm.name} -
      <button onClick={() => handleDeleteCharacter(id)}>X</button>
    </h2>
  );
});

CharacterTitle.displayName = "CharacterTitle";
export default CharacterTitle;
