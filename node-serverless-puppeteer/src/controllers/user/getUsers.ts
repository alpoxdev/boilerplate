import { createGatewayProxyHandler, Request, Response } from '../../services';
import User from '../../models/User';
import { AdminAuthorizer } from '../../middlewares';

export const onGetUsers = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        await AdminAuthorizer(req);

        const { skip, take } = req.query;

        const users: User[] = await User.find({ skip, take });
        return res({
            status: 200,
            body: { users },
        });
    }
);
