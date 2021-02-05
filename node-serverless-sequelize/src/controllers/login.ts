import { Op } from 'sequelize';

import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
    comparePassword,
} from '../services';
import { User } from '../models';

export const onLogin = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id, password } = req.body;

        const user: User | null = await User.findOne({
            where: { [Op.or]: [{ email: id }, { nickname: id }] },
        });

        if (!user) throw { status: 404, message: 'NotFound User' };

        const isPasswordCorrect = await comparePassword(password, user.hash);
        if (!isPasswordCorrect)
            throw { status: 400, message: 'NotCoorect password' };

        return res({
            status: 200,
            body: { accessToken: user.accessToken },
        });
    }
);
