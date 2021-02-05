import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../services';
import { Board, User } from '../models';

export const onGetBoard = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const board = await Board.findOne({
            where: { id },
        });

        return res({
            status: 200,
            body: { board },
        });
    }
);
