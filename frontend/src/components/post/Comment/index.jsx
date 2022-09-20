//Imports
import Post from '../Generic/index';
//Component
function Comment({ comment, comments, updateComments }) {
    //Render
    return <Post post={comment} posts={comments} setPosts={updateComments} isComment={true} />;
}

//Exports
export default Comment;
