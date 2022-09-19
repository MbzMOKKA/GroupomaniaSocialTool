//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './utils/style/GlobalStyle';
import ErrorNotFound from './pages/ErrorNotFound/index';
import LogIn from './pages/auth/LogIn/index';
import SignUp from './pages/auth/SignUp/index';
import Home from './pages/Home/index';
import UserList from './pages/UserList/index';
import PostCreate from './pages/PostCreate/index';
import Header from './components/Header/index';
import ButtonScrollTop from './components/ButtonScrollTop/index';
import { SessionProvider } from './utils/context/index';

//Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GlobalStyle />
        <SessionProvider>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/login" element={<LogIn />}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
                <Route exact path="/post/new" element={<PostCreate />}></Route>
                <Route exact path="/users" element={<UserList />}></Route>
                <Route path="*" element={<ErrorNotFound />}></Route>
            </Routes>
            <ButtonScrollTop />
        </SessionProvider>
    </BrowserRouter>
);
