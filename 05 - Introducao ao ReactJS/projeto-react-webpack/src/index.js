import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

//const app = React.createElement(App);
const app = <App />;

ReactDOM.render(app, document.getElementById('root'));
