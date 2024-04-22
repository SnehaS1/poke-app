"use server";
export type PokemonMasterListType = {
  name: string;
  image: string;
  type: string[];
  id: number;
  cover: string;
};
type argsPokemon = {
  name: string;
  type: string;
};
export const fetchPokemonList = async (obj: argsPokemon) => {
  const promises = [];
  for (let i = 1; i <= 1000; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  let isError = false;
  const response = await Promise.all(promises);
  const data = await Promise.all(
    response.map((response) => {
      return {
        name: response.name,
        image: response.sprites["front_default"],
        cover: response.sprites.other["official-artwork"].front_default,
        type: response.types.map((type: any) => type.type.name),
        id: response.id,
      };
    })
  );
  const { type, name } = obj;
  if (name === "" && type === "") {
    return data;
  } else if (name && type) {
    return data.filter(
      (obj) => obj.name.includes(name) && obj.type.includes(type)
    );
  } else if (name && type === "") {
    return data.filter((obj) => obj.name.includes(name));
  } else if (type && name === "") {
    // Otherwise, filter based on name and type
    return data.filter((obj) => obj.type.includes(type));
  }
};
