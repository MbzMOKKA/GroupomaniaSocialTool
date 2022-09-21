//Imports
import { useContext } from 'react';
import { SessionContext } from '../../../../utils/context/index';
import BubbleContainer from '../../../common/BubbleContainer/index';
import ButtonEdit from '../ButtonEdit/index';
import ButtonDelete from '../ButtonDelete/index';

//Component
function PostOptions({ setBubbleIsOpen, posts, setPosts, postId }) {
    const { accountInfo } = useContext(SessionContext);

    //Render
    return (
        <BubbleContainer setBubbleIsOpen={setBubbleIsOpen}>
            <p>Modération :</p>
            {accountInfo.role > 1 && <ButtonEdit setBubbleIsOpen={setBubbleIsOpen} postId={postId} postIsDetailled={false} />}
            <ButtonDelete setBubbleIsOpen={setBubbleIsOpen} postId={postId} posts={posts} setPosts={setPosts} postIsDetailled={false} />
        </BubbleContainer>
    );
}

//Exports
export default PostOptions;
