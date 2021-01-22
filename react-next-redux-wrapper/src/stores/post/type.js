import { initialFetchType } from 'lib/redux';

export const POST_TYPE = {
    ...initialFetchType('GET_POSTS', 'post/GET_POSTS'),
    ...initialFetchType('GET_POST', 'post/GET_POST'),
};
