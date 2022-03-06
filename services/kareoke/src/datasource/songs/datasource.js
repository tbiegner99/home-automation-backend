import { DBClientFactory } from '@tbiegner99/ha-backend-common';
import queries from './queries.js';
import mapper from './row-mapper.js';

const isEmpty = (arr) => arr.length === 0;

class SongsDatasource {
    async createSong(songData) {
        const params = mapper.toInsertParams(songData);
        const [results] = await DBClientFactory.getClient().query(
            queries.INSERT_QUERY,
            params
        );
        return { ...songData, songId: results.insertId };
    }

    async updateSong(songId, songData) {
        const params = mapper.toUpdateParams(songData);
        await DBClientFactory.getClient().query(queries.UPDATE_QUERY, params);
    }

    async deleteSong(songId) {
        await DBClientFactory.getClient().query(queries.DELETE_QUERY, {
            songId,
        });
    }

    async getSongById(songId) {
        const [results] = await DBClientFactory.getClient().query(
            queries.SELECT_BY_ID_QUERY.unlimited(),
            {
                songId,
            }
        );
        if (isEmpty(results)) {
            return [];
        }
        const result = mapper.fromSongRow(results[0]);
        return [result];
    }

    async getAllSongs() {
        const [results] = await DBClientFactory.getClient().query(
            queries.SELECT_ALL_SONGS.unlimited()
        );
        const result = results.map(mapper.fromSongRow);
        return result;
    }

    searchSongsByArtist(artist, opts) {
        const { exact, fullSearch } = opts;
        let query;
        if (fullSearch) {
            query = exact
                ? queries.SEARCH_SONG_BY_ARTIST_EXACT_QUERY
                : queries.SEARCH_SONG_BY_ARTIST_QUERY;
        } else {
            query = queries.SEARCH_ARTISTS_QUERY;
        }
        return this.runSearch(query, { artist }, opts);
    }

    searchSongsByTitle(title, opts) {
        const { exact, fullSearch } = opts;
        let query;
        if (fullSearch) {
            query = exact
                ? queries.SEARCH_SONG_BY_TITLE_EXACT_QUERY
                : queries.SEARCH_SONG_BY_TITLE_QUERY;
        } else {
            query = queries.SEARCH_TITLES_QUERY;
        }
        return this.runSearch(query, { title }, opts);
    }

    async fullSearchByText(text, opts) {
        const query = opts.exact
            ? queries.SEARCH_SONG_BY_TEXT_EXACT_QUERY
            : queries.SEARCH_SONG_BY_TEXT_QUERY;
        return this.runSearch(query, { text }, opts);
    }

    async searchSongsByText(text, opts) {
        if (opts.fullSearch) {
            return this.fullSearchByText(text, opts);
        }
        const resultsByArtist = this.searchSongsByArtist(text, opts);
        const resultsByTitle = this.searchSongsByTitle(text, opts);
        const getSongById = this.getSongById(text);
        const results = await Promise.all([
            resultsByTitle,
            resultsByArtist,
            getSongById,
        ]);
        return results.flat();
    }

    async runSearch(query, params, opts = {}) {
        const { limit } = opts;
        const intLimit = parseInt(limit, 10);
        const queryWithLimit = queries.withLimit(query, intLimit);

        const [results] = await DBClientFactory.getClient().query(
            queryWithLimit,
            {
                ...params,
                limit: intLimit,
            }
        );
        const mapSingleRowToResult = (row) => mapper.fromResult(row);
        const result = results.map(mapSingleRowToResult);
        return result;
    }
}

export default SongsDatasource;
