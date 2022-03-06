import express from 'express';
import bodyParser from 'body-parser';

import { Databases, DBClientFactory } from '@tbiegner99/ha-backend-common';

import * as toDoController from './web/controllers/todo.js';

DBClientFactory.initialize(
    Databases.Credentials,
    Databases.ConnectionPoolSettings,
    Databases.Schemas.TO_DO_LIST,
    [Databases.Schemas.TO_DO_LIST]
);

const app = express();
app.use(bodyParser.json());

const toDoRouter = express.Router();

toDoRouter.get('/list', toDoController.getAllLists);
toDoRouter.post('/list', toDoController.createList);
toDoRouter.get('/list/:listId', toDoController.getList);
toDoRouter.delete('/list/:listId', toDoController.deleteList);
toDoRouter.post('/list/:listId/items', toDoController.createListItem);
toDoRouter.get('/list/:listId/items', toDoController.getListItems);
toDoRouter.delete('/list/:listId/items', toDoController.clearList);
toDoRouter.delete('/list/:listId/items/:itemId', toDoController.deleteListItem);

app.use('/api/todo', toDoRouter);

app.listen(8080, () => {
    console.log('App started on port 8080');
});
