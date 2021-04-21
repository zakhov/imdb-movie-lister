import { Box, Spinner } from 'grommet'

const Loading: React.FC = () => (
    <Box fill pad="large">
        <Box direction="row" justify="center" align="center" pad="medium">
            Content is loading..
        </Box>
        <Box align="center" gap="small">
            <Spinner size="large" />
        </Box>
    </Box>
)

export default Loading
