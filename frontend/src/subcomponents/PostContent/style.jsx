//Imports
import styled from 'styled-components';

//Exports
export const StyledPostContent = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    flex-direction: column;
`;

export const StyledPostText = styled.p`
    margin-bottom: 12px;
    word-break: break-all;
`;

export const StyledPostImage = styled.img`
    width: 100%;
    max-height: 512px;
    object-fit: contain;
`;
