import React from 'react';
import { Platform, StatusBar as SB } from 'react-native';
const { OS } = Platform;

import Colors from '../values/Colors';

const StatusBar = (props) => {
    return (
        <SB {...props} />
    )
}

StatusBar.propTypes = {
    ...SB.propTypes
};

StatusBar.defaultProps = {
    backgroundColor: Colors.primaryDark,
    barStyle: OS === 'ios' ? 'dark-content' : 'light-content',
    translucent: false,
}

export default StatusBar;