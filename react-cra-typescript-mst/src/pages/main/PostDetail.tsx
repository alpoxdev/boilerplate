import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { MSTProps } from 'stores';
import { IPost } from 'common/models';

export const MainPostDetailPage = inject('store')(
    observer(
        ({ store }: MSTProps): JSX.Element => {
            const { id }: any = useParams();

            const postStore = store.postStore;
            const { asyncPost } = postStore;

            useEffect(() => {
                postStore.onGetPost(id);
            }, [id]);

            if (asyncPost.status === 'pending') {
                return <div>Loading...</div>;
            }

            return (
                <div>
                    <p>{JSON.stringify(asyncPost.data)}</p>
                </div>
            );
        },
    ),
);
