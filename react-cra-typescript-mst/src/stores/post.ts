import { types, flow, Instance } from 'mobx-state-tree';
import { Post, AsyncPost, AsyncPosts } from 'common/models';
import { Response } from 'common/axios';
import { PostRepository } from 'repository';

export const PostStore = types
    .model('PostStore', {
        posts: types.optional(types.maybe(types.array(Post)), []),
        post: types.optional(types.maybe(types.maybeNull(Post)), null),
        asyncPost: AsyncPost,
        asyncPosts: AsyncPosts,
    })
    .actions((self) => ({
        onGetPosts: flow(function* getPosts() {
            self.asyncPosts.onPending();

            const response: Response = yield PostRepository.onGetPosts();
            if (response.status === 200) {
                self.asyncPosts.onReady(response.data);
            } else {
                self.asyncPosts.onError(response);
            }
        }),
        onGetPost: flow(function* getPost(id: number) {
            self.asyncPost.onPending();

            const response: Response = yield PostRepository.onGetPost(id);
            if (response.status === 200) {
                self.asyncPost.onReady(response.data);
            } else {
                self.asyncPost.onError(response);
            }
        }),
    }));

const postStore = PostStore.create({});

export type IPostStore = Instance<typeof postStore>;

export default postStore;
