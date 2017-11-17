import React, { Component } from 'react';
import { View } from 'react-native';

import { NavigationActions } from 'react-navigation';

import { isLoggedIn } from '../utils/LoginManager';

export default class SplashScreen extends Component {

    async componentWillMount() {
        const isLogged = await isLoggedIn();

        let routeName;
        if (isLogged) {
            routeName = "HomeScreen";
        } else {
            routeName = "BemVindoScreen";
        }

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View />
        )
    }
}