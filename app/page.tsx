import Header from "@/components/header";
import PokemonList from "@/components/pokemonList";

export default async function Home() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div className="bg-red-600 flex flex-col w-screen items-center justify-center h-full min-h-screen overflow-hidden">
      <Header />
      <PokemonList pokemons={data.results} />
    </div>
  );
}
