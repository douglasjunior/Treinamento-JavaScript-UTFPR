import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'moment/locale/pt-br';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ?
    "http://localhost:3001/api" :
    "/api";
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
