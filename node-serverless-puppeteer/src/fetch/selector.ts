export const NAVER_SELECTORS = {
    NEWS_LIST: '.list_news > li',

    NEWS_ITEM_TITLE: 'div.news_wrap > div > a',
    NEWS_ITEM_URL: 'div.news_wrap > a',
    NEWS_ITEM_SUBTITLE: 'div.news_wrap > div > div.news_dsc > div > a',
    NEWS_ITEM_PRESS_NAME:
        'div.news_wrap > div > div.news_info > div > a.info.press',
    NEWS_ITEM_PRESS_URL:
        'div.news_wrap > div > div.news_info > div > a.info.press',
};

export const DAUM_SELECTORS = {
    NEWS_LIST: '#clusterResultUL > li',

    NEWS_ITEM_TITLE: 'div.wrap_cont > div > div > a',
    NEWS_ITEM_URL: 'div.wrap_cont > div > div > a',
    NEWS_ITEM_SUBTITLE: 'div.wrap_cont > div > p',
    NEWS_ITEM_PRESS_URL:
        'div.news_wrap > div > div.news_info > div > a.info.press',
};
