import { useCallback } from 'react';

import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore, MSTProps } from 'stores';

import { Text, Button, PostList } from 'components';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
    const { postStore }: any = store;
    const { asyncPosts } = postStore;

    // console.log('postStore', postStore.toJSON().asyncPosts);

    const onGetPosts = useCallback(() => {
        postStore.onGetPosts({});
    }, [asyncPosts]);

    const onGetMorePosts = useCallback(() => {
        postStore.onGetMorePosts({});
    }, []);

    return (
        <>
            <Text>글 불러오기</Text>
            <Button onClick={onGetPosts}>+</Button>
            <Button onClick={onGetMorePosts}>More+</Button>
            <PostList posts={asyncPosts.data} />
        </>
    );
};

export async function getServerSideProps(context) {
    const store = initializeStore();
    await store.postStore.onGetPosts({});

    return { props: { initialState: getSnapshot(store) } };
}

export default inject('store')(observer(IndexPage));
