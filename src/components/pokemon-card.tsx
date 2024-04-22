"use client";
import Link from "next/link";

interface PokemonCardProps {
  name: string;
  typeUrl: string;
}

export function PokemonCard({ name, typeUrl }: PokemonCardProps) {
  return (
    <Link
      href={{
        pathname: name,
      }}
      key={name + "Card"}
    >
      <h2 className={` font-semibold`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </Link>
  );
}
