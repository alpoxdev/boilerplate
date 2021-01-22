import { APIGatewayProxyEvent } from 'aws-lambda';
import { connectDatabase } from '../models';

import { getError } from './error';
import { parsePageQuery } from './query';
import { NODE_ENV } from '../config';

export interface CustomResponseType {
    status: number;
    body?: object | string | null;
    headers?: object;
}

export interface ResponseType {
    statusCode?: number;
    body?: string;
    headers?: object;
}

export interface Request {
    headers?: any;
    params?: any;
    query?: any;
    body?: any;
    event: APIGatewayProxyEvent;
}

export type Response = ({
    status,
    body,
    headers,
}: CustomResponseType) => ResponseType;

const isProduction = NODE_ENV === 'prod';

const getResponse: Response = ({
    status,
    body,
    headers,
}: CustomResponseType) => {
    let responseBody = '';

    if (typeof body === 'object') {
        responseBody = JSON.stringify(body);
    }
    if (typeof body === 'string') {
        responseBody = body;
    }

    return {
        statusCode: status,
        body: responseBody,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, DELETE, PUT, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            ...headers,
        },
    } as ResponseType;
};

export const createGatewayProxyHandler = (
    handler: (
        req: Request,
        res: Response,
        ...args: Array<any>
    ) => Promise<ResponseType>
) => {
    return async (event: APIGatewayProxyEvent) => {
        const { body, headers, pathParameters, queryStringParameters } = event;
        const parsedQuery = parseQuery(queryStringParameters);
        const parsedBody = parseBody(body);

        const req = {
            params: pathParameters,
            query: parsedQuery,
            body: parsedBody,
            headers,
            event,
        } as Request;
        const res = getResponse;

        try {
            await connectDatabase();

            isProduction && console.log(`Lambda Request`, req);
            const response = await handler(req, res);
            console.log(`Lambda Response`, response);
            return response;
        } catch (error) {
            const { status = 404, body } = getError(
                error?.status,
                error?.message
            );
            console.log(`Lambda Error`, error);

            return getResponse({
                status,
                body,
            });
        }
    };
};

const parseQuery = (query) => {
    return {
        ...query,
        ...parsePageQuery(query),
    };
};

const parseBody = (body) => {
    try {
        return JSON.parse(body || '{}');
    } catch (error) {
        return {};
    }
};
