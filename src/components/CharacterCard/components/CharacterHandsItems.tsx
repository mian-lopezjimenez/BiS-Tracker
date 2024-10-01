import { memo } from "react";

import { hands } from "../data/items";
import CharacterItemImage from "./CharacterItemImage";
import useCharacterInfo from "../hooks/useCharacterInfo";

const CharacterHandsItems = memo(() => {
  const { characterInfo } = useCharacterInfo();
  const { equipped_items } = characterInfo;

  const handsItems = equipped_items.filter((item) =>
    hands.includes(item.slot.type)
  );

  return (
    <div className="flex justify-center gap-1 h-14">
      {hands.map((item) => {
        const foundItem = handsItems.find((i) => i.slot.type === item);
        return <CharacterItemImage key={item} equippedItem={foundItem} />;
      })}
    </div>
  );
});

CharacterHandsItems.displayName = "CharacterHandsItems";
export default CharacterHandsItems;
