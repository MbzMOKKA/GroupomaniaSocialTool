//Imports
import styled from 'styled-components';

//Exports
export const StyledBluring = styled.div`
    position: relative;
    z-index: 1;
    backdrop-filter: blur(4px);
    width: 100vw;
    height: 100vh;
    position: fixed;
`;
export const StyledBackground = styled.div`
    position: relative;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const StyledChildrenContainer = styled.div`
    width: 80%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 2px white solid;
    border-radius: 12px;
    padding: 20px;
    button {
        font-size: 26px;
        width: 100%;
        margin-top: 20px;
    }
`;
