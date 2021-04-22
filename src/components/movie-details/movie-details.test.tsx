import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MovieDetails from './movie-details'
import { DETAIL_DATA } from 'config'
import { getMovieDuration } from 'helpers'

const mockResponse = (mock_data: any) => {
    const mock_response = {
        json: jest.fn().mockResolvedValueOnce(mock_data),
    }
    const mockedFetch = jest.fn().mockResolvedValueOnce(mock_response as any)
    ;(global as any).fetch = mockedFetch
}

describe('<MovieDetails/>', () => {
    let fetchDetails: any
    beforeEach(() => {
        fetchDetails = (global as any).fetch
    })
    afterEach(() => {
        ;(global as any).fetch = fetchDetails
    })

    const {
        id,
        title,
        genres,
        spoken_languages,
        runtime,
        overview,
    } = DETAIL_DATA

    const component = <MovieDetails id={id.toString()} onClose={null} is_page />

    test('Renders Poster', async () => {
        render(component)
        mockResponse(DETAIL_DATA)
        const movie_poster = await waitFor(() => screen.getByRole('img'))
        expect(movie_poster).toBeInTheDocument()
    })

    test('Renders Title', async () => {
        render(component)
        mockResponse(DETAIL_DATA)
        const movie_title = await waitFor(() =>
            screen.getByTestId('movie-details-title')
        )
        expect(movie_title).toHaveTextContent(title)
    })

    test('Renders Genres', async () => {
        render(component)
        mockResponse(DETAIL_DATA)
        const movie_genres = await waitFor(() =>
            screen.getAllByTestId('movie-details-genres')
        )
        expect(movie_genres).toHaveLength(genres.length)
    })

    test('Renders Languages', async () => {
        render(component)
        mockResponse(DETAIL_DATA)
        const movie_languages = await waitFor(() =>
            screen.getAllByTestId('movie-details-languages')
        )
        expect(movie_languages).toHaveLength(spoken_languages.length)
    })

    test('Renders Runtime', async () => {
        render(component)
        mockResponse(DETAIL_DATA)
        const movie_duration = await waitFor(() =>
            screen.getByTestId('movie-details-duration')
        )
        const duration_text = getMovieDuration(runtime)
        expect(movie_duration).toHaveTextContent(duration_text)
    })

    test('Renders Synopsis', async () => {
        render(component)
        mockResponse(DETAIL_DATA)
        const movie_synopsis = await waitFor(() =>
            screen.getByTestId('movie-details-synopsis')
        )
        expect(movie_synopsis).toHaveTextContent(overview)
    })
})
