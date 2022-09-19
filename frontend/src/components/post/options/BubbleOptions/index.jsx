//Imports
import BubbleContainer from '../../../common/BubbleContainer/index';
import ButtonEdit from '../ButtonEdit/index';
import ButtonDelete from '../ButtonDelete/index';

//Component
function PostOptions({ setBubbleIsOpen, posts, setPosts, postToDeleteId }) {
    //Render
    return (
        <BubbleContainer setBubbleIsOpen={setBubbleIsOpen}>
            <p>Plus d'action :</p>
            <ButtonEdit setBubbleIsOpen={setBubbleIsOpen} />
            <ButtonDelete setBubbleIsOpen={setBubbleIsOpen} postToDeleteId={postToDeleteId} posts={posts} setPosts={setPosts} />
        </BubbleContainer>
    );
}

//Exports
export default PostOptions;
