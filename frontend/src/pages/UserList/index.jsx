//Imports
import { /*Link, */ Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { getAllUsers, setUserRole, setUserState } from '../../utils/api_communication/index';
import { StyledUserList, StyledUserCard, StyledDisplayName, StyledUserInfo, StyledShowModButton, StyledUserManage } from './style';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import { userRoleString, userStateString } from '../../utils/misc/index';

function UserList() {
    const { token, updateToken, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [users, setUsers] = useState([]);
    const [showModToolsId, setShowModToolsId] = useState(null);
    //Getting the users from the API
    useEffect(() => {
        if (token !== null) {
            getAllUsers(token, updateToken, setUsers, setShowErrorApiResponse);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    return (
        <main className="padded-app-container">
            {
                //Redirect to Login page when disconnected
                //token === null ? <Navigate to="/login" replace={true} /> : null
            }
            <h1>Tout les utilisateurs</h1>
            <div>
                {
                    //Error showing when email or password are incorrect
                    showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null
                }
            </div>
            <StyledUserList>
                {users.map((user) => {
                    return (
                        <StyledUserCard key={user._id} yourself={accountInfo.userId === user._id}>
                            <StyledDisplayName>
                                <i className="fa-solid fa-circle-user" />
                                {user.email}
                                {accountInfo.userId === user._id ? <> (Moi)</> : null}
                            </StyledDisplayName>
                            <StyledUserInfo>
                                <p className="user-role">Rôle : {userRoleString(user.role)}</p>
                                <p className="user-state">État : {userStateString(user.state)}</p>
                            </StyledUserInfo>
                            {accountInfo.userId === user._id || accountInfo.state > 0 || accountInfo.role <= user.role ? (
                                <StyledShowModButton canInterract={false}>Aucune action possible</StyledShowModButton>
                            ) : (
                                <>
                                    {showModToolsId === user._id ? (
                                        <>
                                            <StyledShowModButton
                                                onClick={() => {
                                                    setShowModToolsId(null);
                                                }}
                                            >
                                                <i className="fa-solid fa-circle-chevron-up" />
                                                Fermer les options
                                            </StyledShowModButton>
                                            <StyledUserManage>
                                                {user.role === 0 && accountInfo.role > 1 && (
                                                    <button
                                                        onClick={(e) => {
                                                            setUserRole(token, updateToken, users, setUsers, user._id, 1, setShowErrorApiResponse);
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-angles-up" />
                                                        Promouvoir (modérateur)
                                                    </button>
                                                )}
                                                {user.role === 1 && accountInfo.role > 1 && (
                                                    <button
                                                        onClick={(e) => {
                                                            setUserRole(token, updateToken, users, setUsers, user._id, 0, setShowErrorApiResponse);
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-angles-down" />
                                                        Rétrograder (staff)
                                                    </button>
                                                )}
                                                {user.state !== 0 && accountInfo.role > user.role && (
                                                    <button
                                                        onClick={(e) => {
                                                            setUserState(token, updateToken, users, setUsers, user._id, 0, setShowErrorApiResponse);
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-user-check" />
                                                        Réactiver
                                                    </button>
                                                )}
                                                {user.state !== 1 && accountInfo.role > user.role && (
                                                    <button
                                                        onClick={(e) => {
                                                            setUserState(token, updateToken, users, setUsers, user._id, 1, setShowErrorApiResponse);
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-lock" />
                                                        Restreindre
                                                    </button>
                                                )}
                                                {user.state !== 2 && accountInfo.role > 1 && accountInfo.role > user.role && (
                                                    <button
                                                        onClick={(e) => {
                                                            setUserState(token, updateToken, users, setUsers, user._id, 2, setShowErrorApiResponse);
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-ban" />
                                                        Suspendre
                                                    </button>
                                                )}
                                            </StyledUserManage>
                                        </>
                                    ) : (
                                        <>
                                            <StyledShowModButton
                                                onClick={() => {
                                                    setShowModToolsId(user._id);
                                                }}
                                            >
                                                <i className="fa-solid fa-circle-chevron-down" />
                                                Options de modération
                                            </StyledShowModButton>
                                        </>
                                    )}
                                </>
                            )}
                        </StyledUserCard>
                    );
                })}
            </StyledUserList>
        </main>
    );
}

//Exports
export default UserList;
