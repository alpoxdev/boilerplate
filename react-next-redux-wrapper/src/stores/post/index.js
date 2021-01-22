import { handleActions } from 'redux-actions';
import { postState } from 'stores/post/state';
import { POST_TYPE } from 'stores/post/type';

import { createFetchState, createPromiseThunk, setImmutableState } from 'lib';
import * as postAPI from 'service/post';

export const onGetPosts = createPromiseThunk(POST_TYPE.GET_POSTS, postAPI.onGetPosts);
export const onGetPost = createPromiseThunk(POST_TYPE.GET_POST, postAPI.onGetPost);

export default handleActions(
    {
        [POST_TYPE.GET_POSTS]: (state, _) =>
            setImmutableState(state, 'posts', createFetchState.pending()),
        [POST_TYPE.GET_POSTS_DONE]: (state, action) =>
            setImmutableState(state, 'posts', createFetchState.done(action.payload?.posts)),
        [POST_TYPE.GET_POSTS_ERROR]: (state, action) =>
            setImmutableState(state, 'posts', createFetchState.error(action.payload)),
        [POST_TYPE.GET_POST]: (state, action) =>
            setImmutableState(state, 'post', createFetchState.pending()),
        [POST_TYPE.GET_POST_DONE]: (state, action) =>
            setImmutableState(state, 'post', createFetchState.done(action.payload?.post)),
        [POST_TYPE.GET_POST_ERROR]: (state, action) =>
            setImmutableState(state, 'post', createFetchState.error(action.payload)),
    },
    postState,
);
