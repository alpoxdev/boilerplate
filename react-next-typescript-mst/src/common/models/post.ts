import { Instance, types } from 'mobx-state-tree';
import { createAsyncModel, createAsyncModels, EmptyModel } from 'common/mst';

export const Post = types.model('Post', {
    id: types.maybe(types.number),
    userId: types.maybe(types.number),
    title: types.maybe(types.string),
    body: types.maybe(types.string),
});

export const AsyncPost = createAsyncModel('Post', Post);
export const AsyncPosts = createAsyncModels('Posts', Post);
export const createPost = createAsyncModel('create', EmptyModel);
export const deletePost = createAsyncModel('delete', EmptyModel);
export const updatePost = createAsyncModel('update', EmptyModel);

export type IPost = Instance<typeof Post>;
