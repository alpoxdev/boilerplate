import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';

export class PostRepository {
    static async onGetPosts(query?: Query): Promise<Response> {
        const url = '/posts';
        return await onRequest({ method: RequestMethod.get, url, query });
    }

    static async onGetPost(id: number, query?: Query): Promise<Response> {
        const url = `/posts/${id}`;
        return await onRequest({ method: RequestMethod.get, url, query });
    }

    static async onCreatePost(params: Params, query?: Query): Promise<Response> {
        const url = '/posts';
        return await onRequest({ method: RequestMethod.post, url, params, query });
    }
}
