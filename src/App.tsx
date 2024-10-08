import { useEffect } from "react";

import { AuthProvider } from "@/stores/AuthContext";
import { CharacterCard, LanguageSelector, Search } from "@/components/index";
import { CharacterInfo } from "@/types/characters";
import { getLocalStorage } from "@/utils/localStorage";
import { useCharacters } from "@/stores/index";

function App() {
  const { characters, setCharacters, setHasToUpdate } = useCharacters();

  useEffect(() => {
    const storedCharacters: CharacterInfo[] = getLocalStorage<CharacterInfo[]>(
      "characters",
      []
    );

    setCharacters(storedCharacters);
    setHasToUpdate();
  }, []);

  return (
    <AuthProvider>
      <main className="container mx-auto py-8 px-4 min-h-screen flex flex-col gap-6">
        <div className="w-full flex justify-center gap-4 items-center">
          <Search />
          <LanguageSelector />
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-max gap-4 flex-1">
          {characters.map((characterInfo) => (
            <CharacterCard
              key={characterInfo?.character?.id ?? ""}
              characterInfo={characterInfo}
            />
          ))}
        </section>
      </main>
    </AuthProvider>
  );
}

export default App;
