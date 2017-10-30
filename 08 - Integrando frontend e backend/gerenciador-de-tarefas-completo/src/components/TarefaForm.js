import React, { Component } from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form
} from 'reactstrap';

import InputForm from './InputForm';
import { checkFormIsValid } from '../utils/Validator';

const TAREFA = { id: '', titulo: '', descricao: '' };

export default class TarefaForm extends Component {

    state = { tarefa: { ...TAREFA } };

    componentWillReceiveProps(nextProps) {
        if (nextProps.showForm && nextProps.tarefa !== this.props.tarefa) {
            this.setState({ tarefa: nextProps.tarefa });
        }
        if (!nextProps.showForm) {
            this.setState({ tarefa: { ...TAREFA } });
        }
    }

    onSubmitForm = (event) => {
        event.preventDefault();

        if (checkFormIsValid(this.refs)) {
            this.props.onSalvarTarefa(this.state.tarefa);
        }
    }

    onInputChange = (event) => {
        const { id, value } = event.target;
        const state = this.state;
        state.tarefa[id] = value;
        this.setState(state);
    }

    render() {
        const { showForm, onFecharForm } = this.props;
        const { tarefa: { id, titulo, descricao }, } = this.state;
        return (
            <Modal isOpen={showForm} toggle={onFecharForm} className={this.props.className}>
                <ModalHeader toggle={onFecharForm}>Tarefa</ModalHeader>
                <Form onSubmit={this.onSubmitForm}>
                    <ModalBody>
                        <InputForm label="#" id="id" ref="id" value={id} disabled={true} />
                        <InputForm label="Título" id="titulo" ref="titulo" value={titulo} onChange={this.onInputChange} required={true}
                            validator={value => !!value && value.length <= 200} errorMessage="O título é obrigatório." />
                        <InputForm label="Descrição" id="descricao" ref="descricao" value={descricao} onChange={this.onInputChange} type="textarea" />
                    </ModalBody>
                    <ModalFooter>
                        <Button type='button' color="secondary" onClick={onFecharForm} tabIndex={-1}>Cancelar</Button>{' '}
                        <Button color="primary">Salvar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}