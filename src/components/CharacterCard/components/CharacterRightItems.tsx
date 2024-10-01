import { memo } from "react";

import { right } from "../data/items";
import CharacterItemImage from "./CharacterItemImage";
import useCharacterInfo from "../hooks/useCharacterInfo";

const CharacterRightItems = memo(() => {
  const { characterInfo } = useCharacterInfo();
  const { equipped_items } = characterInfo;

  const rightItems = equipped_items.filter((item) =>
    right.includes(item.slot.type)
  );

  return (
    <div className="w-14 h-full flex flex-col gap-1">
      {right.map((item) => {
        const foundItem = rightItems.find((i) => i.slot.type === item);
        return <CharacterItemImage key={item} equippedItem={foundItem} />;
      })}
    </div>
  );
});

CharacterRightItems.displayName = "CharacterRightItems";
export default CharacterRightItems;
