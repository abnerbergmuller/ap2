import ItemCard from './ItemCard.jsx'

// Container da lista: grid responsivo que renderiza um ItemCard por item
function ItemList({ items, favorites, onSelect, onToggleFavorite }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            item={item}
            isFavorite={favorites.includes(item.id)}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  )
}

export default ItemList
