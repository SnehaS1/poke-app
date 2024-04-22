"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { CapitalizeWordHelper, findTypeColor } from "@/utils/helpers";
import { device } from "@/lib/responsive";

interface PokemonCardProps {
  name: string;
  image: string;
  type: string[];
  id: string;
}

const LinkStyled = styled.a`
  color: white;
  text-decoration: none;
`;
const SectionStyled = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const PillStyled = styled.span<{ value: string }>`
  background-color: ${(p) => findTypeColor(p.value)[0]};
  color: white;
  font-weight: 800;
  margin-inline-end: 0.5rem;
  border: 1px solid ${(p) => findTypeColor(p.value)[0]};
  border-radius: 0.25rem;
  padding: 0.75rem;

  margin-top: auto;
  margin-bottom: auto;
  @media ${device.mobileS} {
    font-size: 0.75rem;
    line-height: 0.75rem;
    padding-left: 0.5rem;
  }
`;

export const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-block: 10px;
  justify-content: center;
  align-items: baseline;
`;
const StyledPaper = styled.span<{ value: string }>`
  background-color: ${(p) => findTypeColor(p.value)};
`;

export function PokemonMasterCard({ name, image, type, id }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${id}`}>
      <SectionStyled>
        <Image src={image} alt={`${name}-pokemon`} width={500} height={500} />
        <h2 className={` font-semibold`}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <TypeWrapper>
          {type.map((t, index) => {
            return (
              <PillStyled key={`type-${t}`} value={t}>
                {CapitalizeWordHelper(t)}
              </PillStyled>
            );
          })}
        </TypeWrapper>
      </SectionStyled>
    </Link>
  );
}
