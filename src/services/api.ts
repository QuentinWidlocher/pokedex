import { PokemonDetailType } from '../features/pokemon-detail/types/pokemon-detail'
import { PokemonListType } from '../features/pokemon-list/types/pokemon-list'
import { PokemonType } from '../types/pokemon-type'

export async function fetchPokeApi<T>(query: string, params?: string) {
  let stringParams = params ? `(${params})` : ''

  const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `query ${stringParams} {${query}}`,
    }),
  })

  const { data: results } = await response.json()

  return results as T
}

export async function fetchPokemonList(): Promise<PokemonListType[]> {
  let results = await fetchPokeApi<{
    pokemon_v2_pokemon: {
      id: number
      name: string
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          name: string
        }
      }[]
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

  return results.pokemon_v2_pokemon.map((pkmn) => ({
    id: pkmn.id,
    name: pkmn.name,
    types: pkmn.pokemon_v2_pokemontypes.map(
      (t) => t.pokemon_v2_type.name as PokemonType,
    ),
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`,
    iconUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pkmn.id}.png`,
  }))
}

export async function fetchPokemon(
  pokemonId: number | string,
): Promise<PokemonDetailType | undefined> {
  try {
    let results = await fetchPokeApi<{
      pokemon_v2_pokemon: {
        id: number
        name: string
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: {
            name: string
          }
        }[]
      }[]

      pokemon_v2_pokemonspeciesflavortext: {
        flavor_text: string
      }[]
    }>(
      `
            pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
              id,
              name,
              pokemon_v2_pokemontypes {
                  pokemon_v2_type {
                      name
                  }
              },
            }
            pokemon_v2_pokemonspeciesflavortext(where: {id: {_eq: $id}, language_id: {_eq: 9}}) {
              flavor_text
            }
        `,
      `$id: Int = ${pokemonId}`,
    )

    let pkmn = results.pokemon_v2_pokemon[0]

    // The API returns a list, we only want one result
    return {
      id: pkmn.id,
      name: pkmn.name,
      types: pkmn.pokemon_v2_pokemontypes.map(
        (t) => t.pokemon_v2_type.name as PokemonType,
      ),
      sprites: {
        front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`,
        back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pkmn.id}.png`,
        shiny: {
          front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pkmn.id}.png`,
          back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pkmn.id}.png`,
        },
        artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkmn.id}.png`,
      },
      flavorText: results.pokemon_v2_pokemonspeciesflavortext[0].flavor_text,
    }
  } catch {
    return Promise.resolve(undefined)
  }
}
