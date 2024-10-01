import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/hooks/index";
import { useCharacters } from "@/stores/index";
import { setLocalStorage } from "@/utils/localStorage";

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
  const { t } = useTranslation();
  const { token } = useAuth();
  const { characters, setCharacters } = useCharacters();

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
      const url: string = `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug
        .replace(/ /g, "-")
        .toLowerCase()}/${name.toLowerCase()}/equipment?namespace=profile-${region}&locale=es_ES`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          namespace: "static-us",
          locale: "es_ES",
        },
      });

      setCharacters([...characters, response.data]);
      setLocalStorage("characters", [...characters, response.data]);
    } catch (error) {
      console.error(`Error al obtener apariencia: ${error}`);
    }
  };

  return (
    <form
      className="flex flex-wrap justify-between rounded-lg p-4 border-solid border-2 border-blue-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <select {...register("region", { required: true })}>
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
