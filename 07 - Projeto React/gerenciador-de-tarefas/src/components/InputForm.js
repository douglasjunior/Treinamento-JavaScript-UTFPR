import React, { Component } from 'react';

import {
    FormGroup, Label,
    Col, Input,
    FormFeedback,
} from 'reactstrap';

export default class InputForm extends Component {

    state = {};

    onInputChange = (event) => {
        const { onChange, validator, required } = this.props;
        onChange(event);
        if (required) {
            const valid = validator(event.target.value);
            this.setState({ valid: valid });
        } else {
            this.setState({ valid: true });
        }
    }

    isValid() {
        return !this.props.required || !!this.state.valid;
    }

    render() {
        const {
            label, id, required, value, onChange, errorMessage,
            validator, type,
         } = this.props;
        const { valid } = this.state;
        return (
            <FormGroup row>
                <Label for={id} sm={2}>{label}</Label>
                <Col sm={10}>
                    <Input id={id} type={type} value={value} valid={valid}
                        required={required} onChange={this.onInputChange} />
                    <FormFeedback>{errorMessage}</FormFeedback>
                </Col>
            </FormGroup>
        );
    }
}