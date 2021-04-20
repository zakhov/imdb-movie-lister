import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/home'

const Page404 = () => (
    <div>
        <h1>404</h1>
        <h3>This page doesn&apos;t exist</h3>
    </div>
)

const Routes = () => (
    <Switch>
        <Route exact={true} path="/:movieId" component={Home} />
        <Route exact={true} path="/" component={Home} />
        <Route>
            <Page404 />
        </Route>
    </Switch>
)

export default Routes
