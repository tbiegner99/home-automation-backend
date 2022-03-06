import { HttpStatus, Middlewares } from '@tbiegner99/ha-backend-common';

import TVChannelsService from '../services/channels.js';
import TVGuideService from '../services/guide.js';

const service = new TVChannelsService();
const guideService = new TVGuideService();

export const importChannels = Middlewares.asyncHandler(async (req, res) => {
    await service.importChannels();
    res.sendStatus(HttpStatus.NO_CONTENT);
});

export const updateGuide = Middlewares.asyncHandler(async (req, res) => {
    await guideService.updateGuide();
    res.sendStatus(HttpStatus.NO_CONTENT);
});

export const loadGuide = Middlewares.asyncHandler(async (req, res) => {
    const response = await guideService.loadGuide();
    res.status(HttpStatus.OK).send(response);
});

export const loadGuideForChannel = Middlewares.asyncHandler(
    async (req, res) => {
        const response = await guideService.loadGuideForChannelNumber(
            req.params.channelNumber
        );
        res.status(HttpStatus.OK).send(response);
    }
);

export const loadAllChannels = Middlewares.asyncHandler(async (req, res) => {
    const response = await service.loadChannels();
    res.status(HttpStatus.OK).send(response);
});

export const loadHDChannels = Middlewares.asyncHandler(async (req, res) => {
    const response = await service.loadHDChannels();
    res.status(HttpStatus.OK).send(response);
});

export const loadSDChannels = Middlewares.asyncHandler(async (req, res) => {
    const response = await service.loadSDChannels();
    res.status(HttpStatus.OK).send(response);
});
