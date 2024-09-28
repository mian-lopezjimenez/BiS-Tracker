import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "@/hooks/index";

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
  const { token } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { region, name, realmSlug } = values;

    try {
      const url: string = `https://${region}.api.blizzard.com/profile/wow/character/${decodeURI(
        realmSlug.replace(/ /g, "-").toLowerCase()
      )}/${name.toLowerCase()}/appearance?namespace=profile-${region}&locale=es_ES`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Añadir el token en la cabecera
        },
        params: {
          namespace: "static-us",
          locale: "es_ES", // Cambiar a 'es_MX' si deseas español
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(`Error al obtener apariencia: ${error}`);
    }
  };

  return (
    <div>
      <form
        className="flex justify-between rounded-full p-4 border-solid border-2 border-blue-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <select {...register("region", { required: true })}>
          <option value="eu">EU</option>
          <option value="us">US</option>
        </select>

        <input
          type="text"
          className="p-2"
          placeholder="Character Name"
          {...register("name", { required: true })}
        />

        <input
          type="text"
          className="p-2"
          placeholder="Realm"
          {...register("realmSlug", { required: true })}
        />

        <input
          className="p-2 bg-teal-500 rounded-full w-20 text-white hover:bg-teal-600 transition-colors duration-300 cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Search;
