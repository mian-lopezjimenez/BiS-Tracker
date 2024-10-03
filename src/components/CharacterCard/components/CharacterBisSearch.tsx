import { memo } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  name: string;
}

const CharacterBisSearch = memo(() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { name } = values;

    console.log(name);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="flex-1 px-2 border-2 border-gray-600 rounded"
        {...register("name", { required: true })}
        placeholder="Buscar"
        type="search"
      />

      <input
        className="rounded bg-zinc-500 px-2 py-1"
        type="submit"
        value="Buscar"
      />
    </form>
  );
});

CharacterBisSearch.displayName = "CharacterBisSearch";
export default CharacterBisSearch;
