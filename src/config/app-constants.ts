export const FILTER_TYPES = [
    { text: 'Release Date', value: 'release_date' },
    { text: 'Title', value: 'title' },
    { text: 'Popularity', value: 'popularity' },
]

const API_KEY = process.env.REACT_APP_TVDB_API_KEY

export const movieListEndPoint = `http://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`

export const movieDetailsEndPoint = (id: string) =>
    `http://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
