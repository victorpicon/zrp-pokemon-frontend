"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Pokemon {
  name: string;
}

export default function PokemonList({ pokemons }: { pokemons: Pokemon[] }) {
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<any>(null);

  const fetchPokemonDetails = async (pokemonName: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/pokemon/${pokemonName}`);
      if (!res.ok) throw new Error(`Failed to fetch details for ${pokemonName}`);
      const data = await res.json();
      setSelectedPokemonDetails(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setSelectedPokemonDetails({ error: 'Failed to load details' });
    }
  };


  return (
    <div className="bg-white text-black w-[98%] rounded-xl flex pt-12 pb-12 justify-center xl:max-h-[800px] overflow-auto">
      <div className="flex flex-wrap gap-5 max-w-[1000px] justify-center">
        {pokemons.map((pokemon, index) => (
          <AlertDialog key={index + 1}>
            <AlertDialogTrigger onClick={() => fetchPokemonDetails(pokemon.name)}>
              <div className="p-4 border-gray-300 relative bg-white border rounded-2xl w-36 h-48 hover:-translate-y-5 duration-200 shadow-lg hover:scale-110 transition-all">
                <div className="text-7xl text-end pr-5 pt-10 absolute w-32 h-48 text-zinc-500 opacity-15">
                  {index + 1}
                </div>
                <p className="z-10 capitalize font-semibold">{pokemon.name}</p>
                <div className="h-full justify-center relative flex">
                  <img
                    alt={pokemon.name}
                    className="max-h-24 absolute bottom-10 z-10"
                    src={`https://projectpokemon.org/images/sprites-models/bw-animated/${String(
                      index + 1
                    ).padStart(3, "0")}.gif`}
                  />
                </div>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="capitalize text-4xl mb-12 text-left">{pokemon.name}</AlertDialogTitle>
                {selectedPokemonDetails ? (
                  selectedPokemonDetails.error ? (
                    <p className="text-red-500">{selectedPokemonDetails.error}</p>
                  ) : (
                    <AlertDialogDescription className="flex">
                      <div>
                        {selectedPokemonDetails.abilities.map((ability: string, i: number) => (
                          <h1 key={i + 1} className="capitalize text-left"> &gt; {ability}</h1>
                        ))}
                      </div>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                        alt={`${pokemon.name} sprite`}
                        className="h-32 right-24 top-16 absolute z-20"
                      />
                      <img src="https://media.discordapp.net/attachments/1276756347639300199/1327108215061745736/READ.png?ex=6781dd56&is=67808bd6&hm=dd5f6ff2c2ffae15fdb0eec3e997d8a309c15792b6c64481c458fd26bf8af01d&=&format=webp&quality=lossless&width=1342&height=671"
                        className="absolute top-10 right-0 h-32 " />
                    </AlertDialogDescription>
                  )
                ) : (
                  <p>Loading...</p>
                )}

              </AlertDialogHeader>
              <AlertDialogFooter className="pr-52">
                <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-800 hover:text-white">Return</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    </div>
  );
}
