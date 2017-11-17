import React, { Component } from 'react';
import {
    View, Text, FlatList,
    Switch, Platform, TouchableOpacity,
    Alert
} from 'react-native';
const { OS } = Platform;

import moment from 'moment';
import axios from 'axios';

import { SearchBar, Card, Divider } from 'react-native-elements';

import Colors from '../values/Colors';

const SwitchStyle = OS === 'ios' ? { transform: [{ scaleX: .7 }, { scaleY: .7 }] } : undefined;

const TarefaItem = ({ tarefa, onConcluidaChange, onTarefaPress, onTarefaLongPress }) => {
    return (
        <Card containerStyle={{ padding: 0 }}>
            <TouchableOpacity
                onPress={() => onTarefaPress(tarefa.id)}
                onLongPress={() => onTarefaLongPress(tarefa.id)}>

                <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row' }}>
                    <Text style={{ color: Colors.textSecondaryDark, fontSize: 14, flex: 1 }}
                    >#{tarefa.id}</Text>
                    <Text style={{ color: Colors.textSecondaryDark, fontSize: 14, }}
                    >{moment(tarefa.createdAt).format('DD/MM/YYYY [às] HH:mm')}</Text>
                </View>

                <Divider />

                <View style={{ paddingHorizontal: 24, paddingVertical: 8 }}>
                    <Text
                        style={{ color: Colors.textPrimaryDark, fontSize: 18 }}
                    >{tarefa.titulo}</Text>
                </View>

                <Divider />

            </TouchableOpacity>

            <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={{ color: Colors.textSecondaryDark, fontSize: 14, flex: 1 }}
                >{tarefa.concluida ? "Concluída" : "Pendente"}</Text>
                <Switch value={tarefa.concluida} style={SwitchStyle} onValueChange={value => onConcluidaChange(tarefa.id, value)} />
            </View>
        </Card>
    )
}

export default class TarefasScreen extends Component {

    termoBusca = '';
    state = { tarefas: [], refreshing: false, };

    componentDidMount() {
        this.getTarefas();
    }

    getTarefas = (busca = '') => {
        axios.get('/tarefas', {
            params: {
                titulo: busca
            }
        }).then(response => {
            this.setState({
                tarefas: response.data
            })
        }).catch(ex => {
            console.warn(ex);
            console.warn(ex.response);
        })
    }

    onBuscaChange = (text) => {
        clearTimeout(this.buscaTimeout);
        this.termoBusca = text;
        this.buscaTimeout = setTimeout(() => {
            this.getTarefas(text);
        }, 500);
    }

    onConcluidaChange = (tarefaId, concluida) => {
        let axiosMethod;
        if (concluida) {
            axiosMethod = axios.put('/tarefas/concluida/' + tarefaId);
        } else {
            axiosMethod = axios.delete('/tarefas/concluida/' + tarefaId);
        }
        axiosMethod.then(response => {
            if (response.status === 204) {
                const tarefas = [...this.state.tarefas];
                const tarefa = tarefas.find(tarefa => tarefa.id === tarefaId);
                tarefa.concluida = concluida;
                this.setState({ tarefas });
            }
        }).catch(ex => {
            console.warn(ex, ex.response);
        })
    }

    onRefresh = () => {
        this.getTarefas(this.termoBusca);
    }

    onTarefaPress = (tarefaId) => {
        axios.get('/tarefas/' + tarefaId)
            .then(response => {
                this.props.navigation.navigate('TarefaScreen', { tarefa: response.data, onRefresh: this.onRefresh });
            }).catch(ex => {
                console.warn(ex);
                console.warn(ex.response);
            });
    }

    onExcluirTarefa = (tarefaId) => {
        axios.delete('/tarefas/' + tarefaId)
            .then(response => {
                if (response.status === 204) {
                    const tarefas = [...this.state.tarefas];
                    const index = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
                    tarefas.splice(index, 1);
                    this.setState({ tarefas });
                }
            }).catch(ex => {
                console.warn(ex);
                console.warn(ex.response);
            })
    }

    onTarefaLongPress = (tarefaId) => {
        Alert.alert("Excluir tarefa", `Deseja excluir a tarefa ${tarefaId}?`, [
            { text: "Cancelar" },
            { text: "Excluir", onPress: () => this.onExcluirTarefa(tarefaId), style: "destructive" }
        ])
    }

    renderItem = ({ item, index }) => {
        return (
            <TarefaItem tarefa={item} onConcluidaChange={this.onConcluidaChange}
                onTarefaPress={this.onTarefaPress} onTarefaLongPress={this.onTarefaLongPress} />
        )
    }

    render() {
        const { tarefas, refreshing } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <SearchBar lightTheme={true} round={true}
                    containerStyle={{ width: '100%', }}
                    icon={{ size: 18, style: { paddingTop: 5 } }}
                    placeholder="Busca por título"
                    inputStyle={{ color: Colors.textPrimaryDark, fontSize: 18, height: 40, padding: 0, }}
                    onChangeText={this.onBuscaChange} />

                <FlatList
                    data={tarefas}
                    renderItem={this.renderItem}
                    keyExtractor={tarefa => tarefa.id}
                    onRefresh={this.onRefresh}
                    refreshing={refreshing}
                />
            </View>
        )
    }
}