"use client";
import { fetchPokemonList } from "@/services/getAllPokemon";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import { PillStyled, PokemonMasterCard } from "./pokemon-master-card";
import ProgressLoader from "./ui/progress";
import styled from "styled-components";
import { CapitalizeWordHelper } from "@/utils/helpers";

const CategorySectionStyled = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
function PokemonCategory() {
  const pathName = usePathname();
  const [searchText, setSearchText] = React.useState("");
  const { data = [], isLoading } = useQuery({
    queryKey: ["pokemonlist", { type: pathName.slice(1), name: searchText }],
    queryFn: () =>
      fetchPokemonList({ type: pathName.slice(1), name: searchText }),
    staleTime: 1000 * 60 * 60 * 5,
  });
  return (
    <div className="w-full">
      <CategorySectionStyled>
        <section className="flex fllex-col">
          <p className="block hidden">Pokemon Type:</p>
          <PillStyled value={pathName.slice(1)}>
            {CapitalizeWordHelper(pathName.slice(1))}
          </PillStyled>
        </section>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="pokemonName">Search Pokemon Name</label>
          <input
            type="text"
            value={searchText}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "5px",
            }}
            id="pokemonName"
            placeholder="Pikachu, etc."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </CategorySectionStyled>
      {isLoading && <ProgressLoader />}

      {data?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3">
          {data.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              >
                <PokemonMasterCard
                  name={pokemon.name}
                  image={pokemon.cover}
                  type={pokemon.type}
                  id={pokemon.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PokemonCategory;
