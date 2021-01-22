import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// redux
import { wrapperComponent } from 'stores';
import { onGetPost } from 'stores/post';

// container
import PostDetailContainer from 'containers/posts/detail';

function PostDetailPage(props) {
    const router = useRouter();
    const { query } = router;
    const id = query?.id;

    useEffect(() => {
        props.dispatch(onGetPost({ id }));
    }, [id]);

    return (
        <>
            <PostDetailContainer {...props} />
        </>
    );
}

export default wrapperComponent(PostDetailPage, onGetPost);
