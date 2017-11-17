import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import axios from 'axios';

import { checkFormIsValid } from '../utils/Validator';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

export default class TarefaScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.navigation.state.params.tarefa
        }
    }

    onInputChange = (id, value) => {
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    onSubmitForm = (event) => {
        if (checkFormIsValid(this.refs)) {
            this.onSalvarTarefa();
        }
    }

    onSalvarTarefa = () => {
        const tarefa = this.state;
        let axiosMethod;
        if (tarefa.id) {
            axiosMethod = axios.put('/tarefas/' + tarefa.id, tarefa);
        } else {
            axiosMethod = axios.post('/tarefas', tarefa);
        }
        axiosMethod.then(response => {
            this.props.navigation.goBack(null);
            this.props.navigation.state.params.onRefresh();
        }).catch(ex => {
            console.warn(ex);
            console.warn(ex.response);
        })
    }

    render() {
        const { id, titulo, descricao } = this.state;

        return (
            <ScrollView style={{ flex: 1 }}>

                <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>

                    <TextInput id="id" ref="id" label="ID" value={`${id || ''}`} onChange={this.onInputChange} editable={false} style={{ borderColor: '#fff' }} />

                    <TextInput id="titulo" ref="titulo" label="Título" value={titulo} onChange={this.onInputChange} required={true}
                        validator={value => !!value} errorMessage="O título é obrigatório." />

                    <TextInput id="descricao" ref="descricao" label="Descricao" value={descricao} onChange={this.onInputChange}
                        required={false} multiline={true} numberOfLines={2} />

                    <Button title="Salvar" onPress={this.onSubmitForm} />
                </View>

            </ScrollView>
        )
    }
}