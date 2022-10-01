//Imports
import styled from 'styled-components';

//Exports
export const StyledPostHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
`;

export const StyledPostUploaderAndDate = styled.div`
    display: flex;
    flex-direction: column;
    i {
        font-size: 26px;
        margin-right: 10px;
        @media (max-width: 400px) {
            font-size: 16px;
        }
    }
    h2 {
        font-size: 20px;
        @media (max-width: 400px) {
            font-size: 16px;
        }
    }
    p {
        margin-top: 4px;
        font-size: 14px;
        @media (max-width: 400px) {
            font-size: 12px;
        }
    }
`;

export const StyledButtonPostOptions = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    min-width: 32px;
    padding: 0px;
    border-radius: 50%;
    i {
        font-size: 26px;
    }
`;
