"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "@/services/getPokemonDetail";
import Image from "next/image";
import styled from "styled-components";
import { PillStyled, TypeWrapper } from "./pokemon-master-card";
import { CapitalizeWordHelper } from "@/utils/helpers";
import { device } from "@/lib/responsive";
import ProgressLoader from "./ui/progress";
import ApexChart from "./chart-stats";

const AboutTextStyled = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(213, 231, 132);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-transform: capitalize;
`;
const TextStyled = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: rgb(213, 231, 132);
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
  text-shadow: rgb(244, 239, 221, 0.4) 1px 0 10px;
  text-transform: capitalize;
`;
const TrStyled = styled.tr`
  border-bottom: 1px dashed white;
`;

const TdValueStyled = styled.td`
  font-weight: 600;
  padding: 10px;
`;
const TdTitleStyled = styled(TdValueStyled)`
  color: pink;
`;
const TitleStyled = styled.h3`
  color: #d7d2e9;
  font-weight: 400;
`;
const ValueStyled = styled.h3`
  color: white;
  font-weight: 700;
`;
const TableStyled = styled.table`
  padding-inline: 20px;
  padding-block: 10px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(90, 95, 171, 0.37);
  backdrop-filter: blur(4px);
`;
const PokemonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media ${device.tablet} {
    max-width: 800px;
    flex-direction: column;
  }

  @media ${device.mobileS} {
    max-width: 1400px;
    flex-direction: column;
  }
`;
const PokeDetailStyled = styled.div`
  display: grid;
  @media ${device.tablet} {
    grid-template-columns: 60% 1fr;
    width: 100%;
  }
  @media ${device.mobileS} {
    grid-template-rows: auto auto;
  }
`;
const StyledBorder = styled.div`
  height: 70%;
  border-right: 1px solid #d7d2e9;
`;
const StyledAboutWrapper = styled.div`
  justify-content: center;
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const StyledImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
function PokemonDetail({ pokemonId }: { pokemonId: string }) {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => fetchPokemonDetail(pokemonId),
    staleTime: 1000 * 60 * 60 * 2,
  });

  const stats_title = data.stats?.map((stat: any) =>
    CapitalizeWordHelper(stat.stat.name)
  );
  const stats_value_base = data.stats?.map((stat: any) => stat.base_stat);
  const stats_value_effort = data.stats?.map((stat: any) => stat.effort);

  const abilities = data.abilities
    ?.map((ability: any) => CapitalizeWordHelper(ability.ability.name))
    .join(", ");

  const moves = data.moves
    ?.map((move: any) => CapitalizeWordHelper(move.move.name))
    .slice(0, 10)
    .join(", ");
  const types = data.types?.map((type: any) => type.type.name);
  const desc = data.flavor_text_entries
    ?.filter((obj: any) => obj.language.name === "en")
    .map((desc: any) => desc.flavor_text)[0];
  const egg_group = data.egg_groups
    ?.map((egg_group: any) => CapitalizeWordHelper(egg_group.name))
    .join(", ");

  if (isLoading) return <ProgressLoader></ProgressLoader>;
  if (error) return <div>Error: </div>;
  else {
    return (
      <PokemonWrapper>
        <TextStyled
          style={{
            color: data.color.name === "black" ? "#35374B" : data.color.name,
          }}
        >
          {data.name.replace("-", " ")}
        </TextStyled>

        <PokeDetailStyled>
          <StyledImageWrapper>
            <Image
              alt={`${data.name}-pokemon`}
              src={data.sprites.other["official-artwork"].front_default}
              width={500}
              height={500}
            />
            <TypeWrapper>
              <p className="mr-2 my-auto">Types:</p>
              {types.map((t: any, index: number) => {
                return (
                  <PillStyled key={`type-${t}`} value={t}>
                    {CapitalizeWordHelper(t)}
                  </PillStyled>
                );
              })}
            </TypeWrapper>
          </StyledImageWrapper>
          <StyledAboutWrapper>
            <AboutTextStyled>About</AboutTextStyled>
            <p className="text-center">{desc}</p>

            <div
              style={{
                height: "100px",
                width: "100%",
                margin: "10px",
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
                background: "rgba(222, 234, 222, 0.26)",
                backdropFilter: "blur(4px)",
                borderRadius: "10px",
                alignContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 32px 0 rgba(90, 95, 171, 0.37)",
              }}
            >
              <section>
                <ValueStyled> {data.weight} kg</ValueStyled>
                <TitleStyled>Weight</TitleStyled>
              </section>
              <StyledBorder />
              <section>
                <ValueStyled> {data.height} cm</ValueStyled>
                <TitleStyled>Height</TitleStyled>
              </section>
              <StyledBorder />

              <section>
                <strong> {CapitalizeWordHelper(data.shape.name)}</strong>
                <TitleStyled>Shape</TitleStyled>
              </section>
            </div>
            <div className="w-full grid py-2.5">
              <TableStyled>
                <tbody>
                  <TrStyled>
                    <TdTitleStyled>Ability</TdTitleStyled>
                    <TdValueStyled>{abilities}</TdValueStyled>
                  </TrStyled>
                  <TrStyled>
                    <TdTitleStyled>Generation</TdTitleStyled>
                    <TdValueStyled>
                      {CapitalizeWordHelper(data.generation.name)}
                    </TdValueStyled>
                  </TrStyled>
                  <TrStyled>
                    <TdTitleStyled>Growth Rate</TdTitleStyled>
                    <TdValueStyled>
                      {CapitalizeWordHelper(data.growth_rate.name)}
                    </TdValueStyled>
                  </TrStyled>

                  <TrStyled>
                    <TdTitleStyled>Egg Group</TdTitleStyled>
                    <TdValueStyled>{egg_group}</TdValueStyled>
                  </TrStyled>
                  <TrStyled>
                    <TdTitleStyled>Evoles from</TdTitleStyled>
                    <TdValueStyled>
                      {CapitalizeWordHelper(
                        data.evolves_from_species?.name || ""
                      )}
                    </TdValueStyled>
                  </TrStyled>
                  <TrStyled>
                    <TdTitleStyled>Habitat</TdTitleStyled>
                    <TdValueStyled>
                      {CapitalizeWordHelper(data.habitat?.name || "")}
                    </TdValueStyled>
                  </TrStyled>
                  <TrStyled style={{ borderBottom: "none" }}>
                    <TdTitleStyled>Top Moves</TdTitleStyled>
                    <TdValueStyled>{moves}</TdValueStyled>
                  </TrStyled>
                </tbody>
              </TableStyled>
            </div>
          </StyledAboutWrapper>
        </PokeDetailStyled>
        <div className="w-full h-20">
          <ApexChart
            options={stats_value_base}
            categories={stats_title}
            stats_base={stats_value_base}
            stats_efforts={stats_value_effort}
          />
        </div>
        {/* <ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={350} /> */}
        <div>
          {/* <ReactApexChart
            options={{
              ...chartData.options,
              dataLabels: {
                enabled: true,
                background: {
                  enabled: true,
                  borderRadius: 2,
                },
              },
              chart: {
                ...chartData.options.chart,
                type: "radar",
              },
            }}
            series={chartData.series}
            type="radar"
          /> */}
        </div>
      </PokemonWrapper>
    );
  }
}

export default PokemonDetail;
