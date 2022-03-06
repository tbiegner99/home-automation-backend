import { DBClientFactory, Databases } from '@tbiegner99/ha-backend-common';
import queries from './queries.js';
import mapper from './row-mapper.js';

const isEmpty = (arr) => arr.length === 0;

class TVChannelsDatasource {
    constructor() {
        this.client = DBClientFactory.getClient(Databases.TV);
    }

    async createChannel(channel) {
        const params = mapper.toInsertParams(channel);
        await this.client.query(queries.INSERT_QUERY, params);
        return channel;
    }

    async deleteChannel(channelId) {
        await this.client.query(queries.DELETE_QUERY, { channelId });
    }

    getChannelById(channelId) {
        return this.getChannel(queries.SELECT_BY_ID_QUERY, {
            channelId,
        });
    }

    getChannelByNumber(channelNumber) {
        return this.getChannel(queries.SELECT_BY_NUMBER_QUERY, {
            channelNumber,
        });
    }

    async getChannel(query, params) {
        const [results] = await this.client.query(query, params);
        if (isEmpty(results)) {
            return [];
        }
        const result = mapper.fromChannel(results[0]);
        return [result];
    }

    async getAllChannels() {
        const [results] = await this.client.query(
            queries.SELECT_ALL_CHANNELS_QUERY
        );
        const result = results.map(mapper.fromChannel);
        return result;
    }
}

export default TVChannelsDatasource;
