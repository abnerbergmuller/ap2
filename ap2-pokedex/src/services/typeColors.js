// Mapa constante: tipo do pokémon -> classes Tailwind (chip e gradiente de fundo).
// As classes ficam escritas por completo para o Tailwind conseguir detectá-las.
const TYPE_COLORS = {
  normal: { chip: 'bg-stone-400 text-white', gradient: 'from-stone-200' },
  fire: { chip: 'bg-orange-500 text-white', gradient: 'from-orange-200' },
  water: { chip: 'bg-blue-500 text-white', gradient: 'from-blue-200' },
  electric: { chip: 'bg-yellow-400 text-yellow-950', gradient: 'from-yellow-100' },
  grass: { chip: 'bg-green-500 text-white', gradient: 'from-green-200' },
  ice: { chip: 'bg-cyan-400 text-cyan-950', gradient: 'from-cyan-100' },
  fighting: { chip: 'bg-red-700 text-white', gradient: 'from-red-200' },
  poison: { chip: 'bg-purple-500 text-white', gradient: 'from-purple-200' },
  ground: { chip: 'bg-amber-600 text-white', gradient: 'from-amber-200' },
  flying: { chip: 'bg-sky-400 text-sky-950', gradient: 'from-sky-200' },
  psychic: { chip: 'bg-pink-500 text-white', gradient: 'from-pink-200' },
  bug: { chip: 'bg-lime-500 text-lime-950', gradient: 'from-lime-200' },
  rock: { chip: 'bg-stone-600 text-white', gradient: 'from-stone-300' },
  ghost: { chip: 'bg-indigo-600 text-white', gradient: 'from-indigo-200' },
  dragon: { chip: 'bg-violet-600 text-white', gradient: 'from-violet-200' },
  dark: { chip: 'bg-neutral-700 text-white', gradient: 'from-neutral-300' },
  steel: { chip: 'bg-slate-500 text-white', gradient: 'from-slate-200' },
  fairy: { chip: 'bg-fuchsia-400 text-fuchsia-950', gradient: 'from-fuchsia-200' },
}

// Tipo desconhecido usa as cores de "normal"
export const getTypeColors = (typeName) => TYPE_COLORS[typeName] ?? TYPE_COLORS.normal

export default TYPE_COLORS
