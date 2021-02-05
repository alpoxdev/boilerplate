import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
    createPassword,
} from '../services';

import { User } from '../models';

export const onRegister = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { email, nickname, password } = req.body;
        const { hash, salt } = await createPassword(password);

        const user: User = await User.create({
            email,
            nickname,
            password,
            hash,
            salt,
        });

        return res({
            status: 201,
            body: { accessToken: user.accessToken },
        });
    }
);
