//Imports
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SessionContext, NotificationContext } from '../../utils/context/index';
import { getAllPosts, getNewPosts } from '../../utils/api_communication/index';
import { StyleButtonUpload, StyledPostList, StyledPostElement, StyledLoadMoreButton, StyledNoPostMsg } from './style';
import { IconInButton } from '../../utils/style/GlobalStyle';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import Post from '../../components/Post/index';
import LoadingSpinner from '../../components/common/LoadingSpinner';

//Component
function Home() {
    const { token, accountInfo } = useContext(SessionContext);
    const { unread, setUnread } = useContext(NotificationContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newCheckCounter, setNewCheckCounter] = useState(0);
    const redirect = useNavigate();
    const newCheckCooldown = 1000 * 5;

    //Getting the users from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getAllPosts(token, posts, setPosts, unread, setUnread, setShowErrorApiResponse).then(() => {
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    //New post check loop
    useEffect(() => {
        let lastPostLoadedId = null;
        try {
            lastPostLoadedId = posts[0]._id;
        } catch (error) {
            lastPostLoadedId = null;
        }
        getNewPosts(token, lastPostLoadedId, posts, setPosts, unread, setUnread, setShowErrorApiResponse);
        setTimeout(() => {
            setNewCheckCounter(newCheckCounter + 1);
        }, newCheckCooldown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCheckCounter]);

    //Render
    return (
        <main className="padded-app-container">
            <h1>Dernières publications</h1>
            {isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <>
                    {accountInfo.state === 0 && (
                        <StyleButtonUpload
                            onClick={() => {
                                redirect('/posts/create', { replace: false });
                            }}
                        >
                            <IconInButton className="fa-solid fa-pencil" />
                            Créer une publication
                        </StyleButtonUpload>
                    )}
                    {posts.length > 0 ? (
                        <>
                            <StyledPostList>
                                {posts.map((post) => {
                                    return (
                                        <StyledPostElement key={post._id}>
                                            <Post post={post} posts={posts} setPosts={setPosts} isComment={false} isDetailled={false} />
                                        </StyledPostElement>
                                    );
                                })}
                            </StyledPostList>
                            <StyledLoadMoreButton
                                onClick={() => {
                                    getAllPosts(token, posts, setPosts, false, null, null, setShowErrorApiResponse);
                                }}
                            >
                                <IconInButton className="fa-solid fa-circle-chevron-down" />
                                Voir plus
                            </StyledLoadMoreButton>
                        </>
                    ) : (
                        <StyledNoPostMsg>
                            <i className="fa-solid fa-circle-info" />
                            Aucune publication pour le moment...
                        </StyledNoPostMsg>
                    )}
                    <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
                </>
            )}
        </main>
    );
}

//Exports
export default Home;
