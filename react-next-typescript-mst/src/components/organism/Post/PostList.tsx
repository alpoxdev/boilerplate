import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { Text } from 'components';
import { IPost } from 'common/models';

interface IPostList {
    posts: IPost[];
}

interface IPostItem {
    post: IPost;
}

export const PostList = ({ posts }: IPostList) => {
    const postList = posts.map((post: IPost) => <PostItem key={post.id} post={post} />);

    return <PostListView>{postList}</PostListView>;
};

const PostItem = ({ post }: IPostItem) => {
    return (
        <PostItemView>
            <Text
                className={css`
                    font-weight: bold;
                    margin-bottom: 6px;
                `}
            >
                {post.title}
            </Text>
            <Text>{post.body}</Text>
        </PostItemView>
    );
};

const PostListView = styled.div``;

const PostItemView = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid ${(props: any) => props.theme.color.primary};
`;
