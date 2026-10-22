import { useCallback, useMemo, useState } from 'react'
import ItemDetails from '../components/ItemDetails.jsx'
import ItemList from '../components/ItemList.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import SearchForm from '../components/SearchForm.jsx'
import useFetch from '../hooks/useFetch.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
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

  // Estado da página fica aqui e desce para os componentes via props
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('number')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  // Favoritos (lista de ids) persistidos no localStorage
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  // Filtros (nome case-insensitive e favoritos, no cliente) e ordenação
  const visiblePokemons = useMemo(() => {
    const term = search.trim().toLowerCase()
    return pokemons
      .filter((p) => p.name.includes(term))
      .filter((p) => !onlyFavorites || favorites.includes(p.id))
      .sort(SORTERS[sort])
  }, [pokemons, search, sort, onlyFavorites, favorites])

  const handleClear = () => {
    setSearch('')
    setSort('number')
  }

  // Adiciona ou remove o id da lista de favoritos
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  // useCallback mantém a função estável para o effect do Esc no modal
  const handleClose = useCallback(() => setSelectedId(null), [])

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

      <button
        type="button"
        onClick={() => setOnlyFavorites((prev) => !prev)}
        aria-pressed={onlyFavorites}
        className={`mb-6 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95 ${
          onlyFavorites
            ? 'border-red-500 bg-red-500 text-white hover:bg-red-600'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
        }`}
      >
        Somente favoritos ({favorites.length})
      </button>

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
          {onlyFavorites && favorites.length === 0
            ? 'Você ainda não favoritou nenhum pokémon.'
            : 'Nenhum pokémon encontrado. Tente outro nome ou limpe a busca.'}
        </p>
      )}

      {!loading && !error && visiblePokemons.length > 0 && (
        <ItemList
          items={visiblePokemons}
          favorites={favorites}
          onSelect={setSelectedId}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <ItemDetails
        pokemonId={selectedId}
        isFavorite={favorites.includes(selectedId)}
        onClose={handleClose}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  )
}

export default Home
