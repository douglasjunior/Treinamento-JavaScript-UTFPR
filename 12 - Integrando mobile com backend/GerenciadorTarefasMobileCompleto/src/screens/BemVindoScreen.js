import React, { Component } from 'react';
import {
    View, ImageBackground,
    Image, Dimensions,
} from 'react-native';

import { Text } from 'react-native-elements';

import Button from '../components/Button';
import Colors from '../values/Colors';
import StatusBar from '../components/StatusBar';

export default class BemVindoScreen extends Component {

    render() {
        const { width } = Dimensions.get('window');
        const { navigation } = this.props;
        const logoSize = width * 0.5;
        return (
            <ImageBackground source={require('../drawables/background.jpg')} resizeMode="cover"
                style={{
                    flex: 1, alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%'
                }} >

                <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={Colors.transparent} />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                    <Image source={require('../drawables/logo.png')}
                        style={{ height: logoSize, width: logoSize, }}
                        resizeMode="contain" />
                </View>

                <View style={{ flex: 1, justifyContent: "flex-end", padding: 16, width: '100%' }}>
                    <Button title="Criar conta" onPress={() => navigation.navigate('UsuarioScreen')}
                        buttonStyle={{ marginBottom: 8, }} />

                    <Button title="Entrar" onPress={() => navigation.navigate('LoginScreen')}
                        color={Colors.primary} backgroundColor={Colors.transparent}
                        buttonStyle={{ borderColor: Colors.primary, borderWidth: 2, }} />
                </View>

            </ImageBackground>
        )
    }
}