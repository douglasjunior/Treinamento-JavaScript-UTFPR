/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import ExemploLista from './screens/ExemploLista';

export default class App extends Component {
  render() {
    return (
      <View>
        <ExemploLista />
      </View>
    );
  }
}