import { useMemo } from 'react';
import { types, Instance, onSnapshot } from 'mobx-state-tree';
import { useStaticRendering } from 'mobx-react';
import makeInspectable from 'mobx-devtools-mst';

// stores
import postStore, { PostStore } from 'stores/post';

const isServer = typeof window === 'undefined';
let store: IStore | null = null;

useStaticRendering(isServer);

export const Store = types.model({
    postStore: types.optional(PostStore, {}),
});

export type IStore = Instance<typeof Store>;
export interface MSTProps {
    store: IStore;
}

export const initializeStore = (state?: any): IStore => {
    if (isServer) {
        return Store.create(state);
    } else if (store !== null) {
        return store;
    } else {
        return (store = Store.create(state));
    }
};

export const useStore = (state?: any) => {
    const store = useMemo(() => initializeStore(state), [state]);
    makeInspectable(store);
    return store;
};
