//Imports
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getAllPosts, getNewPosts } from '../../utils/api_communication/index';
import { StyleButtonUpload, StyledPostList, StyledNoPostMsg } from './style';
import { IconInButton } from '../../utils/style/GlobalStyle';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import Post from '../../components/post/Generic/index';

//Component
function Home() {
    const { token } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [posts, setPosts] = useState([]);
    const [unread, setUnread] = useState(0);
    const [newCheckCounter, setNewCheckCounter] = useState(0);
    const redirect = useNavigate();
    const newCheckCooldown = 1000 * 5;

    //Getting the users from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getAllPosts(token, posts, setPosts, false, unread, setUnread, setShowErrorApiResponse);
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
            if (document.hasFocus()) {
                setUnread(0);
            }
        }, newCheckCooldown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCheckCounter]);

    //Changing the page title when new message are recieved
    /*useEffect(() => {
        let name = ``;
        if (unread > 0) {
            name = name + `(${unread}) `;
        } else {
        }
        name = name + `Groupomania`;
        document.title = name;
    }, [unread]);*/

    ////////////////////////////////////////////////////////

    /*function startEditPost(e, post) {
         e.preventDefault();
        setEditedPostObj({
            _id: post._id,
            contentTxt: post.contentText,
            contentImg: post.contentImg,
        });
    }*/
    //Render
    return (
        <main className="padded-app-container">
            <h1>Dernières publications</h1>
            <StyleButtonUpload
                onClick={() => {
                    redirect('/posts/create', { replace: false });
                }}
            >
                <IconInButton className="fa-solid fa-pencil" />
                Créer une publication
            </StyleButtonUpload>

            {posts.length > 0 ? (
                <>
                    <StyledPostList>
                        {posts.map((post) => {
                            return <Post key={post._id} post={post} posts={posts} setPosts={setPosts} isComment={false} />;
                        })}
                    </StyledPostList>
                    <button
                        onClick={() => {
                            getAllPosts(token, posts, setPosts, false, null, null, setShowErrorApiResponse);
                        }}
                    >
                        <IconInButton className="fa-solid fa-circle-chevron-down" />
                        Voir plus
                    </button>
                </>
            ) : (
                <StyledNoPostMsg>
                    <i className="fa-solid fa-circle-info" />
                    Aucune publication pour le moment...
                </StyledNoPostMsg>
            )}
            <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
        </main>
    );
}

//Exports
export default Home;
