import React from 'react';
import styled from '@emotion/styled';

export const Layout: React.FC = ({ children }) => {
    return (
        <LayoutWrapper>
            <LayoutHeader></LayoutHeader>
            <LayoutContent>{children}</LayoutContent>
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props: any) => props.theme.color.buttonBackground};
`;

const LayoutHeader = styled.div``;

const LayoutContent = styled.div`
    max-width: 420px;
    min-width: 375px;
    min-height: 100vh;
    padding: 0 22px;

    margin: 0 auto;
    background-color: #fff;
`;
