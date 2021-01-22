import { createGatewayProxyHandler, Request, Response } from '../../services';
import Log from '../../models/Log';

export const getLog = async (req: Request, res: Response) => {
    const { id } = req.params;

    const log = await Log.findOne(id);
    if (!log) throw { status: 404 };

    return res({ status: 200, body: { log } });
};

export const onGetLog = createGatewayProxyHandler(getLog);
