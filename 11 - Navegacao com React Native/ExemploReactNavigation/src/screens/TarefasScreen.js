import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


export default class TarefasScreen extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>TarefasScreen</Text>

                <Button title="Abrir Home" onPress={() => navigation.navigate('HomeScreen')} />
                <Button title="Abrir Login" onPress={() => navigation.navigate('LoginScreen')} />
                <Button title="Abrir Abas" onPress={() => navigation.navigate('AbasScreen')} />
             
                <Text />

                <Button title="Voltar" onPress={() => navigation.goBack(null)} />
            </View>
        )
    }
}