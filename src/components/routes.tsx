import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from 'pages/home'
import Movie from 'pages/movie'
import Page404 from 'pages/page404'

const Routes = () => (
    <Switch>
        <Route exact={true} path="/movie/:movieId" component={Movie} />
        <Route exact={true} path="/" component={Home} />
        <Route>
            <Page404 />
        </Route>
    </Switch>
)

export default Routes
