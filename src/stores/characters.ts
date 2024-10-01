import { create } from "zustand";

import { CharacterInfo } from "@/types/characters";

interface CharacterState {
  characters: CharacterInfo[];
  setCharacters: (characters: CharacterInfo[]) => void;
  deleteCharacter: (id: number) => void;
}

const useCharacters = create<CharacterState>()((set) => ({
  characters: [],
  setCharacters: (characters: CharacterInfo[]) => set({ characters }),
  deleteCharacter: (id: number) =>
    set((state) => ({
      characters: state.characters.filter(
        (character) => character.character.id !== id
      ),
    })),
}));

export default useCharacters;
