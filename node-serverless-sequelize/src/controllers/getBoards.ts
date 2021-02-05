import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../services';
import { Board } from '../models';

export const onGetBoards = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { limit, offset } = req.query;

        const boards = await Board.findAndCountAll({
            limit,
            offset,
        });

        return res({
            status: 200,
            body: boards,
        });
    }
);
