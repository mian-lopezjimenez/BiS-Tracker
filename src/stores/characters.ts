import { create } from "zustand";

import { CharacterInfo, Region } from "@/types/characters";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { getDateHoursDifference } from "@/utils/dates";

interface CharacterState {
  characters: CharacterInfo[];
  hasToUpdate: boolean;
  region: Region;
  setCharacters: (characters: CharacterInfo[]) => void;
  deleteCharacter: (id: number) => void;
  setHasToUpdate: (hoursToUpdate?: number) => void;
  setRegion: (region: Region) => void;
}

const useCharacters = create<CharacterState>()((set) => ({
  characters: [],
  hasToUpdate: false,
  region: "eu" as Region,
  setCharacters: (characters: CharacterInfo[]) => set({ characters }),
  deleteCharacter: (id: number) =>
    set((state) => ({
      characters: state.characters.filter(
        (character) => character.character.id !== id
      ),
    })),
  setHasToUpdate: (hoursToUpdate?: number) => {
    const lastUpdated: Date = getLocalStorage("bis-last-updated", new Date());
    const now = new Date();
    const DEFAULT_HOURS = 2;

    if (lastUpdated) {
      const update = getDateHoursDifference(
        now,
        lastUpdated,
        hoursToUpdate ?? DEFAULT_HOURS
      );

      if (update) {
        set({ hasToUpdate: true });
        setLocalStorage("bis-last-updated", now);
      }
      return;
    }

    setLocalStorage("bis-last-updated", now);
    set({ hasToUpdate: false });
  },
  setRegion: (region: Region) => set({ region }),
}));

export default useCharacters;
