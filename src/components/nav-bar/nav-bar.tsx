import { Box } from 'grommet'
import { Link } from 'react-router-dom'
import { Home } from 'grommet-icons'

const NavBar: React.FC = () => (
    <Box
        as="header"
        direction="row"
        align="center"
        pad={{ vertical: 'small', horizontal: 'small' }}
        justify="between"
        background="brand"
        elevation="large"
        style={{ zIndex: 2, position: 'fixed', height: '50px', width: '100%' }}
    >
        <Link to="/">
            <Home size="medium" />
        </Link>
        <Box id="filter-root" direction="column" />
    </Box>
)

export default NavBar
