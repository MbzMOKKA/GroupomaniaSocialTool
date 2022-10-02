//Imports
import styled from 'styled-components';
import colors from '../../utils/style/colors';

//Exports
export const StyledAsideRight = styled.aside`
    align-items: flex-start;
    div {
        width: 80%;
        max-width: 380px;
        margin-top: 24px;
        margin-left: 28px;
    }
`;

export const StyledDisplayName = styled.p`
    word-break: break-all;
    font-size: 22px;
    margin-top: 8px;
    padding-bottom: 12px;
    border-bottom: 1px white solid;
    i {
        font-size: 24px;
        margin-right: 12px;
    }
    @media screen and (max-width: 1366px) {
        font-size: 15px;
        i {
            font-size: 16px;
        }
    }
`;

export const StyledNav = styled.nav`
    background-color: ${colors.backgroundDarker};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    padding: 12px;
    padding-top: 18px;
    padding-bottom: 0px;
    button {
        background-color: ${colors.primary};
        padding-top: 12px;
        padding-bottom: 12px;
        margin-bottom: 18px;
        @media screen and (max-width: 1366px) {
            font-size: 16px;
            i {
                font-size: 16px;
            }
        }
    }
`;
