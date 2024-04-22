"use server";

export const fetchPokemonbyType = async (url: string) => {
  const res = await fetch(url).then((res) => res.json());
  return res;
};
