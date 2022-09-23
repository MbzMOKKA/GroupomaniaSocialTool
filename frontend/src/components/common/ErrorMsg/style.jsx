//Imports
import colors from '../../../utils/style/colors';
import styled from 'styled-components';
import { animErrorMsgAppear } from '../../../utils/style/animations';

//Exports
export const StyledContainer = styled.p`
    animation: ${animErrorMsgAppear} 200ms 3 ease-in;
    strong {
        color: ${colors.negative};
        font-size: 16px;
        font-weight: 300;
    }
`;
