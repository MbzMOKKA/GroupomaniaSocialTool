//Imports
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../utils/context/index';
import { updatePostLikeLocally, updatePostLikeInListLocally, likePost } from '../../utils/api_communication/index';
import { StyledPostFooter, StyledPostReaction, StyledLikeButton, StyledPostEditCounter } from './style';
import { IconInButton } from '../../utils/style/GlobalStyle';

//Component
function PostFooter({ post, setPost, posts, setPosts, isDetailled, setShowErrorApiResponse }) {
    const { token } = useContext(SessionContext);
    const redirect = useNavigate();

    //Render
    return (
        <StyledPostFooter>
            <StyledPostReaction>
                <StyledLikeButton
                    youHaveLiked={post.youHaveLiked}
                    onClick={() => {
                        let action = undefined;
                        if (isDetailled === true) {
                            action = updatePostLikeLocally(post, setPost);
                        } else {
                            action = updatePostLikeInListLocally(post._id, posts, setPosts);
                        }
                        likePost(token, post._id, action, setShowErrorApiResponse);
                    }}
                >
                    {post.youHaveLiked === true ? <IconInButton className="fa-solid fa-heart" /> : <IconInButton className="fa-regular fa-heart" />}
                    {post.likeCounter}
                    {isDetailled === true && <> J'aime</>}
                </StyledLikeButton>
                {isDetailled === false && (
                    <button
                        onClick={() => {
                            redirect(`/posts/details/${post._id}`, { replace: false });
                        }}
                    >
                        <IconInButton className="fa-regular fa-comments" />
                        {post.commentCounter}
                    </button>
                )}
            </StyledPostReaction>
            {isDetailled === true ? (
                <>
                    <StyledPostEditCounter>Modifié {post.editCounter} fois</StyledPostEditCounter>
                </>
            ) : (
                <>{post.editCounter > 0 && <StyledPostEditCounter>Modifié</StyledPostEditCounter>}</>
            )}
        </StyledPostFooter>
    );
}

//Exports
export default PostFooter;
