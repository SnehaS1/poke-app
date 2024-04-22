import PokemonDetail from "@/components/pokemon-detail";

export default function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PokemonDetail pokemonId={params.id} />
    </>
  );
}
