import {
    Validator,
    HttpStatus,
    EnqueueTypes,
} from '@tbiegner99/ha-backend-common';
import serializer from '../serializers/playlists.js';
import models from '../models/playlists.js';
import PlaylistService from '../../services/playlists.js';

const service = new PlaylistService();

const asyncHandler = (func) => async (req, res) => {
    try {
        await func(req, res);
        // next();
    } catch (err) {
        // console.log(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

const selectPlaylistItems = async (req, res) => {
    const { playlistId } = req.params;
    const { limit } = req.query;
    const response = await service.getPlaylistItems(playlistId, limit);
    res.status(HttpStatus.OK).send(response);
};

const clearPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    await service.clearPlaylist(playlistId);
    res.sendStatus(HttpStatus.NO_CONTENT);
};

const enqueueAtFront = async (req, playlistId) => {
    await Validator.assertThatObjectMatchesModel(
        req.body,
        models.enqueueAtFront
    );
    const item = serializer.fromEnqueueAtFrontRequest(req);
    await service.addItemAtFront(playlistId, item);
};

const enqueueAfterItem = async (req, playlistId) => {
    await Validator.assertThatObjectMatchesModel(
        req.body,
        models.enqueueAfterItem
    );
    const item = serializer.fromEnqueueAfterItemRequest(req);
    await service.addItemAfter(playlistId, item.afterPosition, item);
};

const enqueueAtEnd = async (req, playlistId) => {
    await Validator.assertThatObjectMatchesModel(req.body, models.enqueueAtEnd);
    const item = serializer.fromEnqueueAtEndRequest(req);
    await service.enqueuePlaylistItem(playlistId, item);
};

const enqueueItem = async (req, res) => {
    const { method } = req.body;
    const { playlistId } = req.params;
    switch (method) {
        case EnqueueTypes.FRONT:
            await enqueueAtFront(req, playlistId);
            break;
        case EnqueueTypes.AFTER_ITEM:
            await enqueueAfterItem(req, playlistId);
            break;
        case EnqueueTypes.END:
        default:
            await enqueueAtEnd(req, playlistId);
    }
    const response = await service.getPlaylistItems(playlistId);
    res.status(HttpStatus.CREATED).send(response);
};

const moveAfterItem = async (req, playlistId, currentItemPosition) => {
    await Validator.assertThatObjectMatchesModel(
        req.body,
        models.moveAfterItem
    );
    const item = serializer.fromEnqueueAfterItemRequest(req);
    await service.moveItemAfter(
        playlistId,
        currentItemPosition,
        item.afterPosition
    );
};

const moveItem = async (req, res) => {
    const { method } = req.body;
    const { playlistId, position: currentItemPosition } = req.params;
    await Validator.assertThatObjectMatchesModel(req.body, models.moveItemBase);
    switch (method) {
        case EnqueueTypes.UP_ONE_POSITION:
            await service.moveUp(playlistId, currentItemPosition);
            break;
        case EnqueueTypes.DOWN_ONE_POSITION:
            await service.moveDown(playlistId, currentItemPosition);
            break;
        case EnqueueTypes.FRONT:
            await service.moveItemToFront(playlistId, currentItemPosition);
            break;
        case EnqueueTypes.AFTER_ITEM:
            await moveAfterItem(req, playlistId, currentItemPosition);
            break;
        case EnqueueTypes.END:
        default:
            await service.moveItemToEnd(playlistId, currentItemPosition);
    }
    const response = await service.getPlaylistItems(playlistId);
    res.status(HttpStatus.CREATED).send(response);
};

const removePlaylistItem = async (req, res) => {
    const { playlistId, position } = req.params;
    await service.removeItemAtPosition(playlistId, position);
    res.sendStatus(HttpStatus.NO_CONTENT);
};

const dequeue = async (req, res) => {
    const { playlistId } = req.params;
    const dequeuedItem = await service.dequeuePlaylistItem(playlistId);
    if (!dequeuedItem) {
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }
    return res.status(HttpStatus.OK).send(dequeuedItem);
};

const peek = async (req, res) => {
    const { playlistId } = req.params;
    const response = await service.peekPlaylistItem(playlistId);
    if (!response) {
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }
    return res.status(HttpStatus.OK).send(response);
};

export default {
    selectPlaylistItems: asyncHandler(selectPlaylistItems),
    enqueueItem: asyncHandler(enqueueItem),
    moveItem: asyncHandler(moveItem),
    clearPlaylist: asyncHandler(clearPlaylist),
    removePlaylistItem: asyncHandler(removePlaylistItem),
    dequeue: asyncHandler(dequeue),
    peek: asyncHandler(peek),
};
