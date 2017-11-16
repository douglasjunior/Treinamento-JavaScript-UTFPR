import React, { Component } from 'react';
import {
    View, ImageBackground,
    Image, Dimensions, StatusBar
} from 'react-native';

import { Text } from 'react-native-elements';

import Button from '../components/Button';
import Colors from '../values/Colors';

export default class BemVindoScreen extends Component {

    render() {
        const { width } = Dimensions.get('window');
        return (
            <ImageBackground source={require('../drawables/background.jpg')} resizeMode="cover"
                style={{
                    flex: 1, alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%'
                }} >
                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={Colors.transparent} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={require('../drawables/logo.png')} style={{ flex: 1, width: width * 0.5 }} resizeMode="contain" />
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 16, width: '100%' }}>
                    <Button title="Criar conta" buttonStyle={{ marginBottom: 8, }} />
                    <Button title="Entrar" color={Colors.primary} backgroundColor={Colors.transparent}
                        buttonStyle={{ borderColor: Colors.primary, borderWidth: 2, }} />
                </View>
            </ImageBackground>
        )
    }
}