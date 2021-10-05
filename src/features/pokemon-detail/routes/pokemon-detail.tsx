import { useLocalStorageValue } from '@mantine/hooks'
import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'react-router-dom'
import { fetchPokemon } from '../../../services/api'
import { PokemonDetail } from '../components/pokemon-detail'
import { PokemonDetail as PokemonDetailType } from '../types/pokemon-detail'

export const PokemonDetailRoute = () => {
  let { id: pokemonId } = useParams<{ id: string }>()

  const [cachedPokemon, setCachedPokemon] = useLocalStorageValue<string>({
    key: String(pokemonId),
  })
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null)

  useEffect(function onInit() {
    ;(async function () {
      if (!cachedPokemon) {
        let pokemonResponse = await fetchPokemon(pokemonId)

        if (pokemonResponse) {
          setPokemon(pokemonResponse)
          setCachedPokemon(JSON.stringify(pokemonResponse))
        }
      } else {
        setPokemon(JSON.parse(cachedPokemon))
      }
    })()
  }, [])

  return pokemon ? <PokemonDetail pokemon={pokemon} /> : <span>Loading...</span>
}
