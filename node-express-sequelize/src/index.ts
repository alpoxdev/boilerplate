/* eslint-disable prettier/prettier */
import express, { Request, response, Response } from 'express';

const app = express();

const onGetStatus = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'live',
  });
};

app.get('/status', onGetStatus);

app.listen(8080, () => {
  console.log('🚀 Server is running on port 8080');
});
