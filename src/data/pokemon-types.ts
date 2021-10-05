import { PokemonType } from '../types/pokemon-type'

export const pokemonTypes = [
  'fire',
  'grass',
  'water',
  'bug',
  'normal',
  'poison',
  'electric',
  'ground',
  'fairy',
  'fighting',
  'psychic',
  'rock',
  'ice',
  'dragon',
  'ghost',
] as const

export const colorsByType: {
  [k in PokemonType]: { bg: string; text: string }
} = {
  grass: { bg: 'bg-emerald-200', text: 'text-emerald-800' },
  fire: { bg: 'bg-red-200', text: 'text-red-800' },
  water: { bg: 'bg-blue-200', text: 'text-blue-800' },
  bug: { bg: 'bg-lime-200', text: 'text-lime-800' },
  normal: { bg: 'bg-gray-200', text: 'text-gray-800' },
  poison: { bg: 'bg-fuchsia-200', text: 'text-fuchsia-800' },
  electric: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  ground: { bg: 'bg-orange-200', text: 'text-orange-800' },
  fairy: { bg: 'bg-rose-100', text: 'text-rose-800' },
  fighting: { bg: 'bg-amber-200', text: 'text-amber-800' },
  psychic: { bg: 'bg-violet-200', text: 'text-violet-800' },
  rock: { bg: 'bg-blueGray-300', text: 'text-blueGray-800' },
  ice: { bg: 'bg-sky-200', text: 'text-sky-800' },
  dragon: { bg: 'bg-indigo-200', text: 'text-indigo-800' },
  ghost: { bg: 'bg-violet-100', text: 'text-violet-800' },
} as const
