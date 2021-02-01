import { useEffect } from 'react';

import { inject, observer } from 'mobx-react';
import { MSTProps } from 'stores';

import { Text, Button, PostList } from 'components';

const IndexPage = ({ store }: MSTProps): JSX.Element => {
    const { postStore } = store;
    const { asyncPosts } = postStore;
    console.log(postStore.toJSON());

    useEffect(() => {
        postStore.onGetPosts({});
    }, []);

    return (
        <>
            <PostList posts={asyncPosts.data} />
        </>
    );
};

export default inject('store')(observer(IndexPage));
