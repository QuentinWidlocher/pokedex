import { PokemonType } from '../../../types/pokemon-type'

export interface PokemonDetail {
  id: number
  name: string
  types: PokemonType[]
}
