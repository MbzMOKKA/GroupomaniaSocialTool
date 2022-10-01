//Imports
import styled from 'styled-components';

//Exports
export const StyleButtonUpload = styled.button`
    width: 100%;
    margin-top: 28px;
    font-size: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    @media (max-width: 400px) {
        font-size: 18px;
        padding-top: 8px;
        padding-bottom: 8px;
    }
`;

export const StyledPostList = styled.ul`
    margin-top: 34px;
`;

export const StyledPostElement = styled.li`
    list-style: none;
`;

export const StyledLoadMoreButton = styled.button`
    margin-top: 12px;
    margin-bottom: 92px;
`;

export const StyledNoPostMsg = styled.p`
    margin-top: 24px;
    i {
        margin-right: 8px;
    }
`;
