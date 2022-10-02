//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledRestrainedMsg = styled.p`
    background-color: ${colors.backgroundDarker};
    color: ${colors.primary};
    text-align: center;
    padding-top: 6px;
    padding-bottom: 6px;
    i {
        color: ${colors.primary};
        margin-right: 6px;
    }
`;

export const StyledHeader = styled.header`
    background-color: ${colors.primary};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 12px;
    padding-bottom: 6px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    margin-bottom: 15px;
    @media screen and (min-width: 1024px) {
        display: none;
    }
`;

export const StyledButtonOpenNav = styled.button`
    background-color: ${colors.primary};
    margin-left: 20px;
    padding: 0;
    i {
        font-size: 36px;
        @media (max-width: 280px) {
            font-size: 26px;
        }
    }
`;
