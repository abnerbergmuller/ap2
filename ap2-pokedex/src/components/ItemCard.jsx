import { getArtworkUrl } from '../services/api.js'

// Card individual: recebe o item por props e avisa o pai via onSelect
function ItemCard({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className="flex w-full flex-col items-center rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95"
    >
      <span className="self-end text-xs font-semibold text-slate-400">
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
  )
}

export default ItemCard
