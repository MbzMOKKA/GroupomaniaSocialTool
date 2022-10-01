//Imports
import { useContext } from 'react';
import { SessionContext } from '../../../../utils/context/index';
import BubbleContainer from '../../../common/BubbleContainer/index';
import ButtonEdit from '../ButtonEdit/index';
import ButtonDelete from '../ButtonDelete/index';

//Component
function PostOptions({ setBubbleIsOpen, posts, setPosts, post }) {
    const { accountInfo } = useContext(SessionContext);

    //Render
    return (
        <BubbleContainer setBubbleIsOpen={setBubbleIsOpen}>
            <p>Plus d'action :</p>
            {(accountInfo.role > 1 || accountInfo.userId === post.uploaderId) && <ButtonEdit setBubbleIsOpen={setBubbleIsOpen} postId={post._id} postIsDetailled={false} />}
            <ButtonDelete setBubbleIsOpen={setBubbleIsOpen} postId={post._id} posts={posts} setPosts={setPosts} postIsDetailled={false} />
        </BubbleContainer>
    );
}

//Exports
export default PostOptions;
