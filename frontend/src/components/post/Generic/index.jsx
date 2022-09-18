//Imports
import { likePost } from '../../../utils/api_communication/index';
import { useContext, useState } from 'react';
import { formatDate } from '../../../utils/misc/index';
import { StyledPostCard, StyledPostHeader, StyledPostUploaderAndDate, StyledButtonPostOptions, StyledPostContent, StyledPostText, StyledPostImage, StyledPostFooter, StyledPostReaction, StyledPostEditCounter } from '../style';
import { IconInButton } from '../../../utils/style/GlobalStyle';
import { SessionContext } from '../../../utils/context/index';
import ErrorMsg from '../../../components/common/ErrorMsg/index';

//Component
function Post({ post, posts, setPosts }) {
    const { token, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);

    //Render
    return (
        <StyledPostCard>
            <StyledPostHeader>
                <StyledPostUploaderAndDate>
                    <h2>
                        <i className="fa-solid fa-pen-to-square" />
                        {post.uploaderId === accountInfo.userId ? <>Vous avez </> : <>{post.uploaderDisplayName} à </>}publié :
                    </h2>
                    <p>{formatDate(post.uploadDate)}</p>
                </StyledPostUploaderAndDate>
                {accountInfo.role > 0 && (
                    <StyledButtonPostOptions onClick={() => {}}>
                        <i className="fa-solid fa-ellipsis" />
                    </StyledButtonPostOptions>
                )}
            </StyledPostHeader>
            <StyledPostContent>
                <StyledPostText>{post.contentText}</StyledPostText>
                {post.contentImg !== 'no_img' && <StyledPostImage src={post.contentImg} alt="" />}
            </StyledPostContent>
            <StyledPostFooter>
                <StyledPostReaction>
                    <button
                        onClick={() => {
                            likePost(token, post._id, posts, setPosts, setShowErrorApiResponse);
                        }}
                    >
                        {post.youHaveLiked === true ? <IconInButton className="fa-solid fa-heart" /> : <IconInButton className="fa-regular fa-heart" />}
                        {post.likeCounter}
                    </button>
                    <button onClick={() => {}}>
                        <IconInButton className="fa-regular fa-comment-dots" />
                        {post.commentCounter}
                    </button>
                </StyledPostReaction>
                {post.editCounter > 0 && <StyledPostEditCounter>Modifié</StyledPostEditCounter>}
            </StyledPostFooter>
            <div>
                {
                    //Error showing when email or password are incorrect
                    showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null
                }
            </div>
        </StyledPostCard>
    );
}

//Exports
export default Post;
