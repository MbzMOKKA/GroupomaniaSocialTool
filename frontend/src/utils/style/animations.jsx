/*loading-animation-propreties: anim-loading-loader 0ms ease $loading-duration forwards;*/
import { keyframes } from 'styled-components';

export const animBubbleFadeIn = keyframes`
    0% {
        transform: translateY(100px);
        opacity: 0;
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;

export const animLoadingSpinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const animErrorMsgAppear = keyframes`
    0% {
        transform: translateX(0px);
    }
    25% {
        transform: translateX(5px);
    }
    75% {
        transform: translateX(-5px);
    }
    100% {
        transform: translateX(0px);
    }
`;

export const animUserModOptionsFadeIn = keyframes`
    0% {
        transform: translateY(-250px);
        opacity: 0;
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;
