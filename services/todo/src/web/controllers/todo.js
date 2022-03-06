import {
    Validator,
    Middlewares,
    HttpStatus,
} from '@tbiegner99/ha-backend-common';
import * as serializer from '../serializers/todo.js';
import * as models from '../models/todo.js';
import ToDoListService from '../../services/items.js';

const service = new ToDoListService();

export const createList = Middlewares.asyncHandler(async (req, res) => {
    await Validator.assertThatObjectMatchesModel(req.body, models.createList);
    const list = serializer.fromCreateListRequest(req);
    const createdObject = await service.createList(list);
    res.status(HttpStatus.CREATED).send(createdObject);
});

export const getList = Middlewares.asyncHandler(async (req, res) => {
    const listObject = await service.getListById(req.params.listId);
    res.status(HttpStatus.OK).send(listObject);
});

export const getListItems = Middlewares.asyncHandler(async (req, res) => {
    const { top } = req.query;
    const listObject = await service.getItems(req.params.listId, top);
    res.status(HttpStatus.OK).send(listObject);
});

export const getAllLists = Middlewares.asyncHandler(async (req, res) => {
    const listObjects = await service.getAllLists();
    res.status(HttpStatus.OK).send(listObjects);
});

export const createListItem = Middlewares.asyncHandler(async (req, res) => {
    const { listId } = req.params;
    await Validator.assertThatObjectMatchesModel(
        req.body,
        models.createListItem
    );
    const listItem = serializer.fromCreateListRequest(req);
    const createdObject = await service.enqueueItem(listId, listItem);
    res.status(HttpStatus.CREATED).send(createdObject);
});

export const deleteList = Middlewares.asyncHandler(async (req, res) => {
    await service.deleteList(req.params.listId);
    res.sendStatus(HttpStatus.NO_CONTENT);
});

export const deleteListItem = Middlewares.asyncHandler(async (req, res) => {
    const { listId, itemId } = req.params;
    await service.removeItem(listId, itemId);
    res.sendStatus(HttpStatus.NO_CONTENT);
});

export const clearList = Middlewares.asyncHandler(async (req, res) => {
    await service.clearList(req.params.listId);
    res.sendStatus(HttpStatus.NO_CONTENT);
});
