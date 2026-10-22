function SearchForm({ search, sort, onSearchChange, onSortChange, onClear }) {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const fieldClass =
    'rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition focus:border-red-500 focus:outline-2 focus:outline-red-500/40'

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="search" className="text-sm font-medium text-slate-600">
          Buscar por nome
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Ex.: pikachu"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sort" className="text-sm font-medium text-slate-600">
          Ordenar por
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className={fieldClass}
        >
          <option value="number">Número</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:scale-95"
      >
        Limpar
      </button>
    </form>
  )
}

export default SearchForm
