"use server";

export const fetchPokemonType = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/type`).then((res) =>
    res.json()
  );
  return res.results.filter(
    (type: any) => type.name !== "unknown" && type.name !== "shadow"
  );
};
