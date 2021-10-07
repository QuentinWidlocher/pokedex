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
  [k in PokemonType]: { bg: string; text: string; border: string }
} = {
  grass: {
    bg: 'bg-emerald-200',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
  },
  fire: { bg: 'bg-red-200', text: 'text-red-800', border: 'border-red-300' },
  water: {
    bg: 'bg-blue-200',
    text: 'text-blue-800',
    border: 'border-blue-300',
  },
  bug: { bg: 'bg-lime-200', text: 'text-lime-800', border: 'border-lime-300' },
  normal: {
    bg: 'bg-gray-200',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
  poison: {
    bg: 'bg-fuchsia-200',
    text: 'text-fuchsia-800',
    border: 'border-fuchsia-300',
  },
  electric: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
  },
  ground: {
    bg: 'bg-orange-200',
    text: 'text-orange-800',
    border: 'border-orange-300',
  },
  fairy: {
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    border: 'border-rose-300',
  },
  fighting: {
    bg: 'bg-amber-200',
    text: 'text-amber-800',
    border: 'border-amber-300',
  },
  psychic: {
    bg: 'bg-violet-200',
    text: 'text-violet-800',
    border: 'border-violet-300',
  },
  rock: {
    bg: 'bg-blueGray-300',
    text: 'text-blueGray-800',
    border: 'border-blueGray-300',
  },
  ice: { bg: 'bg-sky-200', text: 'text-sky-800', border: 'border-sky-300' },
  dragon: {
    bg: 'bg-indigo-200',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
  },
  ghost: {
    bg: 'bg-violet-100',
    text: 'text-violet-800',
    border: 'border-violet-300',
  },
} as const
