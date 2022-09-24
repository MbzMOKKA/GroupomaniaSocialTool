//Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../../utils/style/GlobalStyle';
import ErrorNotFound from '../../pages/ErrorNotFound/index';
import LogIn from '../../pages/auth/LogIn/index';
import SignUp from '../../pages/auth/SignUp/index';
import Home from '../../pages/Home/index';
import UserList from '../../pages/UserList/index';
import PostCreate from '../../pages/PostCreate/index';
import PostEdit from '../../pages/PostEdit/index';
import CommentCreate from '../../pages/CommentCreate/index';
import PostDetails from '../../pages/PostDetails/index';
import Header from '../Header/index';
import DesktopAsideLeft from '../DesktopAsideLeft/index';
import DesktopAsideRight from '../DesktopAsideRight/index';
import ButtonScrollTop from '../ButtonScrollTop/index';
import { SessionProvider, NotificationProvider } from '../../utils/context/index';
import { StyledAppContainer, StyledMainContainer } from './style.jsx';

//Component
function App() {
    //Render
    return (
        <StyledAppContainer>
            <BrowserRouter>
                <SessionProvider>
                    <NotificationProvider>
                        <DesktopAsideLeft />
                        <StyledMainContainer>
                            <GlobalStyle />
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />}></Route>
                                <Route path="login" element={<LogIn />}></Route>
                                <Route path="signup" element={<SignUp />}></Route>
                                <Route path="users" element={<UserList />}></Route>
                                <Route path="posts/create" element={<PostCreate parentPostId={null} />}></Route>
                                <Route path="posts/edit/:postId" element={<PostEdit />}></Route>
                                <Route path="posts/reply/:postId" element={<CommentCreate />}></Route>
                                <Route path="posts/details/:postId" element={<PostDetails />}></Route>
                                <Route path="*" element={<ErrorNotFound />}></Route>
                            </Routes>
                            <ButtonScrollTop />
                        </StyledMainContainer>
                        <DesktopAsideRight />
                    </NotificationProvider>
                </SessionProvider>
            </BrowserRouter>
        </StyledAppContainer>
    );
}

//Exports
export default App;
