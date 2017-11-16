import { AppRegistry } from 'react-native';
import App from './src/App';

import axios from 'axios';

axios.defaults.baseURL = "http://192.168.100.5:3001";

AppRegistry.registerComponent('GerenciadorTarefasMobileCompleto', () => App);
