import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3001";

const Index = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
