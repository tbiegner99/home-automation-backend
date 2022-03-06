import {
    DBClientFactory,
    Databases,
    JobScheduler,
} from '@tbiegner99/ha-backend-common';

import express from 'express';
import bodyParser from 'body-parser';

import TVGuideUpdateJob from './services/jobs/TVGuideUpdateJob.js';
import * as tvController from './web/tv.js';

DBClientFactory.initialize(
    Databases.Credentials,
    Databases.ConnectionPoolSettings,
    Databases.Schemas.TV,
    [Databases.Schemas.TV]
);

JobScheduler.scheduleJob(new TVGuideUpdateJob());

const app = express();
app.use(bodyParser.json());

const tvRouter = express.Router();

tvRouter.put('/channels/import', tvController.importChannels);
tvRouter.get('/channels', tvController.loadAllChannels);
tvRouter.put('/guide/update', tvController.updateGuide);
tvRouter.get('/guide', tvController.loadGuide);
tvRouter.get('/guide/:channelNumber', tvController.loadGuideForChannel);
tvRouter.get('/channels/hd', tvController.loadHDChannels);
tvRouter.get('/channels/sd', tvController.loadSDChannels);

app.use('/api/tv', tvRouter);

app.listen(8080, () => {
    console.log('App started on port 8080');
});
