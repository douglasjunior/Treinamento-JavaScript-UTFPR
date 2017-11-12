import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class HomeScreen extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>HomeScreen</Text>

                <Button title="Abrir Login" onPress={() => navigation.navigate('LoginScreen')} />
                <Button title="Abrir Tarefas" onPress={() => navigation.navigate('TarefasScreen')} />
                <Button title="Abrir Abas" onPress={() => navigation.navigate('AbasScreen')} />
               
                <Text />

                <Button title="Voltar" onPress={() => navigation.goBack(null)} />
            </View>
        )
    }
}