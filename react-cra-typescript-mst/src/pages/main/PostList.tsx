import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { inject, observer } from 'mobx-react';

import { MSTProps } from 'stores';
import { IPost } from 'common/models';

const MainPostList = ({ store }: MSTProps): JSX.Element => {
    const postStore = store.postStore;
    const { asyncPosts } = postStore;

    console.log(store?.toJSON());
    console.log('getSnapshot', asyncPosts.getSnapshot);

    if (asyncPosts.status === 'pending') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={postStore.onGetPosts}>+</button>

            <PostListComponent posts={asyncPosts.data} />
        </div>
    );
};

const PostListComponent = ({ posts }: { posts: IPost[] }): JSX.Element => {
    const postList = posts.map((post: IPost) => (
        <Link to={`/${post.id}`} key={post.id}>
            <PostItem>
                <Title>{post.title}</Title>
                <Body>{post.body}</Body>
            </PostItem>
        </Link>
    ));
    return <PostList>{postList}</PostList>;
};

export const MainPostListPage = inject('store')(observer(MainPostList));

const PostList = styled.div({
    display: 'flex',
    flexDirection: 'column',
});

const PostItem = styled.div({
    padding: '10px 12px',
    borderBottom: '1px solid #808080',
});

const Title = styled.h1({
    marginBottom: '5px',
});

const Body = styled.p({});
