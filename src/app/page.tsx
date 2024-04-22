import { fetchPokemonType } from "@/services/getPokemonTypes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchPokemonList } from "@/services/getAllPokemon";
import { PokemonMasterCardQuery } from "@/components/pokemon-master-card-query";

export default async function Home() {
  const fetchPokemonTYpe = await fetchPokemonType();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pokemonlist", { type: "", name: "" }],
    queryFn: () => fetchPokemonList({ type: "", name: "" }),
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonMasterCardQuery pokemonTypeList={fetchPokemonTYpe} />
      </HydrationBoundary>
    </main>
  );
}
