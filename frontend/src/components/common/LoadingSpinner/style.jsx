//Imports
import colors from '../../../utils/style/colors';
import styled from 'styled-components';
import { animLoadingSpinner } from '../../../utils/style/animations';

//Exports
export const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 72px;
    margin-bottom: 24px;
`;

export const StyledSpinner = styled.i`
    font-size: 48px;
    color: ${colors.positive};
    animation: ${animLoadingSpinner} 1600ms linear infinite;
    margin-bottom: 16px;
`;

export const StyledText = styled.p`
    font-size: 24px;
    color: ${colors.positive};
`;
