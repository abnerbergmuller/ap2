import { getArtworkUrl } from '../services/api.js'
import FavoriteButton from './FavoriteButton.jsx'

// Card individual: dados chegam por props, ações sobem por callbacks
function ItemCard({ item, isFavorite, onSelect, onToggleFavorite }) {
  return (
    <div className="relative rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className="flex w-full flex-col items-center rounded-2xl p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95"
      >
        <span className="self-start text-xs font-semibold text-slate-400">
          #{String(item.id).padStart(3, '0')}
        </span>
        <img
          src={getArtworkUrl(item.id)}
          alt={`Imagem de ${item.name}`}
          loading="lazy"
          className="h-36 w-36 object-contain"
        />
        <h2 className="mt-2 text-lg font-semibold capitalize text-slate-800">{item.name}</h2>
      </button>
      <FavoriteButton
        isFavorite={isFavorite}
        name={item.name}
        onToggle={() => onToggleFavorite(item.id)}
        className="absolute right-3 top-3"
      />
    </div>
  )
}

export default ItemCard
