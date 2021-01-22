import * as cheerio from 'cheerio';

export const onLoadContent = (content: string) => {
    return cheerio.load(content);
};

export const onGetLists = ({ $, content, selector }: any) => {
    if (!$) $ = onLoadContent(content);
    const lists = $(selector);

    return {
        $,
        lists,
    };
};

export const onGetObjectAttributes = ({ $, content, select, attributes }) => {
    if (!$) $ = onLoadContent(content);
    return {
        $,
    };
};
