import React, { Component } from 'react';

import {
    FormGroup, Label,
    Col, Input,
    FormFeedback
} from 'reactstrap';
import DatePicker from 'react-datepicker';

export default class InputForm extends Component {

    state = { valid: null };

    onChange = (event) => {
        const { validator, onChange } = this.props;
        onChange(event);
        if (validator) {
            this.setState({ valid: validator(event.target.value) })
        }
    }

    onDateChange = (date) => {
        const { validator, id, onChange } = this.props;
        onChange({
            target: {
                value: date,
                id: id,
            }
        });
        if (validator) {
            this.setState({ valid: !!validator(date) })
        }
    }

    isValid = () => {
        if (!this.props.required)
            return true;

        if (this.state.valid !== null)
            return this.state.valid;

        const { validator } = this.props;
        let valid = false;
        if (validator) valid = !!validator(this.input.value);
        this.setState({ valid });

        return valid;
    }

    render() {
        const { label, id, errorMessage, type, dateFormat, validator, value, required, onChange, ...others } = this.props;
        const { valid } = this.state;

        let CustomInput;
        if (type === 'date') {
            CustomInput = (
                <Col sm={10}>
                    <DatePicker
                        ref={ref => this.input = ref}
                        customInput={<Input id={id} valid={valid} style={{ display: 'inline' }} {...others} />}
                        dateFormat={dateFormat}
                        locale="pt-br"
                        selected={value}
                        useWeekdaysShort={true}
                        isClearable={true}
                        onChangeRaw={this.onChange}
                        onChange={this.onDateChange} />
                    <FormFeedback style={{ display: valid === false ? 'inline' : 'none' }}>{errorMessage}</FormFeedback>
                </Col>
            )
        } else {
            CustomInput = (
                <Col sm={10}>
                    <Input ref={ref => this.input = ref} id={id} valid={valid} value={value} type={type} {...others} onChange={this.onChange} />
                    <FormFeedback>{errorMessage}</FormFeedback>
                </Col>
            )
        }

        return (
            <FormGroup row>
                <Label for={id} sm={2}>{label}</Label>
                {CustomInput}
            </FormGroup>
        )
    }
}