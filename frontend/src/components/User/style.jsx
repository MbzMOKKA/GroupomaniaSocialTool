//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';
import { animUserModOptionsFadeIn } from '../../utils/style/animations';

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
        @media (max-width: 400px) {
            font-size: 18px;
        }
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
    @media (max-width: 400px) {
        font-size: 15px;
    }
`;
export const StyledUserManage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;
    overflow: hidden;
    button {
        animation: ${animUserModOptionsFadeIn} 300ms ease-out;
        width: 95%;
        margin: 6px;
        i {
            margin-right: 10px;
        }
        @media (max-width: 400px) {
            font-size: 13px;
        }
    }
`;
