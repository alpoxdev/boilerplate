import { useMemo } from 'react';
import { types, Instance, onSnapshot } from 'mobx-state-tree';
import { useStaticRendering } from 'mobx-react';
import makeInspectable from 'mobx-devtools-mst';

// stores
import { PostStore } from 'stores/post';

const isServer = typeof window === 'undefined';
let store: IStore | null = null;

useStaticRendering(isServer);

export const Store = types.model({
    postStore: types.optional(PostStore, {}),
});

export type IStore = Instance<typeof Store>;
export interface MSTProps {
    store: IStore;
    serverStore?: IStore;
}

export const initializeStore = (initialState?: any): IStore => {
    if (isServer) {
        return Store.create(initialState);
    } else if (store !== null) {
        return store;
    } else {
        return (store = Store.create(initialState));
    }
};

export const useStore = (initialState?: any) => {
    const store = useMemo(() => initializeStore(initialState), [initialState]);

    makeInspectable(store);
    return store;
};
