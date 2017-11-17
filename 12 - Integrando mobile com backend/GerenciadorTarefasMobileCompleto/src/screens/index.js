import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import { StackNavigator } from 'react-navigation';

import SplashScreen from './SplashScreen';
import BemVindoScreen from './BemVindoScreen';
import LoginScreen from './LoginScreen';
import UsuarioScreen from './UsuarioScreen';
import HomeScreen from './HomeScreen';
import TarefaScreen from './TarefaScreen';
import TarefasScreen from './TarefasScreen';

import Colors from '../values/Colors';

const defaultNavigationOptions = Platform.select({
    ios: {
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            color: Colors.textPrimaryDark,
        }
    }, android: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: Colors.primary
        },
    }
})

const HomeStackNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: () => null,
        }
    },
    BemVindoScreen: {
        screen: BemVindoScreen,
        navigationOptions: {
            header: () => null,
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title: "Entrar",
            ...defaultNavigationOptions
        }
    },
    UsuarioScreen: {
        screen: UsuarioScreen,
        navigationOptions: {
            title: "Criar conta",
            ...defaultNavigationOptions
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Gerenc. Tarefas",
            ...defaultNavigationOptions
        }
    },
    TarefaScreen: {
        screen: TarefaScreen,
        navigationOptions: {
            title: "Tarefa",
            ...defaultNavigationOptions
        }
    },
    TarefasScreen: {
        screen: TarefasScreen,
        navigationOptions: {
            title: "Suas Tarefas",
            ...defaultNavigationOptions
        }
    },
});

export default class AppNavigator extends Component {
    render() {
        return (
            <HomeStackNavigator />
        )
    }
}