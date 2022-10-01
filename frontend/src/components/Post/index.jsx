//Imports
import { useContext, useState } from 'react';
import { StyledPostCard, StyledPostOptionsContainer } from './style';
import { SessionContext } from '../../utils/context/index';
import ErrorMsg from '../common/ErrorMsg/index';
import PostHeader from '../../subcomponents/PostHeader/index';
import PostContent from '../../subcomponents/PostContent/index';
import PostFooter from '../../subcomponents/PostFooter/index';
import PostOptions from '../../subcomponents/post_options/BubbleOptions/index';
import ButtonEdit from '../../subcomponents/post_options/ButtonEdit/index';
import ButtonDelete from '../../subcomponents/post_options/ButtonDelete/index';

//Component
function Post({ post, setPost, posts, setPosts, isComment, isDetailled }) {
    const { accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState(false);

    //Render
    return (
        <>
            {showPostOptions === true && <PostOptions setBubbleIsOpen={setShowPostOptions} posts={posts} setPosts={setPosts} post={post} />}
            <StyledPostCard isDetailled={isDetailled} className="padded-app-container">
                <PostHeader post={post} isComment={isComment} isDetailled={isDetailled} setShowPostOptions={setShowPostOptions} />
                <PostContent post={post} />
                <PostFooter post={post} setPost={setPost} posts={posts} setPosts={setPosts} isDetailled={isDetailled} setShowErrorApiResponse={setShowErrorApiResponse} />
                {isDetailled === true && (accountInfo.role > post.uploaderRole || accountInfo.userId === post.uploaderId) && accountInfo.state === 0 && (
                    <StyledPostOptionsContainer>
                        {accountInfo.role > 1 && <ButtonEdit postId={post._id} postIsDetailled={true} />}
                        <ButtonDelete postId={post._id} postIsDetailled={true} />
                    </StyledPostOptionsContainer>
                )}
                <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
            </StyledPostCard>
        </>
    );
}

//Exports
export default Post;
