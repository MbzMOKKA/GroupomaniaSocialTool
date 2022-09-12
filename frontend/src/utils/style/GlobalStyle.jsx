//Imports
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
    }
    body {
        background-color: ${colors.tertiary};
    }
    button{
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
    }
    a {
        color: ${colors.primary};
    }
    .auth-input{
        background-color: rgba(0, 0, 0, 0.15);
        color: ${colors.secondary};
        font-style: italic;
        border: none;
        font-size: 26px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom : 6px rgba(30, 30, 30) solid;
        padding: 2vw;
        padding-top: 10px;
        padding-bottom: 10px;
    }
`;

//Exports
function GlobalStyle() {
    return <StyledGlobalStyle />;
}
export default GlobalStyle;
