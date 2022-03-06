import TVChannelsDatasource from '../datasource/channels/datasource.js';

import KodiTVDatasource from '../datasource/kodi/datasource.js';

class TVChannelsService {
    constructor() {
        this.kodiDatasource = new KodiTVDatasource();
        this.channelsDatasource = new TVChannelsDatasource();
    }

    async importChannels() {
        try {
            const channels = await this.kodiDatasource.loadAllChannels();
            channels.map((channel) =>
                this.channelsDatasource.createChannel(channel)
            );
            return await Promise.all(channels);
        } catch (err) {
            throw new Error('An error occurred importing channels');
        }
    }

    async loadHDChannels() {
        const channels = await this.loadChannels();
        return channels.filter((channel) => channel.highDefinition);
    }

    async loadSDChannels() {
        const channels = await this.loadChannels();
        return channels.filter((channel) => !channel.highDefinition);
    }

    async loadChannels() {
        try {
            return await this.channelsDatasource.getAllChannels();
        } catch (err) {
            throw new Error('An error occurred loading channels');
        }
    }

    async getChannelByNumber(number) {
        try {
            return await this.channelsDatasource.getChannelByNumber(number);
        } catch (err) {
            throw new Error('An error occurred loading channels');
        }
    }
}

export default TVChannelsService;
