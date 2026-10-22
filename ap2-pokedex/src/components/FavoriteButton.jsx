// Botão de coração reutilizado no card e no modal
function FavoriteButton({ isFavorite, name, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remover ${name} dos favoritos` : `Adicionar ${name} aos favoritos`}
      className={`rounded-full bg-white/80 p-2 shadow-sm transition hover:scale-110 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`h-5 w-5 transition ${isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-slate-500'}`}
        strokeWidth="2"
      >
        <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.3 2.7 4.5 6.3 4.5c2 0 3.6 1.1 4.4 2.6l1.3 2 1.3-2c.8-1.5 2.4-2.6 4.4-2.6 3.6 0 5.5 3.8 3.9 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  )
}

export default FavoriteButton
