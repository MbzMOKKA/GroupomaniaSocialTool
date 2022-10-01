//Imports
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider, NotificationProvider } from './utils/context/index';
import GlobalStyle from './utils/style/GlobalStyle';
import App from './components/App/index';

//Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <SessionProvider>
            <NotificationProvider>
                <GlobalStyle />
                <App />
            </NotificationProvider>
        </SessionProvider>
    </BrowserRouter>
);
