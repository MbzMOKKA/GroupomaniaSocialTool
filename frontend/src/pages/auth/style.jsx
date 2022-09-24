//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        width: 95%;
        max-width: 700px;
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
export const StyledSubmitButton = styled.button`
    width: 100%;
    max-width: 700px;
    margin-top: 30px;
    padding-top: 12px;
    padding-bottom: 12px;
`;
export const StyledInfo = styled.div`
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
        @media screen and (min-width: 1024px) {
            margin-left: 15%;
            margin-right: 15%;
        }
    }
    a {
        font-size: 22px;
    }
`;
