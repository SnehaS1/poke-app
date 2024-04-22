import React from "react";
import { PokemonCard } from "./pokemon-card";
import { PillStyled } from "./pokemon-master-card";
import styled from "styled-components";
import { device } from "@/lib/responsive";

type PokemonTypesProps = {
  name: string;
  url: string;
};

const GridTypeStyled = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  grid-gap: 1rem;
  padding: 20px;
  @media ${device.mobileS} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
`;
function PokemonTypes({
  pokemonTypeList,
  onSelectedItemChange,
}: {
  pokemonTypeList: PokemonTypesProps[];
  onSelectedItemChange: (item: any) => void;
}) {
  const handleSelectedPokemon = (item: string) => {
    onSelectedItemChange(item);
  };
  return (
    <GridTypeStyled>
      <h2>Filter by Type:</h2>
      {pokemonTypeList.map((pokemon: any) => {
        return (
          <PillStyled
            value={pokemon.name}
            className="cursor-pointer"
            onClick={() => handleSelectedPokemon(pokemon.name)}
            key={`pokemon-type-${pokemon.name}`}
          >
            <PokemonCard
              name={pokemon.name}
              key={`${pokemon.name}-type-card`}
              typeUrl={pokemon.url}
            />
          </PillStyled>
        );
      })}
    </GridTypeStyled>
  );
}

export default PokemonTypes;
