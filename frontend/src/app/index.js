import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config.json';
import App from './js';

axios.defaults.baseURL = `${config.server.url}:${config.server.port}`;
axios.defaults.headers.common['Authorization'] = null;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(<App/>, document.getElementById('root'));