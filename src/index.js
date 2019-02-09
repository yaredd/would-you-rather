import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reducers from './reducers'
import middleware from './middleware'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'


const store = createStore(reducers,middleware)

ReactDOM.render(
    <Router >
        <Provider store={store} >
            <App />
        </Provider>
    </Router>, document.getElementById('root'));
