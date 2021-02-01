import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { inject, observer } from 'mobx-react';

import { MSTProps } from 'stores';
import { IPost } from 'common/models';
import { create } from 'domain';

const MainPostList = ({ store }: MSTProps): JSX.Element => {
    const postStore = store.postStore;
    const { asyncPosts, createPost } = postStore;

    console.log(postStore?.toJSON());

    const onCreatePost = useCallback(() => {
        const params = {
            title: 'test',
            body: 'test',
            userId: 1,
        };
        postStore.onCreatePost({ params });
    }, [createPost]);

    useEffect(() => {
        postStore.onGetPosts({});

        return () => asyncPosts.onDefault();
    }, []);

    if (asyncPosts.isPending || createPost.isPending) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PostCreateButton onClick={onCreatePost}>글 생성</PostCreateButton>
            <PostListComponent posts={asyncPosts.data} />
        </>
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

const PostCreateButton = styled.button({
    width: '100px',
    height: '45px',
    outline: 0,
    border: 0,
    borderRadius: 12,
    cursor: 'pointer',
    marginBottom: 20,
});

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
