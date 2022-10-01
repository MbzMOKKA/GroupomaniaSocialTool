//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledPostCard = styled.div`
    ${({ isDetailled }) =>
        isDetailled === true
            ? `
    background-color: ${colors.backgroundDarker};
    margin-top: 18px;
    margin-bottom: 20px;
    padding-top: 38px;
    padding-bottom: 38px;
    `
            : `
    background-color: ${colors.backgroundLighter};
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 10px;
    padding-bottom: 0px;
    `};
`;

export const StyledPostOptionsContainer = styled.div`
    border-top: 1px white solid;
    padding-top: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    button {
        flex-grow: 1;
        margin: 8px;
    }
`;
