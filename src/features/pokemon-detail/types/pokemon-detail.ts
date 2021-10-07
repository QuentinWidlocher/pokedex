import { PokemonType } from '../../../types/pokemon-type'

export interface PokemonDetailType {
  id: number
  name: string
  types: PokemonType[]
  sprites: {
    front: string
    back: string
    shiny: {
      front: string
      back: string
    }
    artwork: string
  }
  flavorText: string
}
