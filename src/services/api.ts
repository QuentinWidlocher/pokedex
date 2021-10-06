import { PokemonDetail } from '../features/pokemon-detail/types/pokemon-detail'
import { PokemonListType } from '../features/pokemon-list/types/pokemon-list'
import { PokemonType } from '../types/pokemon-type'

export async function fetchPokeApi<T>(query: string) {
  const expectedResultField = query.split('(')[0].trim()

  const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `query {${query}}`,
    }),
  })

  const {
    data: { [expectedResultField]: results },
  } = await response.json()

  return results as T[]
}

export async function fetchPokemonList(): Promise<PokemonListType[]> {
  let results = await fetchPokeApi<{
    id: number
    name: string
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        name: string
      }
    }[]
  }>(`
    pokemon_v2_pokemon(limit: 151) {
        id,
        name
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                name
            }
        },
    }
    `)

  return results.map((pkmn) => ({
    id: pkmn.id,
    name: pkmn.name,
    types: pkmn.pokemon_v2_pokemontypes.map(
      (t) => t.pokemon_v2_type.name as PokemonType,
    ),
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`,
    iconUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pkmn.id}.png`,
  }))
}

export async function fetchPokemon(pokemonId: number | string) {
  try {
    let results = await fetchPokeApi<PokemonDetail>(`
            pokemon_v2_pokemon(where: {id: {_eq: ${pokemonId}}}) {
                name,
            }
        `)

    // The API returns a list, we only want one result
    return results[0]
  } catch {
    return Promise.resolve(undefined)
  }
}
