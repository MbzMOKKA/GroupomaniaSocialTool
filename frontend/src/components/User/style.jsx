//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledUserCard = styled.li`
    background-color: ${({ yourself }) => (yourself === true ? `${colors.yourself}` : `${colors.backgroundLighter}`)};
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 10px;
    list-style: none;
`;
export const StyledDisplayName = styled.h2`
    i {
        font-size: 24px;
        margin-right: 6px;
    }
`;
export const StyledUserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding-bottom: 4px;
    border-bottom: 2px white solid;
`;
export const StyledShowModButton = styled.button`
    background-color: ${({ canInterract }) => (canInterract === false ? 'black' : 'ineherit')};
    opacity: ${({ canInterract }) => (canInterract === false ? '0.35' : '1')};
    width: 100%;
    margin-top: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 20px;
    i {
        font-size: 24px;
        margin-right: 10px;
    }
`;
export const StyledUserManage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;
    overflow: hidden;
    button {
        width: 95%;
        margin: 4px;
        i {
            margin-right: 10px;
        }
    }
`;
