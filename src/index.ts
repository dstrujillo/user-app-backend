import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import indexRouter from '@/routes/index.route';
import { connectToMongoDb } from '@/config/mongodb.config';

const port = process.env.PORT || 3000;
const app = express();

app.set('port', port);

app.use(cors());
// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// routes
app.use('/', indexRouter);

// server listening
app.listen(app.get('port'), () => {
  console.log('Example app listening on port ', app.get('port'));
});

// connect to mongodb
connectToMongoDb();
