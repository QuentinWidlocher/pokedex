import { PokemonType } from '../../../types/pokemon-type'

export interface PokemonListType {
  id: number
  name: string
  types: PokemonType[]
  spriteUrl: string
}
