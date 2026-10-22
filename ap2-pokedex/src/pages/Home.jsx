import { useMemo, useState } from 'react'
import ItemList from '../components/ItemList.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import SearchForm from '../components/SearchForm.jsx'
import useFetch from '../hooks/useFetch.js'
import { getIdFromUrl, getPokemonListUrl } from '../services/api.js'

// Url fixa: calculada fora do componente para não mudar a cada render
const LIST_URL = getPokemonListUrl()

// Funções de ordenação por opção do <select>
const SORTERS = {
  number: (a, b) => a.id - b.id,
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
}

function Home() {
  const { data, loading, error, refetch } = useFetch(LIST_URL)

  // Normaliza a resposta da API para { id, name }
  const pokemons = useMemo(
    () => (data ? data.results.map((p) => ({ id: getIdFromUrl(p.url), name: p.name })) : []),
    [data],
  )

  // Estado da busca fica aqui e desce para o SearchForm via props
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('number')

  // Filtro (case-insensitive, no cliente) e ordenação
  const visiblePokemons = useMemo(() => {
    const term = search.trim().toLowerCase()
    return pokemons.filter((p) => p.name.includes(term)).sort(SORTERS[sort])
  }, [pokemons, search, sort])

  const handleClear = () => {
    setSearch('')
    setSort('number')
  }

  const handleSelect = () => {}

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">Catálogo de Pokémons</h1>

      <SearchForm
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
        onClear={handleClear}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <div role="alert" className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-red-600">Não foi possível carregar os pokémons ({error}).</p>
          <button
            type="button"
            onClick={refetch}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && visiblePokemons.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          Nenhum pokémon encontrado. Tente outro nome ou limpe a busca.
        </p>
      )}

      {!loading && !error && visiblePokemons.length > 0 && (
        <ItemList items={visiblePokemons} onSelect={handleSelect} />
      )}
    </main>
  )
}

export default Home
