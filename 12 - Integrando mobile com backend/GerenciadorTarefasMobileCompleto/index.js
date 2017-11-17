import { AppRegistry } from 'react-native';
import App from './src/App';

import axios from 'axios';

import { getToken } from './src/utils/LoginManager';

axios.defaults.baseURL = "http://192.168.100.5:3001/api/";
axios.interceptors.request.use(async (request) => {
    
    request.headers['x-access-token'] = await getToken();

    return request;
})

AppRegistry.registerComponent('GerenciadorTarefasMobileCompleto', () => App);
