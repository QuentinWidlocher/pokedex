import { colorsByType } from '../../../data/pokemon-types'
import { capitalized } from '../../../utils/string-utils'
import { PokemonDetailType } from '../types/pokemon-detail'

interface PokemonDetailProps {
  pokemon: PokemonDetailType
}

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  const { bg, text, border } =
    pokemon?.types?.length > 0
      ? colorsByType[pokemon.types[0]]
      : { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-500' }

  return (
    <article className="w-full md:3/4 lg:w-1/2 mx-auto">
      <section className={`border border-b-0 py-5 rounded-t-xl ${border}`}>
        <img className="w-48 mx-auto" src={pokemon.sprites.artwork} alt="" />
      </section>
      <section
        className={`rounded-b-xl flex flex-col p-10 ${bg} ${text} shadow-lg`}
      >
        <h1 className="text-5xl capitalize">{pokemon.name}</h1>
        <span className="text-lg mt-5">{pokemon.flavorText}</span>
        <div className="flex justify-center mt-10 space-x-20">
          <div>
            <h2 className="font-bold">Default sprites</h2>
            <div className="flex">
              <img src={pokemon.sprites.front} alt="front" />
              <img src={pokemon.sprites.back} alt="back" />
            </div>
          </div>
          <div>
            <h2 className="font-bold">Shiny sprites</h2>
            <div className="flex">
              <img src={pokemon.sprites.shiny.front} alt="shiny front" />
              <img src={pokemon.sprites.shiny.back} alt="shiny back" />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
