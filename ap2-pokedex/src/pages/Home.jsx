import { useMemo } from 'react'
import ItemList from '../components/ItemList.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import useFetch from '../hooks/useFetch.js'
import { getIdFromUrl, getPokemonListUrl } from '../services/api.js'

// Url fixa: calculada fora do componente para não mudar a cada render
const LIST_URL = getPokemonListUrl()

function Home() {
  const { data, loading, error, refetch } = useFetch(LIST_URL)

  // Normaliza a resposta da API para { id, name }
  const pokemons = useMemo(
    () => (data ? data.results.map((p) => ({ id: getIdFromUrl(p.url), name: p.name })) : []),
    [data],
  )

  const handleSelect = () => {}

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">Catálogo de Pokémons</h1>

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

      {!loading && !error && <ItemList items={pokemons} onSelect={handleSelect} />}
    </main>
  )
}

export default Home
