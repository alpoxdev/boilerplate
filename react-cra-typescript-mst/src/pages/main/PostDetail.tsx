import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { MSTProps } from 'stores';
import { IPost } from 'common/models';

export const MainPostDetail = ({ store }: MSTProps): JSX.Element => {
    const { id }: any = useParams();

    const postStore = store.postStore;
    const { asyncPost } = postStore;
    const post: IPost = asyncPost.data;

    console.log('PostDetail', postStore.toJSON());

    useEffect(() => {
		postStore.onGetPost(id);
		
		return () => asyncPost.onDefault();
    }, [id]);

    if (asyncPost.status === 'pending') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
        </div>
    );
};

export const MainPostDetailPage = inject('store')(observer(MainPostDetail));
