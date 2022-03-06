import {
    HttpStatus,
    Middlewares,
    Validator,
} from '@tbiegner99/ha-backend-common';
import ReadingsService from '../../services/readings.js';

import serializer from '../serializers/readings.js';
import models from '../models/readings.js';

const service = new ReadingsService();

const getReadingsForZone = async (req, res) => {
    const { zone, type, filter, filterParams } =
        serializer.fromGetReadingsRequest(req);
    const results = await service.getReadingsForZone(
        zone,
        type,
        filter,
        filterParams
    );
    const response = serializer.toGetReadingsResponse(results);
    res.status(HttpStatus.OK).send(response);
};

const getZones = async (req, res) => {
    const results = await service.getZones();
    const response = serializer.toZonesResponse(results);
    res.status(HttpStatus.OK).send(response);
};

const createZone = async (req, res) => {
    await Validator.assertThatObjectMatchesModel(req.body, models.zone);
    const zone = serializer.fromCreateZoneRequest(req);
    const result = await service.createZone(zone);
    const response = serializer.toZoneResponse(result);
    res.status(HttpStatus.CREATED).send(response);
};

const createReading = async (req, res) => {
    const { zone, type, ...data } = serializer.fromCreateReadingRequest(req);
    const model = models.getModelForReadingType(type);
    await Validator.assertThatObjectMatchesModel(req.body, model);

    const result = await service.createReading(zone, type, data);
    const response = await serializer.toReadingResponse(result);
    res.status(HttpStatus.OK).send(response);
};

export default {
    createReading: Middlewares.asyncHandler(createReading),
    createZone: Middlewares.asyncHandler(createZone),
    getZones: Middlewares.asyncHandler(getZones),
    getReadingsForZone: Middlewares.asyncHandler(getReadingsForZone),
};
