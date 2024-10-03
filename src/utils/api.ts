import { CharacterInfo } from "@/types/characters";
import axios from "axios";

interface GetCharacterProps {
  language: string;
  name: string;
  realmSlug: string;
  region: string;
  token: string;
}

const getCharacter = async ({
  language,
  name,
  realmSlug,
  region,
  token,
}: GetCharacterProps): Promise<CharacterInfo | null> => {
  try {
    const url: string = `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug
      .replace(/ /g, "-")
      .toLowerCase()}/${name.toLowerCase()}/equipment?namespace=profile-${region}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        namespace: "dynamic-eu",
        locale: language,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error getting character: ${error}`);
    return null;
  }
};

export { getCharacter };
