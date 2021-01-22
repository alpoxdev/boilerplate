import { createGatewayProxyHandler, Request, Response } from '../../services';
import User from '../../models/User';
import { AdminAuthorizer } from '../../middlewares';

export const onGetUser = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        await AdminAuthorizer(req);

        const { id } = req.params;

        const user: User = await User.findOne(id);
        if (!user) throw { status: 404, message: 'NotFound user' };

        return res({
            status: 200,
            body: { user },
        });
    }
);
