import { createGatewayProxyHandler, Request, Response } from '../../services';
import Log from '../../models/Log';

export const getLogs = async (req: Request, res: Response) => {
    const logs = await Log.find();

    return res({
        status: 200,
        body: { logs },
    });
};

export const onGetLogs = createGatewayProxyHandler(getLogs);
