import { useContext } from "react";

import { CharacterInfoContext } from "../CharacterCard";

const useCharacterInfo = () => useContext(CharacterInfoContext);

export default useCharacterInfo;
