//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledTitle = styled.h1`
    margin-top: 24px;
    margin-bottom: 24px;
    i {
        color: ${colors.primary};
        font-size: 36px;
        margin-right: 12px;
    }
`;

export const StyledExplaination = styled.p`
    margin-bottom: 4px;
    color: ${colors.primary};
    font-size: 24px;
`;
