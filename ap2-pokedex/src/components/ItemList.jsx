import ItemCard from './ItemCard.jsx'

// Container da lista: grid responsivo que renderiza um ItemCard por item
function ItemList({ items, onSelect }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}

export default ItemList
