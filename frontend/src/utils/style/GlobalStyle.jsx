//Imports
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import colors from './colors';

//Render
const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        font-weight: 400;
        margin: 0;
        padding: 0;
        color: white;
        @media (max-width: 400px) {
            font-size: 16px;
        }
    }
    body {
        background-color: ${colors.tertiary};
    }
    main {
        display: flex;
        flex-direction: column;
        padding-top: 32px;
    }
    button {
        background-color: ${colors.primary};
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 4px;
        padding-bottom: 8px;
        border: none;
        border-radius: 15px;
        font-weight: 900;
        :hover{
            cursor:pointer;
        }
    }
    a {
        color: ${colors.secondary};
    }
    h1 {
        color: ${colors.secondary};
        font-weight: 900;
        font-size: 32px;
        @media (max-width: 400px) {
            font-size: 25px;
        }
    }
    h2 {
        color: ${colors.secondary};
        font-weight: 900;
    }
    .auth-input {
        background-color: rgba(0, 0, 0, 0.15);
        color: ${colors.secondary};
        font-style: italic;
        border: none;
        font-size: 26px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom: 6px rgba(30, 30, 30) solid;
        padding: 2vw;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .padded-app-container {
        padding-left: 3%;
        padding-right: 3%;
    }
    .desktop-aside{
        width: 26vw;
        height: 100vh;
        display: none;
        padding-top: 24px;
        flex-direction: column;
        @media screen and (min-width: 1024px) {
            display: flex;
        }
    }
`;

//Exports
export const StyledButtonSecondary = styled.button``;
export const IconInButton = styled.i`
    font-size: 24px;
    margin-right: 8px;
`;
function GlobalStyle() {
    return <StyledGlobalStyle />;
}
export default GlobalStyle;
