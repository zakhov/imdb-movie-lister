import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

describe('<App />', () => {
    test('Renders app', () => {
        render(<App />)
        const linkElement = screen.getByText(/title/i)
        expect(linkElement).toBeInTheDocument()
    })
})
