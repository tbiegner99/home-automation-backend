import { HttpStatus, Validator } from '@tbiegner99/ha-backend-common';
import serializer from '../serializers/songs.js';
import models from '../models/songs.js';
import SongsService from '../../services/songs.js';
import SearchModes from '../../config/constants/searchModes.js';
import SearchResultType from '../../config/constants/searchResultType.js';

const service = new SongsService();

const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res);
        next();
    } catch (err) {
        console.log(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

const createSong = async (req, res) => {
    await Validator.assertThatObjectMatchesModel(req.body, models.create);
    const song = serializer.fromCreateRequest(req);
    const createdObject = await service.createSong(song);
    res.status(HttpStatus.CREATED).send(createdObject);
};

const searchSong = async (req, res) => {
    await Validator.assertThatObjectMatchesModel(req.body, models.search);
    const {
        query,
        searchMode,
        exact = false,
        resultType = SearchResultType.SHORT,
    } = req.body;
    const { limit } = req.query;
    const opts = {
        limit,
        exact,
        fullSearch: resultType === SearchResultType.FULL,
    };
    let song;
    let results;
    switch (searchMode) {
        case SearchModes.TITLE:
            results = await service.searchSongsByTitle(query, opts);
            break;
        case SearchModes.ARTIST:
            results = await service.searchSongsByArtist(query, opts);
            break;
        case SearchModes.ID:
            try {
                song = await service.getSongById(query);
                results = [song];
            } catch (err) {
                results = [];
            }
            break;
        case SearchModes.TEXT:
        default:
            results = await service.searchSongsByText(query, opts);
            break;
    }

    res.status(HttpStatus.OK).send(results);
};

const getSongById = async (req, res) => {
    const { id } = req.params;

    const song = await service.getSongById(id);

    res.status(HttpStatus.OK).send(song);
};

const getAllSongs = async (req, res) => {
    const songs = await service.getAllSongs();

    res.status(HttpStatus.OK).send(songs);
};

const deleteSongById = async (req, res) => {
    const { id } = req.params;

    await service.deleteSong(id);

    res.sendStatus(HttpStatus.NO_CONTENT);
};

export default {
    createSong: asyncHandler(createSong),
    searchSong: asyncHandler(searchSong),
    getSongById: asyncHandler(getSongById),
    deleteSongById: asyncHandler(deleteSongById),
    getAllSongs: asyncHandler(getAllSongs),
};
