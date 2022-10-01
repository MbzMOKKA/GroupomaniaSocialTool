//Imports
import colors from '../../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 2px white solid;
    margin-top: 10px;
`;

export const StyledLabel = styled.label`
    color: ${colors.secondary};
    font-size: 22px;
    margin-top: 18px;
    margin-bottom: 2px;
`;

export const StyledInputInfo = styled.p`
    font-size: 17px;
    font-weight: 300;
    font-style: italic;
    margin-bottom: 10px;
`;

export const StyledInputText = styled.textarea`
    background-color: ${colors.backgroundDarker};
    color: white;
    height: 35vh;
    padding: 6px;
    border: none;
    border-radius: 14px;
    resize: none;
    font-size: 18px;
`;

export const StyledInputImage = styled.input`
    display: none;
`;

export const StyledAddImageArea = styled.label`
    background-color: ${colors.backgroundDarker};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 18px;
    padding-bottom: 18px;
    border-radius: 14px;
    p {
        text-align: center;
    }
    i {
        font-size: 44px;
        margin-bottom: 4px;
    }
    :hover {
        cursor: pointer;
    }
`;

export const StyleImageManageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 92px;
    button {
        margin-left: 12px;
        margin-right: 12px;
        flex-grow: 1;
        max-width: 120px;
        font-size: 16px;
    }
`;

export const StyledImagePreview = styled.img`
    display: ${({ content }) => content === 'no_img' && 'none'};
    border-radius: 15px;
    margin: auto;
    width: 100%;
    max-height: 512px;
    object-fit: contain;
`;
