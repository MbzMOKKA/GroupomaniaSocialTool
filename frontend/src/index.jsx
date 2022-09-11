//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import './styles/Index.css';
import GlobalStyle from './utils/style/GlobalStyle';
//import ErrorNotFound from './pages/ErrorNotFound/index';
import Home from './pages/Home/index';
//import LogIn from './pages/LogIn/index';
//import SignUp from './pages/SignUp/index';
//import Header from './components/Header/index';
import {} from './utils/context/index';

//Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GlobalStyle />
        {/*<Header />*/}
        <Routes>
            <Route exact path="/" element={<Home />}></Route>
            {/*<Route path="/login" element={<LogIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
<Route path="*" element={<ErrorNotFound />}></Route>*/}
        </Routes>
    </BrowserRouter>
);
