import { memo } from "react";

import { left } from "../data/items";
import CharacterItemImage from "./CharacterItemImage";
import useCharacterInfo from "../hooks/useCharacterInfo";

const CharacterLeftItems = memo(() => {
  const { characterInfo } = useCharacterInfo();
  const { equipped_items } = characterInfo;

  const leftItems = equipped_items.filter((item) =>
    left.includes(item.slot.type)
  );

  return (
    <div className="w-14 h-full flex flex-col gap-1">
      {left.map((item) => {
        const foundItem = leftItems.find((i) => i.slot.type === item);
        return <CharacterItemImage key={item} equippedItem={foundItem} />;
      })}
    </div>
  );
});

CharacterLeftItems.displayName = "CharacterLeftItems";
export default CharacterLeftItems;
