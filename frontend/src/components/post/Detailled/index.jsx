//Imports
import { updatePostLikeLocally, likePost } from '../../../utils/api_communication/index';
import { useContext, useState } from 'react';
import { formatDate } from '../../../utils/misc/index';
import { StyledDetailledPostCard, StyledPostHeader, StyledPostUploaderAndDate, StyledPostContent, StyledPostText, StyledPostImage, StyledPostFooter, StyledPostReaction, StyledPostEditCounter } from '../style';
import { IconInButton } from '../../../utils/style/GlobalStyle';
import { SessionContext } from '../../../utils/context/index';
import ErrorMsg from '../../../components/common/ErrorMsg/index';

//Component
function DetailedPost({ post, setPost }) {
    const { token, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    //const redirect = useNavigate();

    //Render
    return (
        <>
            <StyledDetailledPostCard className="padded-app-container">
                <StyledPostHeader>
                    <StyledPostUploaderAndDate>
                        <h2>
                            <i className="fa-solid fa-pen-to-square" />
                            {post.uploaderId === accountInfo.userId ? <>Vous avez </> : <>{post.uploaderDisplayName} à </>}publié :
                        </h2>
                        <p>{formatDate(post.uploadDate)}</p>
                    </StyledPostUploaderAndDate>
                </StyledPostHeader>
                <StyledPostContent>
                    <StyledPostText>{post.contentText}</StyledPostText>
                    {post.contentImg !== 'no_img' && <StyledPostImage src={post.contentImg} alt="" />}
                </StyledPostContent>
                <StyledPostFooter>
                    <StyledPostReaction>
                        <button
                            onClick={() => {
                                likePost(token, post._id, updatePostLikeLocally(post, setPost), setShowErrorApiResponse);
                            }}
                        >
                            {post.youHaveLiked === true ? <IconInButton className="fa-solid fa-heart" /> : <IconInButton className="fa-regular fa-heart" />}
                            {post.likeCounter}
                        </button>
                    </StyledPostReaction>
                    <StyledPostEditCounter>Modifié {post.editCounter} fois</StyledPostEditCounter>
                </StyledPostFooter>
                <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
            </StyledDetailledPostCard>
        </>
    );
}

//Exports
export default DetailedPost;
