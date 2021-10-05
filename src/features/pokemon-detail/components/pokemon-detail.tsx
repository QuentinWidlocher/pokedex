import { colorsByType } from '../../../data/pokemon-types'
import { PokemonDetail as PokemonDetailType } from '../types/pokemon-detail'

interface PokemonPageProps {
  pokemon: PokemonDetailType
}

export const PokemonDetail = ({ pokemon }: PokemonPageProps) => {
  const { bg, text } =
    pokemon?.types?.length > 0
      ? colorsByType[pokemon.types[0]]
      : { bg: 'bg-gray-200', text: 'text-gray-800' }

  return (
    <div className={`${bg} ${text}`}>
      <h1>{pokemon.name}</h1>
    </div>
  )
}
