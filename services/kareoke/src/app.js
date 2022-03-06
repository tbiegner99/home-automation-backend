import express from 'express';

import bodyParser from 'body-parser';
import { DBClientFactory, Databases } from '@tbiegner99/ha-backend-common';
import songsController from './web/controllers/songs.js';

import playlistController from './web/controllers/playlists.js';

DBClientFactory.initialize(
    Databases.Credentials,
    Databases.ConnectionPoolSettings,
    Databases.Schemas.KAREOKE,
    [Databases.Schemas.KAREOKE]
);

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.url);
    next();
});
const songsRouter = express.Router();

songsRouter.post('/songs', songsController.createSong);
songsRouter.get('/songs', songsController.getAllSongs);
songsRouter.get('/songs/:id', songsController.getSongById);
songsRouter.delete('/songs/:id', songsController.deleteSongById);
songsRouter.post('/songs/search', songsController.searchSong);

const playlistRouter = express.Router();

playlistRouter.delete(
    '/playlist/:playlistId',
    playlistController.clearPlaylist
);

playlistRouter.get(
    '/playlist/:playlistId/items',
    playlistController.selectPlaylistItems
);

playlistRouter.post(
    '/playlist/:playlistId/items',
    playlistController.enqueueItem
);
playlistRouter.get('/playlist/:playlistId/items/peek', playlistController.peek);
playlistRouter.delete(
    '/playlist/:playlistId/items/dequeue',
    playlistController.dequeue
);
playlistRouter.delete(
    '/playlist/:playlistId/items/:position',
    playlistController.removePlaylistItem
);
playlistRouter.put(
    '/playlist/:playlistId/items/:position',
    playlistController.moveItem
);

app.use('/api/kareoke', songsRouter);
app.use('/api/kareoke', playlistRouter);

app.listen(8080, () => {
    console.log('App started on port 8080');
});
