import styled from '@emotion/styled';

export const Button = styled.button`
    width: ${(props: any) => (props.isAuto ? 'auto' : '100%')};
    padding-top: 14.3px;
    padding-bottom: 10.7px;

    color: ${(props: any) => props.theme.color.text};
    font-size: ${(props: any) => props.theme.fontSize.subtitle};

    border: 0;
    border-radius: 5px;
    outline: 0;
    cursor: pointer;
`;
