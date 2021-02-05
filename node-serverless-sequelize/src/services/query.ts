type QueryStringParameters = {
    [name: string]: string;
} | null;

export const parsePageQuery = (query: QueryStringParameters) => {
    const limit = query?.limit || '20';
    const offset = query?.offset || '0';

    return {
        limit: parseInt(limit),
        offset: parseInt(offset),
    };
};
