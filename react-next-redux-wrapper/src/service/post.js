import { Request } from 'lib';

export const onGetPosts = async () => {
    const url = '/posts';

    const response = await Request.onRequestGet({ url });
    return response;
};

export const onGetPost = async ({ id }) => {
    const url = `/posts/${id}`;

    const response = await Request.onRequestGet({ url });
    return response;
};
