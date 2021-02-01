import { types, Instance } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import postStore, { PostStore } from 'stores/post';

export const RootStore = types.model({
    postStore: types.optional(PostStore, {}),
});

let rootStore;

if (!rootStore) {
    rootStore = RootStore.create({
        postStore,
    });
}

export default rootStore;

export type IRootStore = Instance<typeof rootStore>;

export interface MSTProps {
    store: IRootStore;
}

makeInspectable(rootStore);
