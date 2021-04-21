import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Box } from 'grommet'
import Navbar from 'components/nav-bar'

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Router>
                <Navbar />
                <Box style={{ height: '64px', pointerEvents: 'none' }} />
                <Routes />
            </Router>
        </React.Fragment>
    )
}

export default App
