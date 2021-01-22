import { createGatewayProxyHandler, Request, Response } from '../../services';
import Weather from '../../models/Weather';

export const onGetWeathers = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { location } = req.query;
        if (!location) throw { status: 400, message: 'BadRequest: location' };

        const weathers = await Weather.find({
            where: { location },
        });

        return res({
            status: 200,
            body: { weathers },
        });
    }
);
