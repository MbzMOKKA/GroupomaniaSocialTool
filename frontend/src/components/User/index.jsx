//Imports
import { useContext, useState } from 'react';
import { SessionContext } from '../../utils/context/index';
import { setUserRole, setUserState } from '../../utils/api_communication/index';
import { StyledUserCard, StyledDisplayName, StyledUserInfo, StyledButtonsContainer, StyledShowModButton, StyledUserManage } from './style';
import ErrorMsg from '../../components/common/ErrorMsg/index';
import { userRoleString, userStateString } from '../../utils/misc/index';

//Component
function User({ user, users, setUsers }) {
    const { token, accountInfo } = useContext(SessionContext);
    const [showErrorApiResponse, setShowErrorApiResponse] = useState(null);
    const [showModTools, setShowModTools] = useState(false);

    //Render
    return (
        <StyledUserCard yourself={accountInfo.userId === user._id}>
            <StyledDisplayName>
                <i className="fa-solid fa-circle-user" />
                {user.email}
                {accountInfo.userId === user._id ? <> (Vous)</> : null}
            </StyledDisplayName>
            <StyledUserInfo>
                <p className="user-role">Rôle : {userRoleString(user.role)}</p>
                <p className="user-state">État : {userStateString(user.state)}</p>
            </StyledUserInfo>
            {accountInfo.userId !== user._id && accountInfo.state === 0 && accountInfo.role > user.role && (
                <StyledButtonsContainer>
                    {showModTools === true ? (
                        <>
                            <StyledShowModButton
                                onClick={() => {
                                    setShowModTools(false);
                                }}
                            >
                                <i className="fa-solid fa-circle-chevron-up" />
                                Fermer les options
                            </StyledShowModButton>
                            <StyledUserManage>
                                {user.role === 0 && accountInfo.role > 1 && (
                                    <button
                                        onClick={(e) => {
                                            setUserRole(token, users, setUsers, user._id, 1, setShowErrorApiResponse);
                                        }}
                                    >
                                        <i className="fa-solid fa-angles-up" />
                                        Promouvoir (modérateur)
                                    </button>
                                )}
                                {user.role === 1 && accountInfo.role > 1 && (
                                    <button
                                        onClick={(e) => {
                                            setUserRole(token, users, setUsers, user._id, 0, setShowErrorApiResponse);
                                        }}
                                    >
                                        <i className="fa-solid fa-angles-down" />
                                        Rétrograder (staff)
                                    </button>
                                )}
                                {user.state !== 0 && accountInfo.role > user.role && (
                                    <button
                                        onClick={(e) => {
                                            setUserState(token, users, setUsers, user._id, 0, setShowErrorApiResponse);
                                        }}
                                    >
                                        <i className="fa-solid fa-user-check" />
                                        Réactiver
                                    </button>
                                )}
                                {user.state !== 1 && accountInfo.role > user.role && (
                                    <button
                                        onClick={(e) => {
                                            setUserState(token, users, setUsers, user._id, 1, setShowErrorApiResponse);
                                        }}
                                    >
                                        <i className="fa-solid fa-lock" />
                                        Restreindre
                                    </button>
                                )}
                                {user.state !== 2 && accountInfo.role > 1 && accountInfo.role > user.role && (
                                    <button
                                        onClick={(e) => {
                                            setUserState(token, users, setUsers, user._id, 2, setShowErrorApiResponse);
                                        }}
                                    >
                                        <i className="fa-solid fa-ban" />
                                        Suspendre
                                    </button>
                                )}
                            </StyledUserManage>
                            <div>{showErrorApiResponse !== null ? <ErrorMsg>· {showErrorApiResponse} !</ErrorMsg> : null}</div>
                        </>
                    ) : (
                        <>
                            <StyledShowModButton
                                onClick={() => {
                                    setShowModTools(true);
                                    setShowErrorApiResponse(null);
                                }}
                            >
                                <i className="fa-solid fa-circle-chevron-down" />
                                Options de modération
                            </StyledShowModButton>
                        </>
                    )}
                </StyledButtonsContainer>
            )}
        </StyledUserCard>
    );
}

//Exports
export default User;
