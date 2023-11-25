import { Router } from 'express';

import userRouter from './user.route';

const apiPrefix = '/api';
const apiVersion = {
  v1: '/v1',
  v2: '/v2'
};

const fullPrefixV1 = `${apiPrefix}${apiVersion.v1}`;
const fullPrefixV2 = `${apiPrefix}${apiVersion.v2}`;

const indexRouter = Router();

indexRouter.get(fullPrefixV1, (req, res) => {
  res.json({ message: 'Hello world, v1' });
});

indexRouter.get(fullPrefixV2, (req, res) => {
  res.json({ message: 'Hello world, v2' });
});

indexRouter.use(`${fullPrefixV1}/user`, userRouter);

export default indexRouter;
