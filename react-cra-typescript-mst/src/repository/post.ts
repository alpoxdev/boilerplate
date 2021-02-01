import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';
import { number } from 'mobx-state-tree/dist/internal';

export class PostRepository {
    static async onGetPosts({ query }: { query?: Query }): Promise<Response> {
        const url = '/posts';
        return await onRequest({ method: RequestMethod.get, url, query });
    }

    static async onGetPost({ id, query }: { id: number; query?: Query }): Promise<Response> {
        const url = `/posts/${id}`;
        return await onRequest({ method: RequestMethod.get, url, query });
    }

    static async onCreatePost({
        params,
        query,
    }: {
        params: Params;
        query?: Query;
    }): Promise<Response> {
        const url = '/posts';
        return await onRequest({ method: RequestMethod.post, url, params, query });
    }

    static async onDeletePost({
        id,
        params,
        query,
    }: {
        id: number;
        params?: Params;
        query?: Query;
    }): Promise<Response> {
        const url = `/posts/${id}`;
        return await onRequest({ method: RequestMethod.delete, url, params, query });
    }

    static async onUpdatePost({
        id,
        params,
        query,
    }: {
        id: number;
        params: Params;
        query?: Query;
    }): Promise<Response> {
        const url = `/posts/${id}`;
        return await onRequest({ method: RequestMethod.put, url, params, query });
    }
}
