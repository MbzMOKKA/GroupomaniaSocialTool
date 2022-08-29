//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/style.css';
import { TokenProvider } from './utils/context/index';

//Preparation

//Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <TokenProvider>
            <App />
        </TokenProvider>
    </React.StrictMode>
);
