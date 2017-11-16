import React from 'react';
import { Platform } from 'react-native';
const { OS } = Platform;

import { Button as Btn } from 'react-native-elements';

import Colors from '../values/Colors';

const Button = ({ title, textStyle, ...props }) => {
    return (
        <Btn
            title={OS === 'android' ? title.toUpperCase() : title}
            textStyle={{ fontSize: 18, fontWeight: "400", ...textStyle }}
            {...props} />
    )
}

Button.propTypes = {
    ...Btn.propTypes
};

Button.defaultProps = {
    borderRadius: 2,
    backgroundColor: Colors.primary,
}

export default Button;