//Imports
import colors from '../../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledMainActionsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 18px;
    margin-bottom: 8px;
    button {
        margin-left: 4px;
        margin-right: 4px;
        flex-grow: 1;
        font-size: 24px;
    }
`;

export const StyledCancelButton = styled.button`
    background-color: ${colors.negative};
`;

export const StyledConfirmButton = styled.button`
    background-color: ${colors.positive};
`;
