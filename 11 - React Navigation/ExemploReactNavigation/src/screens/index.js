import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { StackNavigator, TabNavigator, DrawerNavigator, NavigationActions, withNavigation } from 'react-navigation';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import TarefasScreen from './TarefasScreen';
import PrimeiraTab from './PrimeiraTab';
import SegundaTab from './SegundaTab';

const BackButton = withNavigation((props) => {
    const { navigation } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
            <Text style={{ padding: 8, color: 'blue' }}>Menu</Text>
        </TouchableOpacity>
    )
})

const TabIcon = ({ tintColor, source, ...othersProps }) => {
    return (
        <Image
            source={source}
            style={{ tintColor, width: 26, height: 26, }}
        />
    )
}

const TabNavigatorScreen = TabNavigator({
    PrimeiraTab: {
        screen: PrimeiraTab,
        navigationOptions: {
            tabBarLabel: 'Primeira',
            tabBarIcon: (props) => (
                <TabIcon {...props} source={require('../drawables/ic_home_black_36dp.png')} />
            )
        }
    },
    SegundaTab: {
        screen: SegundaTab,
        navigationOptions: {
            tabBarLabel: 'Segunda',
            tabBarIcon: (props) => (
                <TabIcon {...props} source={require('../drawables/ic_help_black_36dp.png')} />
            )
        }
    },
});

const HomeStackNavigator = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Home",
            headerLeft: <BackButton />
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title: "Login"
        }
    },
    TarefasScreen: {
        screen: TarefasScreen,
        navigationOptions: {
            title: "Tarefas"
        }
    },
    AbasScreen: {
        screen: TabNavigatorScreen,
        navigationOptions: {
            title: "Abas"
        }
    }
});

const HomeDrawerNavigator = DrawerNavigator({
    HomeScreen: {
        screen: HomeStackNavigator,
        navigationOptions: {
            drawerLabel: "Home"
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            drawerLabel: "Login"
        }
    },
    TarefasScreen: {
        screen: TarefasScreen,
        navigationOptions: {
            drawerLabel: "Tarefas"
        }
    },
    AbasScreen: {
        screen: TabNavigatorScreen,
        navigationOptions: {
            drawerLabel: "Abas"
        }
    }
});

export default class AppNavigator extends Component {

    render() {
        return (
            <HomeDrawerNavigator />
        )
    }

}