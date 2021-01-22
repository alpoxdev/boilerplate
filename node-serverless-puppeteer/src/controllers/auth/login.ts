import {
    createGatewayProxyHandler,
    Request,
    Response,
    comparePassword,
} from '../../services';

import User from '../../models/User';

export const onLogin = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id, password } = req.body;
        const user = await User.findOne({
            where: [{ email: id }, { name: id }],
        });

        if (!user) throw { status: 404, message: 'NotFound user' };

        const isCorrect = await comparePassword(password, user?.hash);
        if (isCorrect) {
            const accessToken = user.accessToken;

            return res({
                status: 200,
                body: { user, accessToken },
            });
        }

        throw { status: 400, message: 'NotCorrect Password' };
    }
);
