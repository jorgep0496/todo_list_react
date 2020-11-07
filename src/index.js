import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';

import './index.scss';
import App from './components/App.jsx';

import 'jquery';
import 'popper.js';
import 'bootstrap';

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);