import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const Entypo = 'Entypo',
    EvilIcons = 'EvilIcons',
    FontAwesome = 'FontAwesome',
    Foundation = 'Foundation',
    Ionicons = 'Ionicons',
    MaterialIcons = 'MaterialIcons',
    MaterialCommunityIcons = 'MaterialCommunityIcons',
    Octicons = 'Octicons',
    Zocial = 'Zocial',
    SimpleLineIcons = 'SimpleLineIcons';

const requireIconByFamily = (family) => {
    switch (family) {
        case Entypo:
            return require('react-native-vector-icons/Entypo').default;
        case EvilIcons:
            return require('react-native-vector-icons/EvilIcons').default;
        case FontAwesome:
            return require('react-native-vector-icons/FontAwesome').default;
        case Foundation:
            return require('react-native-vector-icons/Foundation').default;
        case Ionicons:
            return require('react-native-vector-icons/Ionicons').default;
        case MaterialIcons:
            return require('react-native-vector-icons/MaterialIcons').default;
        case MaterialCommunityIcons:
            return require('react-native-vector-icons/MaterialCommunityIcons').default;
        case Octicons:
            return require('react-native-vector-icons/Octicons').default;
        case Zocial:
            return require('react-native-vector-icons/Zocial').default;
        case SimpleLineIcons:
            return require('react-native-vector-icons/SimpleLineIcons').default;
    }
}

const Icon = (props) => {
    const { family, name, size, color, style } = props;

    let IconComp = requireIconByFamily(family);

    return (
        <IconComp name={name} size={size} color={color} style={{ textAlignVertical: 'center', textAlign: 'center', ...style }} />
    )
}

Icon.propTypes = {
    family: PropTypes.oneOf([
        Entypo,
        EvilIcons,
        FontAwesome,
        Foundation,
        Ionicons,
        MaterialIcons,
        MaterialCommunityIcons,
        Octicons,
        Zocial,
        SimpleLineIcons,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string,
    style: Text.propTypes.style,
}

Icon.defaultProps = {
    size: 28,
    family: MaterialIcons,
}

export default Icon;