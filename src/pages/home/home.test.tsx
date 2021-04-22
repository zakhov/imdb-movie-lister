import { render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Home from './home'
import { MOVIE_DATA } from 'config'

const mockResponse = (mock_data: any) => {
    const mock_response = {
        json: jest.fn().mockResolvedValueOnce(mock_data),
    }
    const mockedFetch = jest.fn().mockResolvedValueOnce(mock_response as any)
    ;(global as any).fetch = mockedFetch
}

describe('<MovieCard/>', () => {
    let fetchDetails: any
    beforeEach(() => {
        fetchDetails = (global as any).fetch
    })
    afterEach(() => {
        ;(global as any).fetch = fetchDetails
    })
    const component = <Home />

    test('Renders Virtualized Cards', async () => {
        render(component)
        mockResponse(MOVIE_DATA)
        const movie_cards = await waitFor(() =>
            screen.getAllByTestId('movie-card')
        )
        expect(movie_cards).toHaveLength(4)
    })
})
