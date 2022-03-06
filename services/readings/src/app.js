import express from 'express';
import bodyParser from 'body-parser';
import { DBClientFactory, Databases } from '@tbiegner99/ha-backend-common';

import readingsController from './web/controllers/readings.js';

DBClientFactory.initialize(
    Databases.Credentials,
    Databases.ConnectionPoolSettings,
    Databases.Schemas.READINGS,
    [Databases.Schemas.READINGS]
);

const app = express();
app.use(bodyParser.json());

const readingsRouter = express.Router();

readingsRouter.post('/zones', readingsController.createZone);
readingsRouter.get('/zones', readingsController.getZones);
readingsRouter.get(
    '/zones/:zone/readings/:type/:filter',
    readingsController.getReadingsForZone
);
readingsRouter.post(
    '/zones/:zone/readings/:type',
    readingsController.createReading
);

app.use('/api/readings', readingsRouter);

app.listen(8080, () => {
    console.log('App started on port 8080');
});
