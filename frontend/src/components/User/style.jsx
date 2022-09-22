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
    padding-bottom: 8px;
`;
export const StyledButtonsContainer = styled.div`
    border-top: 1px white solid;
`;
export const StyledShowModButton = styled.button`
    width: 100%;
    margin-top: 12px;
    padding-top: 8px;
    padding-bottom: 8px;
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
