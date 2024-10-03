import { memo } from "react";

import { CharacterBisSearch } from "./index";

const CharacterBisList = memo(() => {
  return (
    <div className="w-full h-[476px]">
      <CharacterBisSearch />
    </div>
  );
});

CharacterBisList.displayName = "CharacterBisList";
export default CharacterBisList;
