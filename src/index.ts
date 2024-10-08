import express, { Express } from 'express';
import { AppConstants } from './config/appConstants';
import bodyParser from 'body-parser';
import { router } from './routes';
import { connectDB } from './database/dbConnection';
import { errorHanlder } from './middleware/errorHandler.middleware';

const app: Express = express();

//used when query is sent inside body
app.use(bodyParser.json());
//defining base url
app.use('/api/v1', router);

connectDB();

app.listen(AppConstants.apiPort, () => {
  console.log(`Example app listening on port ${AppConstants.apiPort}`);
});

app.use(errorHanlder);

export { app };
