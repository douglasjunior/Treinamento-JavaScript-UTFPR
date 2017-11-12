import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class LoginScreen extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>LoginScreen</Text>

                <Button title="Abrir Home" onPress={() => navigation.navigate('HomeScreen')} />
                <Button title="Abrir Tarefas" onPress={() => navigation.navigate('TarefasScreen')} />
                <Button title="Abrir Abas" onPress={() => navigation.navigate('AbasScreen')} />
     
                <Text />

                <Button title="Voltar" onPress={() => navigation.goBack(null)} />
            </View>
        )
    }
}