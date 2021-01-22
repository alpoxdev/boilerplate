import React from 'react';
import styled, { keyframes } from 'styled-components';

export function UILoading({ view = false }) {
    if (!view) return null;

    return (
        <LoadingView>
            <Spinner />
        </LoadingView>
    );
}

const LoadingView = styled.div`
    width: 100%;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.25);
`;

const SpinnerAnimation = keyframes`
0% {
-webkit-transform: rotate(0deg);
transform: rotate(0deg);
}
100% {
-webkit-transform: rotate(360deg);
transform: rotate(360deg);
}
`;

const Spinner = styled.div`
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: ${SpinnerAnimation} 1.1s infinite linear;
    animation: load8 1.1s infinite linear;

    border-radius: 50%;
    width: 10em;
    height: 10em;

    &:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }
`;
