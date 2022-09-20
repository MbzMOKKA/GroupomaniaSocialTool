//Imports
import colors from '../../utils/style/colors';
import styled from 'styled-components';

//Exports
export const StyledPostCard = styled.li`
    background-color: ${colors.backgroundLighter};
    border-radius: 12px;
    margin-bottom: 12px;
    padding: 10px;
    list-style: none;
`;
export const StyledDetailledPostCard = styled.div`
    background-color: ${colors.backgroundDarker};
    margin-top: 18px;
    margin-bottom: 20px;
    padding-top: 38px;
    padding-bottom: 38px;
`;
export const StyledPostHeader = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px white solid;
    padding-bottom: 8px;
`;
export const StyledPostUploaderAndDate = styled.div`
    display: flex;
    flex-direction: column;
    i {
        font-size: 26px;
        margin-right: 10px;
    }
    h2 {
        font-size: 20px;
    }
    p {
        margin-top: 4px;
        font-size: 14px;
    }
`;
export const StyledButtonPostOptions = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    padding: 0px;
    border-radius: 50%;
    i {
        font-size: 26px;
    }
`;
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
    height: 200px;
    object-fit: contain;
`;
export const StyledPostFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px white solid;
    padding-top: 12px;
`;
export const StyledPostReaction = styled.div`
    display: flex;
    button {
        margin-right: 18px;
        background-color: transparent;
    }
`;
export const StyledPostEditCounter = styled.p`
    color: ${colors.secondary};
    font-style: italic;
`;
