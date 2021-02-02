import { types, Instance } from 'mobx-state-tree';
import { PostRepository } from 'repository';

import {
    AsyncPost as asyncPost,
    AsyncPosts as asyncPosts,
    createPost,
    deletePost,
    updatePost,
} from 'common/models';

export const PostStore = types
    .model('PostStore', {
        asyncPost,
        asyncPosts,
        createPost,
        deletePost,
        updatePost,
    })
    .actions((self) => ({
        onGetPosts: (props) => self.asyncPosts.onGetAll(() => PostRepository.onGetPosts(props)),
        onGetMorePosts: (props) =>
            self.asyncPosts.onGetAll(() => PostRepository.onGetPosts(props), null, true),
        onGetPost: (props) => self.asyncPost.onGetOne(() => PostRepository.onGetPost(props)),
        onCreatePost: (props) => self.createPost.onCreate(() => PostRepository.onCreatePost(props)),
        onDeletePost: (props) => self.deletePost.onDelete(() => PostRepository.onDeletePost(props)),
        onUpdatePost: (props) => self.updatePost.onCreate(() => PostRepository.onUpdatePost(props)),
    }));

const postStore = PostStore.create({});

export type IPostStore = Instance<typeof postStore>;

export default postStore;
