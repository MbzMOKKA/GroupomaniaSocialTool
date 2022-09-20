//Imports
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SessionContext } from '../../utils/context/index';
import { getPostDetails } from '../../utils/api_communication/index';
import { StyledPostList, StyleButtonUpload, StyledNoCommentMsg } from './style';
import { IconInButton } from '../../utils/style/GlobalStyle';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import DetailledPost from '../../components/post/Detailled/index';
import Comment from '../../components/post/Comment/index';
import ButtonBack from '../../components/ButtonBack/index';

//Component
function PostDetails() {
    const { token } = useContext(SessionContext);
    const { postId } = useParams();
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [post, setPost] = useState({ comments: [] });
    const redirect = useNavigate();

    function updateComments(newComments) {
        let newPost = JSON.parse(JSON.stringify(post));
        delete newPost.comments;
        newPost.comments = newComments;
        setPost(newPost);
    }

    //Getting the post details from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getPostDetails(token, postId, setPost, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, postId]);

    //Render
    return (
        <main>
            <div className="padded-app-container">
                <ButtonBack />
            </div>
            <DetailledPost key={post._id} post={post} setPost={setPost} />
            <div className="padded-app-container">
                <h1>Commentaires</h1>
                <StyleButtonUpload
                    onClick={() => {
                        redirect(`/posts/reply/${postId}`, { replace: false });
                    }}
                >
                    <IconInButton className="fa-regular fa-comment-dots" />
                    Poster un commentaire
                </StyleButtonUpload>
                <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>

                {post.comments.length > 0 ? (
                    <>
                        <StyledPostList>
                            {post.comments.map((comment) => {
                                return <Comment key={comment._id} comment={comment} comments={post.comments} updateComments={updateComments} />;
                            })}
                        </StyledPostList>
                    </>
                ) : (
                    <StyledNoCommentMsg>
                        <i className="fa-solid fa-circle-info" />
                        Aucun commentaire pour le moment...
                    </StyledNoCommentMsg>
                )}
            </div>
        </main>
    );
}

//Exports
export default PostDetails;
