import React, { Component } from 'react';
import {
    View, Platform
} from 'react-native';

import { Text } from 'react-native-elements';

import Colors from '../values/Colors';
import StatusBar from '../components/StatusBar';

export default class LoginScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1, }}>
                <StatusBar />

                <Text>Login Screen</Text>
            </View>
        )
    }
}