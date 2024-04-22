"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { fetchPokemonList } from "@/services/getAllPokemon";
import { useQuery } from "@tanstack/react-query";
import { PokemonMasterCard } from "./pokemon-master-card";
import { fetchPokemonType } from "@/services/getPokemonTypes";
import PokemonTypes from "./pokemon-types";
import { useState } from "react";
import ProgressLoader from "./ui/progress";
interface PokemonCardProps {
  name: string;
  image: string;
  type: string[];
}
type PokemonTypesProps = {
  name: string;
  url: string;
};

const SearchStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  align-items: baseline;
`;

export function PokemonMasterCardQuery({
  pokemonTypeList,
}: {
  pokemonTypeList: PokemonTypesProps[];
}) {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const handleSelectedItemChange = (selectedValue: string) => {
    setSelectedItem(selectedValue);
  };
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemonlist", { type: "", name: search }],
    queryFn: () => fetchPokemonList({ type: "", name: search }),
    staleTime: 1000 * 60 * 60 * 5,
  });

  return (
    <div>
      <SearchStyled>
        <label htmlFor="pokemonName">Search Pokemon Name:</label>
        <input
          type="text"
          value={search}
          id="pokemonName"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "5px",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchStyled>
      <PokemonTypes
        pokemonTypeList={pokemonTypeList}
        onSelectedItemChange={handleSelectedItemChange}
      />
      {selectedItem}
      {isLoading ? <ProgressLoader /> : null}

      {data?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
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
