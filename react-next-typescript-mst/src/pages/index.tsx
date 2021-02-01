import { useCallback } from 'react';

import { inject, observer } from 'mobx-react';
import { MSTProps } from 'stores';

import { Text, Button, PostList } from 'components';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
    const { postStore }: any = store;
    const { asyncPosts } = postStore;

    console.log('IndexPage', asyncPosts.toJSON());

    const onGetPosts = useCallback(() => {
        postStore.onGetPosts({});
    }, [asyncPosts]);

    return (
        <>
            <Text>글 불러오기</Text>
            <Button onClick={onGetPosts}>+</Button>
            <PostList posts={asyncPosts.data} />
        </>
    );
};

export default inject('store')(observer(IndexPage));
