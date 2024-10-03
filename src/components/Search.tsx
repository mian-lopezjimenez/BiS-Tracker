import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/hooks/index";
import { useCharacters } from "@/stores/index";
import { setLocalStorage } from "@/utils/localStorage";
import { CharacterInfo, Region } from "@/types/characters";
import { getCharacter } from "@/utils/api";
import { ChangeEvent } from "react";

interface Inputs {
  name: string;
  realmSlug: string;
  region: string;
}

const Search = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { t, i18n } = useTranslation();
  const { token } = useAuth();
  const { characters, setCharacters, setRegion } = useCharacters();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { region, name, realmSlug } = values;

    if (!region || !name || !realmSlug) {
      return;
    }

    const foundCharacter = characters.find(
      ({ character }) =>
        character.name === name.charAt(0).toUpperCase() + name.slice(1)
    );

    if (foundCharacter) {
      return;
    }

    try {
      const character: CharacterInfo | null = await getCharacter({
        language: i18n.language,
        name,
        realmSlug,
        region,
        token,
      });

      if (character) {
        setCharacters([...characters, character]);
        setLocalStorage("characters", [...characters, character]);
      }
    } catch (error) {
      console.error(`Error getting the character: ${error}`);
    }
  };

  const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setRegion(value as Region);
  };

  return (
    <form
      className="flex flex-wrap justify-between rounded-lg p-4 border-solid border-2 border-blue-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <select
        {...register("region", { required: true })}
        onChange={handleRegionChange}
      >
        <option value="eu">EU</option>
        <option value="us">US</option>
      </select>

      <input
        type="text"
        className="p-2"
        placeholder={t("search.name")}
        {...register("name", { required: true })}
      />

      <input
        type="text"
        className="p-2"
        placeholder={t("search.realm")}
        {...register("realmSlug", { required: true })}
      />

      <input
        className="p-2 bg-teal-500 rounded-full w-20 text-white hover:bg-teal-600 transition-colors duration-300 cursor-pointer"
        type="submit"
        value={t("search.send")}
      />
    </form>
  );
};

export default Search;
