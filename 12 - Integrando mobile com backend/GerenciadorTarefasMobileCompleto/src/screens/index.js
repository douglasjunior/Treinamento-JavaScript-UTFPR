import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { StackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';

const HomeStackNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen
    }
});

export default class AppNavigator extends Component {
    render(){
        return (
            <HomeStackNavigator />
        )
    }
}