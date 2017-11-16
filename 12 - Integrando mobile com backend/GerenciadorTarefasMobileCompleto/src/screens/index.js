import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { StackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import UsuarioScreen from './UsuarioScreen';
import HomeScreen from './HomeScreen';
import TarefaScreen from './TarefaScreen';
import TarefasScreen from './TarefasScreen';

const HomeStackNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen
    },
    LoginScreen: {
        screen: LoginScreen
    },
    UsuarioScreen: {
        screen: UsuarioScreen
    },
    HomeScreen: {
        screen: HomeScreen
    },
    TarefaScreen: {
        screen: TarefaScreen
    },
    TarefasScreen: {
        screen: TarefasScreen
    },
});

export default class AppNavigator extends Component {
    render() {
        return (
            <HomeStackNavigator />
        )
    }
}