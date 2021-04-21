import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import Navbar from 'components/nav-bar'

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Router>
                <Navbar />
                <Routes />
            </Router>
        </React.Fragment>
    )
}

export default App
