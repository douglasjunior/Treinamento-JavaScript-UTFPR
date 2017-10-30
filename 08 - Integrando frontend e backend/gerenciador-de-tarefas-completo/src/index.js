import React from 'react';
import ReactDOM from 'react-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'moment/locale/pt-br';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.withCredentials = true;

/**
 * Componente que define o roteador usado no react-router
 */
const Index = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
