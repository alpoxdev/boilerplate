import { Map } from 'immutable';
import { initialFetchState } from 'lib';

export const postState = Map({
    posts: initialFetchState.list,
    post: initialFetchState.object,
});
