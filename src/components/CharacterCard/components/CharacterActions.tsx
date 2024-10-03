import { memo } from "react";

import { setLocalStorage } from "@/utils/localStorage";
import { useCharacterInfo } from "../hooks";
import useCharacters from "@/stores/characters";

const CharacterActions = memo(() => {
  const { characters, deleteCharacter } = useCharacters();
  const { setShowBiS, showBiS, characterInfo } = useCharacterInfo();
  const { id } = characterInfo.character;

  const handleDeleteCharacter = (id: number) => {
    deleteCharacter(id);
    setLocalStorage(
      "characters",
      characters.filter((c) => c.character.id !== id)
    );
  };

  return (
    <div className="w-full flex justify-center items-center mb-2">
      <button
        onClick={() => setShowBiS(!showBiS)}
        className="p-2 rounded bg-slate-500"
      >
        {showBiS ? "Hide BiS" : "Show BiS"}
      </button>

      <button
        onClick={() => handleDeleteCharacter(id)}
        className="p-2 ml-2 rounded bg-red-500"
      >
        X
      </button>
    </div>
  );
});

CharacterActions.displayName = "CharacterActions";
export default CharacterActions;
