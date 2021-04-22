import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Routes from 'components/routes'

describe('<Page404/>', () => {
    test('Incorrect URL handling with Page404', () => {
        const history = createMemoryHistory()
        history.push('/moviee')
        render(
            <Router history={history}>
                <Routes />
            </Router>
        )

        expect(screen.getByText(/404/i)).toBeInTheDocument()
    })
})
