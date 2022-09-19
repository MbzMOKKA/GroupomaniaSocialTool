//Imports
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getAllUsers } from '../../utils/api_communication/index';
import { StyledUserList } from './style';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import User from '../../components/User/index';

//Component
function UserList() {
    const { token } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [users, setUsers] = useState([]);
    //Getting the users from the API when the page is loaded
    useEffect(() => {
        if (token !== null) {
            getAllUsers(token, setUsers, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    //Render
    return (
        <main className="padded-app-container">
            <h1>Tout les utilisateurs</h1>
            <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
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
