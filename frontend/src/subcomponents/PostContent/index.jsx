//Imports
import { StyledPostContent, StyledPostText, StyledPostImage } from './style';

//Component
function PostContent({ post }) {
    //Render
    return (
        <StyledPostContent>
            <StyledPostText>{post.contentText}</StyledPostText>
            {post.contentImg !== 'no_img' && <StyledPostImage src={post.contentImg} alt="" />}
        </StyledPostContent>
    );
}

//Exports
export default PostContent;
