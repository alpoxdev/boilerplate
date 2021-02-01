import axios from 'axios';
import queryString from 'query-string';

const ENDPOINT = 'https://jsonplaceholder.typicode.com';
const instance = axios.create({});

export type Header = { [type: string]: string };
export type Query = { [type: string]: any };
export type Params = { [type: string]: any };
export type ResponseData = { [type: string]: any } | any;

export enum RequestMethod {
    get = 'GET',
    post = 'POST',
    delete = 'DELETE',
    patch = 'PATCH',
    put = 'PUT',
}

export type RequestProps = {
    method?: RequestMethod;
    url: string;
    headers?: Header;
    query?: Query;
    params?: Params;
};

export type Response = {
    status: number;
    data: ResponseData | null;
};
export type Error = Response;

export const onParseQuery = (query?: Query): string => {
    if (!query) return '';

    return queryString.stringify(query);
};

export const onRequest = async (props: RequestProps): Promise<Response> => {
    const { method } = props;
    props = { ...props, url: ENDPOINT + props.url };

    console.log('onRequest', props);

    try {
        switch (method) {
            case RequestMethod.get:
                return await onRequestGet(props);
            case RequestMethod.post:
                return await onRequestPost(props);
            case RequestMethod.delete:
                return await onRequestDelete(props);
            case RequestMethod.patch:
                return await onRequestPatch(props);
            case RequestMethod.put:
                return await onRequestPut(props);
            default:
                return await onRequestGet(props);
        }
    } catch (error) {
        return { status: 500 } as Response;
    }
};

export const onRequestGet = async (props: RequestProps): Promise<Response> => {
    const { url, headers, query } = props;

    return await instance.get(url + onParseQuery(query), {
        headers,
    });
};

export const onRequestPost = async (props: RequestProps): Promise<Response> => {
    const { url, headers, query, params } = props;

    return await instance.post(url + onParseQuery(query), params, {
        headers,
    });
};

export const onRequestDelete = async (props: RequestProps): Promise<Response> => {
    const { url, headers, query, params } = props;

    return await instance.delete(url + onParseQuery(query), {
        headers,
        params,
    });
};

export const onRequestPatch = async (props: RequestProps): Promise<Response> => {
    const { url, headers, query, params } = props;

    return await instance.patch(url + onParseQuery(query), params, {
        headers,
    });
};

export const onRequestPut = async (props: RequestProps): Promise<Response> => {
    const { url, headers, query, params } = props;

    return await instance.put(url + onParseQuery(query), params, {
        headers,
    });
};
