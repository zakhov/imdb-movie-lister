import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MovieCard from './movie-card'
import { MOVIE_DATA } from 'config'

describe('<MovieCard/>', () => {
    const { results } = MOVIE_DATA

    const { poster_path, popularity, title, release_date } = results[0]

    const component = (
        <MovieCard
            poster={poster_path}
            rating={popularity}
            title={title}
            release_date={release_date}
        />
    )

    test('Renders Title', async () => {
        render(component)
        const movie_title = screen.getByTestId('movie-card-title')
        expect(movie_title).toHaveTextContent(title)
    })

    test('Renders Poster', async () => {
        render(component)
        const movie_poster = screen.getByTestId('movie-card-poster')
        expect(movie_poster).toBeInTheDocument()
    })

    test('Renders Popularity Rating', async () => {
        render(component)
        const movie_popularity = screen.getByTestId('movie-card-popularity')
        expect(movie_popularity).toHaveTextContent(popularity.toString())
    })
})
