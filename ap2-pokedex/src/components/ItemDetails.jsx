import { useEffect } from 'react'
import useFetch from '../hooks/useFetch.js'
import { getArtworkUrl, getPokemonUrl } from '../services/api.js'
import FavoriteButton from './FavoriteButton.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defesa Esp.',
  speed: 'Velocidade',
}

// Maior valor base de stat possível, usado para calcular a largura das barras
const MAX_STAT = 255

// Modal de detalhes. Sem pokemonId (nada selecionado) não renderiza nem requisita.
function ItemDetails({ pokemonId, isFavorite, onClose, onToggleFavorite }) {
  // url nula => useFetch não faz requisição
  const { data, loading, error, refetch } = useFetch(
    pokemonId ? getPokemonUrl(pokemonId) : null,
  )

  // Fecha com a tecla Esc; o cleanup remove o listener ao fechar/desmontar
  useEffect(() => {
    if (!pokemonId) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [pokemonId, onClose])

  if (!pokemonId) return null

  // Fecha só se o clique foi no fundo, não dentro do painel
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-10 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between">
          <h2 id="details-title" className="text-2xl font-bold capitalize text-slate-800">
            {data ? data.name : 'Detalhes'}
          </h2>
          <div className="flex gap-2">
            {data && (
              <FavoriteButton
                isFavorite={isFavorite}
                name={data.name}
                onToggle={() => onToggleFavorite(pokemonId)}
                className="bg-slate-100"
              />
            )}
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Fechar detalhes"
              className="rounded-full bg-slate-100 px-3 text-lg text-slate-600 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div role="alert" className="flex flex-col items-center gap-3 py-10 text-center">
            <p className="text-red-600">Não foi possível carregar os detalhes ({error}).</p>
            <button
              type="button"
              onClick={refetch}
              className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {data && (
          <>
            <img
              src={getArtworkUrl(data.id)}
              alt={`Imagem de ${data.name}`}
              className="mx-auto h-48 w-48 object-contain"
            />

            <ul className="mb-4 flex flex-wrap justify-center gap-2">
              {data.types.map(({ type }) => (
                <li
                  key={type.name}
                  className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium capitalize text-slate-700"
                >
                  {type.name}
                </li>
              ))}
            </ul>

            <dl className="mb-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs uppercase text-slate-500">Altura</dt>
                {/* A API devolve decímetros e hectogramas */}
                <dd className="font-semibold text-slate-800">{data.height / 10} m</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <dt className="text-xs uppercase text-slate-500">Peso</dt>
                <dd className="font-semibold text-slate-800">{data.weight / 10} kg</dd>
              </div>
            </dl>

            <h3 className="mb-1 font-semibold text-slate-700">Habilidades</h3>
            <ul className="mb-4 flex flex-wrap gap-2">
              {data.abilities.map(({ ability, is_hidden: isHidden }) => (
                <li
                  key={ability.name}
                  className="rounded-lg bg-slate-100 px-2 py-1 text-sm capitalize text-slate-700"
                >
                  {ability.name.replace('-', ' ')}
                  {isHidden && ' (oculta)'}
                </li>
              ))}
            </ul>

            <h3 className="mb-2 font-semibold text-slate-700">Stats base</h3>
            <ul className="space-y-2">
              {data.stats.map(({ base_stat: value, stat }) => (
                <li key={stat.name} className="flex items-center gap-2 text-sm">
                  <span className="w-28 text-slate-600">{STAT_LABELS[stat.name] ?? stat.name}</span>
                  <span className="w-8 text-right font-semibold text-slate-800">{value}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    {/* Largura dinâmica: única forma de usar um valor calculado em runtime */}
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600"
                      style={{ width: `${Math.min((value / MAX_STAT) * 100, 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default ItemDetails
