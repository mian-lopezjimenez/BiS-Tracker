import { memo } from "react";

import useCharacterInfo from "../hooks/useCharacterInfo";

const CharacterRender = memo(() => {
  const { characterMedia } = useCharacterInfo();
  const { assets } = characterMedia;

  return (
    <div
      style={{
        backgroundImage: `url(${assets ? assets[2]?.value : ""})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex-1 overflow-hidden"
    />
  );
});

CharacterRender.displayName = "CharacterRender";
export default CharacterRender;
