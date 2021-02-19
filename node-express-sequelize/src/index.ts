import express, { Request, response, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const onGetStatus = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'live',
    instanceId_pm2: process.env.pm_id || 'not in pm2',
  });
};

app.get('/status', onGetStatus);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
