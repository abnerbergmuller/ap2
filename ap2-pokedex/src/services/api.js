const BASE_URL = 'https://pokeapi.co/api/v2'
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

export const POKEMON_LIMIT = 151

export const getPokemonListUrl = (limit = POKEMON_LIMIT) =>
  `${BASE_URL}/pokemon?limit=${limit}`

export const getPokemonUrl = (id) => `${BASE_URL}/pokemon/${id}`

export const getArtworkUrl = (id) => `${ARTWORK_URL}/${id}.png`

export const getIdFromUrl = (url) => Number(url.split('/').filter(Boolean).pop())
