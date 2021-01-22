import * as chromium from 'chrome-aws-lambda';
import { Browser, Page } from 'puppeteer-core';

export interface LaunchPuppeteer {
    browser: Browser;
    page: Page;
    content: string;
}

export const onGotoPage = async (
    browser: Browser,
    pageUrl: string
): Promise<Page> => {
    const page = await browser.newPage();
    await page.goto(pageUrl, {
        waitUntil: 'domcontentloaded',
    });
    return page;
};

export const onLaunchPuppeteer = async (
    pageUrl: string
): Promise<LaunchPuppeteer> => {
    const browser = await chromium.puppeteer.launch({
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        args: chromium.args,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    const page = await onGotoPage(browser, pageUrl);
    const content = await page.content();

    return {
        browser,
        page,
        content,
    };
};
