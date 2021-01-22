import React, { useEffect } from 'react';

// redux
import { wrapperComponent } from 'stores';
import { onGetPosts } from 'stores/post';

// container
import PostListContainer from 'containers/posts/list';

function PostListPage(props) {
    useEffect(() => {
        props.dispatch(onGetPosts());
    }, []);

    return (
        <>
            <PostListContainer {...props} />
        </>
    );
}

export default wrapperComponent(PostListPage, onGetPosts);
