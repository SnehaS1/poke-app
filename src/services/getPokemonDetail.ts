"use server";

export const fetchPokemonDetail = async (id: string): Promise<any> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (res) => res.json()
  );
  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  ).then((res) => res.json());
  return { ...res, ...speciesRes };
};
