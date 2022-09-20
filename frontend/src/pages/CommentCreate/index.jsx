//Imports
import { useParams } from 'react-router-dom';
import PostCreate from '../PostCreate/index';

function CommentCreate() {
    const { postId } = useParams();
    //Render
    return <PostCreate parentPostId={postId} />;
}

//Exports
export default CommentCreate;
