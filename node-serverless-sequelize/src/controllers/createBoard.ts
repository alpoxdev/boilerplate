import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../services';
import { Authorizer, ifAuthorizer } from '../middlewares';
import { Board, ContentType } from '../models';

export const onCreateBoard = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { title, subtitle, content, contentType } = req.body;

        const user = await ifAuthorizer(req);
        const board = await Board.create({
            title,
            subtitle,
            content,
            contentType:
                contentType === 'html'
                    ? ContentType.html
                    : ContentType.markdown,
            user,
        });

        return res({
            status: 201,
            body: { board },
        });
    }
);
