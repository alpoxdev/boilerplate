import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../services';

export const onGetStatus = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        return res({ status: 200 });
    }
);
