import { Instance, types } from 'mobx-state-tree';
import { onAsyncModel, onAsyncModels } from 'common/models';

export const Post = types.model('Post', {
    id: types.maybe(types.number),
    userId: types.maybe(types.number),
    title: types.maybe(types.string),
    body: types.maybe(types.string),
});

export const AsyncPost = onAsyncModel('Post', Post);
export const AsyncPosts = onAsyncModels('Posts', Post);

export type IPost = Instance<typeof Post>;
