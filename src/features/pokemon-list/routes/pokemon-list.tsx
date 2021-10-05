import { useDebouncedValue, useLocalStorageValue } from '@mantine/hooks'
import { useState, useEffect } from 'preact/hooks'
import { fetchPokemonList } from '../../../services/api'
import { PokemonList } from '../components/pokemon-list'
import { PokemonListType } from '../types/pokemon-list'

export const PokemonListRoute = () => {
  const [list, setList] = useState<PokemonListType[]>([])
  const [cachedList, setCachedList] = useLocalStorageValue<string>({
    key: 'pokemonList',
    defaultValue: '[]',
  })

  useEffect(
    function onListFetched() {
      ;(async function onInit() {
        if (!cachedList || cachedList == '[]') {
          let pokemonList = await fetchPokemonList()
          setCachedList(JSON.stringify(pokemonList))
        } else {
          setList(JSON.parse(cachedList))
        }
      })()
    },
    [cachedList],
  )

  return <PokemonList list={list} />
}
