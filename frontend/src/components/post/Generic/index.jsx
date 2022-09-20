//Imports
import { useNavigate } from 'react-router-dom';
import { updatePostLikeInListLocally, likePost } from '../../../utils/api_communication/index';
import { useContext, useState } from 'react';
import { formatDate } from '../../../utils/misc/index';
import { StyledPostCard, StyledPostHeader, StyledPostUploaderAndDate, StyledButtonPostOptions, StyledPostContent, StyledPostText, StyledPostImage, StyledPostFooter, StyledPostReaction, StyledPostEditCounter } from '../style';
import { IconInButton } from '../../../utils/style/GlobalStyle';
import { SessionContext } from '../../../utils/context/index';
import ErrorMsg from '../../../components/common/ErrorMsg/index';
import PostOptions from '../options/BubbleOptions/index';

//Component
function Post({ post, posts, setPosts, isComment }) {
    const { token, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState(false);
    const redirect = useNavigate();

    //Render
    return (
        <>
            {showPostOptions === true && <PostOptions setBubbleIsOpen={setShowPostOptions} posts={posts} setPosts={setPosts} postToDeleteId={post._id} />}
            <StyledPostCard>
                <StyledPostHeader>
                    <StyledPostUploaderAndDate>
                        <h2>
                            {isComment === true ? <i className="fa-regular fa-comment-dots" /> : <i className="fa-solid fa-pen-to-square" />}
                            {post.uploaderId === accountInfo.userId ? <>Vous avez </> : <>{post.uploaderDisplayName} à </>}
                            {isComment === true ? <>commenté</> : <>publié</>} :
                        </h2>
                        <p>{formatDate(post.uploadDate)}</p>
                    </StyledPostUploaderAndDate>
                    {accountInfo.role > 0 && (
                        <StyledButtonPostOptions
                            onClick={() => {
                                setShowPostOptions(true);
                            }}
                        >
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
                                likePost(token, post._id, updatePostLikeInListLocally(post._id, posts, setPosts), setShowErrorApiResponse);
                            }}
                        >
                            {post.youHaveLiked === true ? <IconInButton className="fa-solid fa-heart" /> : <IconInButton className="fa-regular fa-heart" />}
                            {post.likeCounter}
                        </button>
                        <button
                            onClick={() => {
                                redirect(`/posts/details/${post._id}`, { replace: false });
                            }}
                        >
                            <IconInButton className="fa-regular fa-comment-dots" />
                            {post.commentCounter}
                        </button>
                    </StyledPostReaction>
                    {post.editCounter > 0 && <StyledPostEditCounter>Modifié</StyledPostEditCounter>}
                </StyledPostFooter>
                <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
            </StyledPostCard>
        </>
    );
}

//Exports
export default Post;
