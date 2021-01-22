type QueryStringParameters = {
    [name: string]: string;
} | null;

export const parsePageQuery = (query: QueryStringParameters) => {
    const limit = query?.limit || '20';
    const offset = query?.offset || '0';
    const take = limit;
    const skip = offset;

    return {
        limit: parseInt(limit),
        offset: parseInt(offset),
        take: parseInt(take),
        skip: parseInt(skip),
    };
};
