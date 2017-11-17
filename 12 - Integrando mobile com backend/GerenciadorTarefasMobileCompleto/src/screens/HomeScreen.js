import React, { Component } from 'react';
import { View, } from 'react-native';

import { Text } from 'react-native-elements';

import Colors from '../values/Colors';
import StatusBar from '../components/StatusBar';
import { getUsuario } from '../utils/LoginManager';

export default class HomeScreen extends Component {

    state = {};

    async componentWillMount() {
        const usuario = await getUsuario();
        this.setState({ usuario });
    }

    render() {
        const { usuario } = this.state;

        if (!usuario) return null;

        return (
            <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 16, justifyContent: 'center' }}>

                <StatusBar />

                <Text style={{ fontSize: 30, textAlign: 'center' }}>Olá {usuario.nome}, bem vindo ao Gerenciador de Tarefas.</Text>

            </View>
        )
    }
}