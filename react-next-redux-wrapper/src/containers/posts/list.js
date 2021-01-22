import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// template
import { UILoading } from 'templates';

export default function PostListContainer({ state, dispatch }) {
    const { root, post } = state;
    const { posts } = post?.toJS();
    const { data, pending } = posts;

    const postList = data?.map((post) => (
        <Link href="/posts/[id]" as={`/posts/${post?.id}`} key={post?.id}>
            <PostItem>
                <p>{post?.title}</p>
                <p>{post?.body}</p>
            </PostItem>
        </Link>
    ));

    return (
        <>
            <PostList>
                <Page>{root}</Page>
                {postList}
            </PostList>

            <UILoading view={pending} />
        </>
    );
}

const Page = styled.h1`
    font-size: 22px;
    font-weight: bold;
`;

const PostList = styled.div`
    width: 700px;
    margin: 0 auto;
`;

const PostItem = styled.div`
    padding: 10px 16px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    p + p {
        margin-top: 10px;
    }

    &:last-child {
        border-bottom: 0;
    }
`;
