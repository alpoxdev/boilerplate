import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';
import { defaultHelmet, HelmetProps } from 'common/helmet';

interface IHelmet {
    helmet: HelmetProps;
    index?: boolean;
    follow?: boolean;
}

export const DefaultHelmet = (): JSX.Element => {
    const { title, description, image, url }: HelmetProps = defaultHelmet;
    return (
        <DefaultSeo
            nofollow={false}
            noindex={false}
            title={title}
            description={description}
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
                        alt: 'thumbnail',
                    },
                ],
                site_name: title,
            }}
            twitter={{
                cardType: 'summary_large_image',
                site: '@boilerplate',
                handle: '@boilerplate',
            }}
        />
    );
};

export const getHelmet = (helmet: HelmetProps): HelmetProps => ({
    title: helmet.title ?? defaultHelmet.title,
    description: helmet.description ?? defaultHelmet.description,
    image: helmet.image ?? defaultHelmet.image,
    url: helmet.url ?? defaultHelmet.url,
});

export function Helmet({
    helmet = defaultHelmet,
    index = true,
    follow = true,
}: IHelmet): JSX.Element {
    const { title, description, image, url } = helmet;

    return (
        <NextSeo
            nofollow={!follow}
            noindex={!index}
            title={title}
            description={description}
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
                        alt: 'thumbnail',
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
