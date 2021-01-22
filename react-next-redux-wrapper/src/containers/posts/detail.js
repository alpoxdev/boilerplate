import React from 'react';
import styled from 'styled-components';

// template
import { UILoading } from 'templates';

export default function PostDetailContainer({ state, dispatch }) {
    const { post } = state;
    const { data, pending } = post?.toJS()?.post;

    return (
        <>
            <UILoading view={pending} />
            <p>{JSON.stringify(data, null, 2)}</p>
        </>
    );
}
