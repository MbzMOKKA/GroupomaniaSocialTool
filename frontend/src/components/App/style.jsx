//Imports
import styled from 'styled-components';
import colors from '../../utils/style/colors';

//Exports
export const StyledAppContainer = styled.div`
    width: 100%;
    display: flex;
`;
export const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    @media screen and (min-width: 1024px) {
        border-left: 1px ${colors.asideBorder} solid;
        border-right: 1px ${colors.asideBorder} solid;
    }
`;
