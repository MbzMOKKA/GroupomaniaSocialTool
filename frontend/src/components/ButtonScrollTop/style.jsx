//Imports
import styled from 'styled-components';
import colors from '../../utils/style/colors';

//Exports
export const StyledButton = styled.button`
    background-color: ${colors.primary};
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    padding: 0px;
    border-radius: 50%;
    i {
        font-size: 34px;
    }
`;
