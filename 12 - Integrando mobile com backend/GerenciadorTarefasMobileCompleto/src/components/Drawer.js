import React, { PureComponent } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import { Text, Divider } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import Icon from './Icon';
import Colors from '../values/Colors';
import { removeToken, getUsuario } from '../utils/LoginManager';

const DrawerItem = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{
                fontSize: 20, color: Colors.accentDark, padding: 16
            }}>{text}</Text>
        </TouchableOpacity>
    )
}

class Drawer extends PureComponent {

    state = {};

    componentWillMount() {
        this.refreshUsuario();
    }

    componentWillReceiveProps() {
        this.refreshUsuario();
    }

    refreshUsuario = () => {
        getUsuario().then(usuario => {
            this.setState({ usuario });
        })
    }

    onSair = async () => {
        await removeToken();
        this.replaceScreen("BemVindoScreen");
    }

    replaceScreen = (routeName) => {
        const { navigation } = this.props;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        })
        navigation.dispatch(resetAction);
    }

    render() {
        const { navigation } = this.props;
        const { usuario } = this.state;
        if (!usuario) return null;
        return (
            <View style={{ flex: 1 }}>

                <View style={{
                    height: 150, padding: 16, backgroundColor: Colors.accentDark,
                    justifyContent: 'flex-end', alignItems: 'flex-start',
                }}>
                    <Icon family="MaterialIcons" name="person" size={50} color={Colors.textPrimaryLight} />
                    <Text style={{ fontSize: 16, color: Colors.textPrimaryLight }}>{usuario.nome}</Text>
                    <Text style={{ fontSize: 14, color: Colors.textSecondaryLight }}>{usuario.email}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <DrawerItem text="Home" onPress={() => null} />
                            <DrawerItem text="Suas tarefas" onPress={() => navigation.navigate('TarefasScreen')} />

                            <Divider style={{ backgroundColor: Colors.dividerDark }} />

                            <DrawerItem text="Sair" onPress={this.onSair} />
                        </View>
                    </ScrollView>
                </View>

            </View>
        )
    }
}

export default Drawer;