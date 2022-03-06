import Joi from '@hapi/joi';
import { Types } from '../../config/constants/readings.js';

const zone = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
});

const temperatureReading = Joi.object({
    temperature: Joi.number().required(),
});
const humidityReading = Joi.object({
    humidity: Joi.number().required(),
});

const getModelForReadingType = (type) => {
    switch (type) {
        case Types.HUMIDITY:
            return humidityReading;
        case Types.TEMPERATURE:
            return temperatureReading;
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
export default {
    zone,

    getModelForReadingType,
};
