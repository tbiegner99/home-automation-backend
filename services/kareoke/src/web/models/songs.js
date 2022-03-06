import Joi from '@hapi/joi';
import searchModes from '../../config/constants/searchModes.js';
import resultTypes from '../../config/constants/searchResultType.js';

const create = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    source: Joi.string().optional(),
    filename: Joi.string().required(),
});

const search = Joi.object({
    exact: Joi.bool().optional(),
    resultType: Joi.string()
        .optional()
        .valid(...Object.values(resultTypes)),
    searchMode: Joi.string()
        .required()
        .valid(...Object.values(searchModes)),
    query: Joi.string().min(3).required(),
});

export default {
    create,
    search,
};
