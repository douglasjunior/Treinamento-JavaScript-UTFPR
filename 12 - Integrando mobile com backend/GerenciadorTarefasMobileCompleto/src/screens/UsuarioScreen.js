import React, { Component } from 'react';
import {
    View, Platform, ScrollView,
} from 'react-native';

import { Text } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';

import Colors from '../values/Colors';
import StatusBar from '../components/StatusBar';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { validateEmail, validateSenha, checkFormIsValid } from '../utils/Validator';

const DATE_FORMAT = 'DD/MM/YYYY';

export default class UsuarioScreen extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        nascimento: ''
    };

    onFormSubmit = (event) => {
        if (checkFormIsValid(this.refs)) {
            this.postUsuario();
        }
    }

    postUsuario = () => {
        const { navigation } = this.props;
        const { nome, email, senha, nascimento } = this.state;

        axios.post('/usuarios', {
            nome, email,
            senha,
            nascimento: moment(nascimento, DATE_FORMAT).format("YYYY-MM-DD")
        }).then(response => {
            if (response.status === 201) {
                alert('Usuário cadastrado com sucesso!');
                navigation.goBack(null);
                navigation.navigate('LoginScreen');
            } else {
                alert('Não foi possível cadastrar o usuário, verifique os dados informados e tente novamente.');
            }
        }).catch(ex => {
            console.warn(ex);
            console.warn('response', ex.response)
            if (ex.response) {
                if (ex.response.status === 422) {
                    alert('Não foi possível cadastrar o usuário, verifique os dados informados e tente novamente.');
                    return;
                } else if (ex.response.status === 412) {
                    if (ex.response.data.type === 'unique') {
                        alert('E-mail já cadastrado na base de dados.');
                        return;
                    }
                }
            }
            alert('Não foi possível cadastrar o usuário, tente novamente mais tarde.');
        })
    }

    onInputChange = (id, value) => {
        const state = {};
        state[id] = value;
        this.setState(state);
    }

    validateNascimento = (value) => {
        return moment(value, DATE_FORMAT, true).isValid();
    }

    render() {
        const { nome, email, senha, nascimento } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <StatusBar />

                <ScrollView style={{ flex: 1, }}>
                    <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 16 }}>

                        <TextInput id="nome" ref="nome" label="Nome" value={nome} onChange={this.onInputChange} required={true}
                            validator={value => !!value && value.length >= 3} errorMessage="O nome é obrigatório." />

                        <TextInput id="email" ref="email" label="E-mail" value={email} onChange={this.onInputChange} required={true}
                            validator={validateEmail} errorMessage="Informe um e-mail válido." keyboardType="email-address"
                            autoCapitalize="none" />

                        <TextInput id="senha" ref="senha" label="Senha" value={senha} onChange={this.onInputChange} required={true}
                            secureTextEntry={true}
                            validator={validateSenha} errorMessage="A senha deve conter no mínimo 6 e no máximo 8 caracteres." />

                        <TextInput id="nascimento" ref="nascimento" label="Data de nascimento" type="date" required={true}
                            dateFormat={DATE_FORMAT} value={nascimento} onChange={this.onInputChange}
                            validator={this.validateNascimento} errorMessage="Informe a data de nascimento no formato dd/mm/aaaa." />

                        <Button title="CRIAR CONTA" onPress={this.onFormSubmit} />

                    </View>
                </ScrollView>
            </View>
        )
    }
}