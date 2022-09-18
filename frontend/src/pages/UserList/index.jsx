//Imports
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getAllUsers } from '../../utils/api_communication/index';
import { StyledUserList } from './style';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import { userRoleString, userStateString } from '../../utils/misc/index';
import User from '../../components/User/index';

function UserList() {
    const { token, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [users, setUsers] = useState([]);
    const [showModToolsId, setShowModToolsId] = useState(null);
    //Getting the users from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getAllUsers(token, setUsers, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    return (
        <main className="padded-app-container">
            <h1>Tout les utilisateurs</h1>
            <div>
                {
                    //Error showing when email or password are incorrect
                    showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null
                }
            </div>
            <StyledUserList>
                {users.map((user) => {
                    return <User key={user._id} user={user} users={users} setUsers={setUsers} />;
                })}
            </StyledUserList>
        </main>
    );
}

//Exports
export default UserList;
