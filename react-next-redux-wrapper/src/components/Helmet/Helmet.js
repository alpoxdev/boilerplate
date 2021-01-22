import React from 'react';
import { NextSeo, DefaultSeo } from 'next-seo';
import { defaultHelmet } from 'config';

export function DefaultHelmet() {
    const { title, description, image, keywords, url } = defaultHelmet;
    return (
        <DefaultSeo
            title={title}
            description={description}
            keywords={keywords}
            canonical={url}
            openGraph={{
                url,
                title,
                description,
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 627,
                        alt: 'next.js',
                    },
                ],
                site_name: title,
            }}
            twitter={{
                cardType: 'summary_large_image',
                site: '@next.js',
                handle: '@next.js',
            }}
        />
    );
}

export const getHelmet = (helmet) => ({
    title: helmet.title ? helmet.title : defaultHelmet.title,
    description: helmet.description ? helmet.description : defaultHelmet.description,
    image: helmet.image ? helmet.image : defaultHelmet.image,
    keywords: helmet.keywords ? helmet.keywords : defaultHelmet.keywords,
    url: helmet.url ? helmet.url : defaultHelmet.url,
});

export function Helmet({ helmet = defaultHelmet, index = true, follow = true }) {
    const { title, description, image, keywords, url } = helmet;

    return (
        <NextSeo
            nofollow={!follow}
            noindex={!index}
            title={title}
            description={description}
            keywords={keywords}
            canonical={url}
            openGraph={{
                url,
                title,
                description,
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 627,
                        alt: 'apick.kr',
                    },
                ],
                site_name: title,
            }}
            twitter={{
                cardType: 'summary_large_image',
                site: '@apick',
                handle: '@apick',
            }}
        />
    );
}
