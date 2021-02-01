import { Theme } from '@emotion/react';

export const theme: Theme = {
    color: {
        primary: '#FF4A43',
        text: '#000000',
        textBoldInfo: '#8D8D8D',
        textInfo: '#C6C6C8',
        buttonBackground: '#EDEDED',
        buttonBoldBackground: '#C8C8C8',
    },
    fontSize: {
        title: 24,
        subtitle: 16,
        normal: 14,
        info: 12,
    },
};

export type ITheme = typeof theme;
