import { useLocalStorageValue } from '@mantine/hooks'
import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'react-router-dom'
import { fetchPokemon } from '../../../services/api'
import { PokemonDetail } from '../components/pokemon-detail'
import { PokemonDetailType } from '../types/pokemon-detail'

const useCachedPokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null)

  useEffect(
    function fetchAnotherPokemon() {
      ;(async function () {
        let cachedPokemon = localStorage.getItem(id)

        if (!cachedPokemon) {
          let pokemonResponse = await fetchPokemon(id)

          if (pokemonResponse) {
            setPokemon(pokemonResponse)
            localStorage.setItem(id, JSON.stringify(pokemonResponse))
          }
        } else {
          setPokemon(JSON.parse(cachedPokemon))
        }
      })()
    },
    [id],
  )

  return pokemon
}

export const PokemonDetailRoute = () => {
  const params = useParams<{ id: string }>()
  const pokemon = useCachedPokemon(params.id)

  return pokemon ? <PokemonDetail pokemon={pokemon} /> : <span>Loading...</span>
}
