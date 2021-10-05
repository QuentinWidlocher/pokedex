import { useEffect, useState } from 'preact/hooks'
import { TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { Card } from './card'
import { PokemonListType } from '../types/pokemon-list'

interface PokemonListProps {
  list: PokemonListType[]
}

export function PokemonList({ list }: PokemonListProps) {
  const [filteredList, setFilteredList] = useState<PokemonListType[]>(list)
  const [searchTerms, setSearchTerms] = useState('')
  const [debouncedSearchTerms] = useDebouncedValue(searchTerms, 500)

  useEffect(
    function onSearch() {
      if (debouncedSearchTerms) {
        setFilteredList(
          list.filter(({ name }) =>
            name
              .toLowerCase()
              .includes(debouncedSearchTerms.toLowerCase() ?? ''),
          ),
        )
      } else {
        setFilteredList(list)
      }
    },
    [debouncedSearchTerms, list],
  )

  return (
    <>
      <TextInput
        className="w-60"
        label="Search a pokemon"
        radius="md"
        size="md"
        value={searchTerms}
        onChange={(e: any) => setSearchTerms(e.currentTarget.value)}
      />

      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 -mx-3">
        {filteredList.map(({ id, name, types, spriteUrl }, i) => (
          <li className="p-3">
            <Link to={`/${id}`}>
              <Card name={name} types={types} spriteUrl={spriteUrl} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
