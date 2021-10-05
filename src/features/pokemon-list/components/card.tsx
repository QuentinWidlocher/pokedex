import { colorsByType } from '../../../data/pokemon-types'
import { PokemonType } from '../../../types/pokemon-type'

const printArray = (arr: string[]) =>
  arr.map((t, i) => `${i > 0 ? ', ' : ''}${t}`)

interface CardProps {
  name: string
  types: PokemonType[]
  spriteUrl: string
}

export const Card = ({ name, types, spriteUrl }: CardProps) => {
  let cardClass =
    'p-5 rounded-xl flex flex-col items-center transform transition-transform hover:-translate-y-1'

  const { bg, text } = types[0]
    ? colorsByType[types[0]]
    : { bg: 'bg-gray-200', text: 'text-gray-800' }

  return (
    <article className={`${cardClass} ${bg} ${text}`}>
      <img
        style={{ width: '96px', height: '96px' }}
        src={spriteUrl}
        loading="lazy"
      />
      <h1 className="capitalize">{name}</h1>
      <small className="capitalize">{printArray(types)}</small>
    </article>
  )
}
