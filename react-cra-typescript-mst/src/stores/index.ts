import { types, Instance } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import userStore, { UserStore } from 'stores/user';
import postStore, { PostStore } from 'stores/post';

export const RootStore = types.model({
    userStore: types.optional(UserStore, {}),
    postStore: types.optional(PostStore, {}),
});

let rootStore;

if (!rootStore) {
    rootStore = RootStore.create({
        userStore,
        postStore,
    });
}

export default rootStore;

export type IRootStore = Instance<typeof rootStore>;

export interface MSTProps {
    store: IRootStore;
}

makeInspectable(rootStore);
