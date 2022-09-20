//Imports
import { useContext } from 'react';
import { StyledPostHeader, StyledPostUploaderAndDate, StyledButtonPostOptions } from './style';
import { SessionContext } from '../../utils/context/index';
import { formatDate } from '../../utils/misc/index';

//Component
function PostHeader({ post, isComment, isDetailled, setShowPostOptions }) {
    const { accountInfo } = useContext(SessionContext);

    //Render
    return (
        <StyledPostHeader>
            <StyledPostUploaderAndDate>
                <h2>
                    {isComment === true ? <i className="fa-regular fa-comment-dots" /> : <i className="fa-solid fa-pen-to-square" />}
                    {post.uploaderId === accountInfo.userId ? <>Vous avez </> : <>{post.uploaderDisplayName} à </>}
                    {isComment === true ? <>commenté</> : <>publié</>} :
                </h2>
                <p>{formatDate(post.uploadDate)}</p>
            </StyledPostUploaderAndDate>
            {(accountInfo.role > 0 || accountInfo.userId === post.uploaderId) && isDetailled === false && (
                <StyledButtonPostOptions
                    onClick={() => {
                        setShowPostOptions(true);
                    }}
                >
                    <i className="fa-solid fa-ellipsis" />
                </StyledButtonPostOptions>
            )}
        </StyledPostHeader>
    );
}

//Exports
export default PostHeader;
