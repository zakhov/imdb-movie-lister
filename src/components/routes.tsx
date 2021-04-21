import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Box, Heading } from 'grommet'
import { StatusWarning } from 'grommet-icons'
import Home from 'pages/home'
import Movie from 'pages/movie'

const Page404 = () => (
    <Box fill pad="large">
        <Heading level="1" textAlign="center">
            404
        </Heading>
        <Box direction="row" pad="medium" justify="center" align="center">
            <StatusWarning size="xlarge" />
        </Box>
        <Box direction="row" pad="large" justify="center" align="center">
            <Heading level="3">This page doesn't exist</Heading>
        </Box>
    </Box>
)

const Routes = () => (
    <Switch>
        <Route exact={true} path="movie/:movieId" component={Movie} />
        <Route exact={true} path="/" component={Home} />
        <Route>
            <Page404 />
        </Route>
    </Switch>
)

export default Routes
