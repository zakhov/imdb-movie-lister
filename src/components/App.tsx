import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Box, Grommet } from 'grommet'
import { grommet } from 'grommet/themes'
import Navbar from 'components/nav-bar'

const App: React.FC = () => {
    // const [darkMode, setDarkMode] = React.useState(false);

    return (
        <Grommet theme={grommet} themeMode="dark">
            <Router>
                <Navbar />
                <Box style={{ height: '64px', pointerEvents: 'none' }} />
                <Routes />
            </Router>
        </Grommet>
    )
}

export default App
