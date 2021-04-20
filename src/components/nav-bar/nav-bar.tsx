import { Box } from 'grommet'
import { Filter } from 'grommet-icons'

const NavBar: React.FC = () => (
    <Box
        as="header"
        direction="row"
        align="center"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        justify="between"
        background="neutral-3"
        elevation="large"
        style={{ zIndex: 2 }}
    >
        <Filter size="large" />
    </Box>
)

export default NavBar
