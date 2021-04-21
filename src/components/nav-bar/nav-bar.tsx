import { Box } from 'grommet'
import { Link } from 'react-router-dom'
import { Home } from 'grommet-icons'

const NavBar: React.FC = () => (
    <Box
        as="header"
        direction="row"
        align="center"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        justify="between"
        background="neutral-3"
        elevation="large"
        style={{ zIndex: 2, position: 'fixed', height: '88px', width: '100%' }}
    >
        <Link to="/">
            <Home size="large" />
        </Link>
        <Box id="filter-root" direction="column" />
    </Box>
)

export default NavBar
