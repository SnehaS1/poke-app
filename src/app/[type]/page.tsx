import PokemonCategory from "@/components/pokemon-category";

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <>
      <PokemonCategory />
    </>
  );
}
