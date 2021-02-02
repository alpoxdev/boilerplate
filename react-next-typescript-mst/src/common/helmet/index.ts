export type HelmetProps = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
};

export const defaultHelmet: HelmetProps = {
    title: 'Next.js MST Boilerplate',
    description: 'react, next.js, mst, and seo optimization',
    image: '',
    url: '',
};
