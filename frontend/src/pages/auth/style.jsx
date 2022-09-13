//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        width: 85%;
    }
    .input-container {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .error-msg {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;
export const StyledButtonLogIn = styled.button`
    width: 95%;
    margin-top: 30px;
    padding-top: 12px;
    padding-bottom: 12px;
`;
export const StyledNoAccountMsg = styled.div`
    background-color: ${colors.backgroundDarker};
    width: 100%;
    margin-top 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    i{
        margin-right: 8px;
        font-size: 24px;
    }
    p {
        margin-left: 7.5%;
        margin-right: 7.5%;
        font-size: 22px;
        color: white;
    }
    a {
        font-size: 22px;
    }
`;
