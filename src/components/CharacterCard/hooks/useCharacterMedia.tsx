import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import axios from "axios";

import { CharacterInfo, CharacterMedia, Realm } from "@/types/characters";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useAuth } from "@/hooks/index";

const useCharacterMedia = (characterInfo: CharacterInfo) => {
  const [characterMedia, setCharacterMedia] = useState<CharacterMedia>(
    {} as CharacterMedia
  );
  const { i18n } = useTranslation();
  const { character } = characterInfo;
  const { name, realm, id } = character;
  const { token } = useAuth();
  const characterMediaUrls: CharacterMedia[] = getLocalStorage(
    "character-media-urls",
    []
  );

  const getCharacterRender = async (name: string, realm: Realm) => {
    try {
      const response = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${
          realm.slug
        }/${name.toLowerCase()}/character-media`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            namespace: "profile-eu",
            locale: i18n.language,
          },
        }
      );

      setLocalStorage("character-media-urls", [
        ...characterMediaUrls,
        response.data,
      ]);
      setCharacterMedia(response.data);
    } catch (error) {
      console.error(`Error al obtener el render del personaje: ${error}`);
    }
  };

  useEffect(() => {
    const foundCharacterMediaUrl = characterMediaUrls.find(
      (i) => i.character.id === id
    );

    if (foundCharacterMediaUrl) {
      setCharacterMedia(foundCharacterMediaUrl);
      return;
    }

    getCharacterRender(name, realm);
  }, []);

  return {
    characterMedia,
  };
};

export default useCharacterMedia;
