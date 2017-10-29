import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from '../utils/LoginManager';

export default ({ render, ...others }) => (
    <Route {...others} render={isLoggedIn()
        ? render
        : props => (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    } />
)