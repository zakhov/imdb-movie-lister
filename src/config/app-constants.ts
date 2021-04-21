import dayjs from 'dayjs'

export const FILTER_TYPES = [
    { text: 'Release Date', value: 'release_date' },
    { text: 'Title', value: 'title' },
    { text: 'Popularity', value: 'popularity' },
]

const API_KEY = process.env.REACT_APP_TVDB_API_KEY
const is_production = process.env.NODE_ENV === 'production'

export const movieListEndPoint = (pageNumber: number = 1) => {
    const primary_release_date = dayjs().format('YYYY-MM-DD')
    return `${
        is_production ? 'https' : 'http'
    }://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.lte=${primary_release_date}&page=${pageNumber}`
}

export const movieDetailsEndPoint = (id: string) =>
    `${
        is_production ? 'https' : 'http'
    }://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`

export const movieBookingLink = 'https://www.cathaycineplexes.com.sg/'
