import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../services';
import { SelfAuthorizer } from '../middlewares';
import { Board, ContentType } from '../models';

export const onDeleteBoard = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const board = await Board.findOne(id);
        if (!board) throw { status: 404, message: 'NotFound board' };

        await SelfAuthorizer(req, board.user);
        await board.destroy();

        return res({ status: 204 });
    }
);
