

import React, { PureComponent } from 'react';
import {
    View,
    TextInput as TI
} from 'react-native';

import {
    Text
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import Colors from '../values/Colors';

class TextInput extends PureComponent {

    state = { valid: null };

    onChange = (text) => {
        const { validator, id, onChange } = this.props;
        onChange(id, text);
        if (validator) {
            this.setState({ valid: validator(text) })
        }
    }

    isValid = () => {
        if (!this.props.required)
            return true;

        if (this.state.valid !== null)
            return this.state.valid;

        const { validator, value } = this.props;
        let valid = false;
        if (validator) valid = !!validator(value);
        this.setState({ valid });

        return valid;
    }

    render() {
        const { label, id, errorMessage, type, dateFormat, validator, value,
            required, onChange, editable, secureTextEntry, keyboardType, autoCapitalize,
            style, multiline, numberOfLines, ...others } = this.props;
        const { valid } = this.state;

        const borderColor = valid === false ? 'red' : Colors.accent;

        let CustomInput;
        if (type === 'date') {
            CustomInput = (
                <DatePicker
                    ref="TextInput"
                    date={value}
                    onDateChange={this.onChange}
                    placeholder={label}
                    format={dateFormat}
                    confirmBtnText="Confirmar"
                    cancelBtnText="Cancelar"
                    showIcon={true}
                    is24Hour={true}
                    style={{ width: '100%' }}
                    disabled={editable === false}
                    customStyles={{
                        dateInput: {
                            width: '100%', alignItems: "flex-start",
                            height: 45, paddingLeft: 15,
                            borderRadius: 2, backgroundColor: "#fff",
                            borderColor: borderColor,
                            ...style
                        },
                        disabled: {
                            backgroundColor: "#fff", height: 45, borderRadius: 2,
                        },
                        dateText: {
                            fontSize: 18,
                            color: Colors.textPrimaryDark,
                        },
                        dateTouchBody: {
                            flex: 1, width: '100%', height: 45,
                        },
                        placeholderText: {
                            color: Colors.textHintDark,
                            fontSize: 18,
                        },
                        btnTextConfirm: {
                            color: Colors.accent,
                            fontWeight: 'bold',
                        },
                        btnTextCancel: {
                            color: Colors.accentLight,
                        }
                    }}
                />
            )
        } else {
            CustomInput = (
                <TI ref="TextInput"
                    secureTextEntry={secureTextEntry} underlineColorAndroid={Colors.transparent}
                    placeholder={label} placeholderTextColor={Colors.textHintDark}
                    value={value} editable={editable}
                    onChangeText={this.onChange} autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType} multiline={multiline}
                    numberOfLines={numberOfLines}
                    style={{
                        backgroundColor: '#fff', minHeight: 45, width: '100%', paddingLeft: 16,
                        fontSize: 18, color: Colors.textPrimaryDark,
                        borderColor: borderColor, borderWidth: 1, borderRadius: 2,
                        ...style
                    }} />
            )
        }

        return (
            <View style={{ width: '100%' }}>

                {CustomInput}

                <Text style={{ color: 'red' }}>{valid === false ? errorMessage : ''}</Text>
            </View>
        )
    }
}

export default TextInput;