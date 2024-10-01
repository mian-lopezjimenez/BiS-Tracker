import { useState, useEffect } from "react";

import axios from "axios";

import { EquippedItem } from "@/types/characters";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useAuth } from "@/hooks/index";

interface ItemImageURL {
  id: number;
  href: string;
}

interface Props {
  equippedItem?: EquippedItem;
}

const useCharacterItemImage = ({ equippedItem }: Props) => {
  const [media, setMedia] = useState("");
  const { token } = useAuth();
  const { id } = equippedItem?.item ?? { id: "" };
  const { key } = equippedItem?.media ?? {
    key: { href: "" },
  };
  const itemsUrlsImages: ItemImageURL[] = getLocalStorage(
    "items-urls-images",
    []
  );

  const getItemMedia = async (url: string) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          namespace: "static-eu",
          locale: "es_ES",
        },
      });

      setLocalStorage("items-urls-images", [
        ...itemsUrlsImages,
        {
          id,
          href: response.data.assets[0].value,
        },
      ]);
      setMedia(response.data.assets[0].value);
    } catch (error) {
      console.error(`Error getting item media: ${error}`);
    }
  };

  useEffect(() => {
    const foundItemUrlImage = itemsUrlsImages.find((i) => i.id === id);

    if (foundItemUrlImage) {
      setMedia(foundItemUrlImage.href);
      return;
    }

    if (key && key.href) {
      getItemMedia(key.href);
    }
  }, []);

  return {
    media,
  };
};

export default useCharacterItemImage;
