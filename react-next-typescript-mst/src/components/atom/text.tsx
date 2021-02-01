import styled from '@emotion/styled';

export const Text = styled.p`
    color: ${(props: any) => props.theme.color.text};
    font-size: ${(props: any) => props.theme.fontSize.normal};
`;
