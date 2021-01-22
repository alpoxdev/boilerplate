import {
    createGatewayProxyHandler,
    Request,
    Response,
    createPassword,
} from '../../services';
import User from '../../models/User';

export const onRegister = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { email, name, password } = req.body;
        const findUser = await User.findOne({
            where: [{ email }, { name }],
        });
        if (findUser) throw { status: 404, message: 'User Already Exist' };

        const user: User = new User();
        user.email = email;
        user.name = name;

        const { hash, salt } = await createPassword(password);
        user.hash = hash;
        user.salt = salt;

        await User.save(user);

        return res({
            status: 201,
            body: { user, accessToken: user.accessToken },
        });
    }
);
