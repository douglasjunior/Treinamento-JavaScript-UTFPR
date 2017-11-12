import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class SegundaTab extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>SegundaTab</Text>

                <Button title="Abrir Home" onPress={() => navigation.navigate('HomeScreen')} />
                <Button title="Abrir Login" onPress={() => navigation.navigate('LoginScreen')} />
                <Button title="Abrir Tarefas" onPress={() => navigation.navigate('TarefasScreen')} />
               
                <Text />

                <Button title="Voltar" onPress={() => navigation.goBack(null)} />
            </View>
        )
    }
}