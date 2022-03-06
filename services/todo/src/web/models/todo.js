import Joi from '@hapi/joi';

export const createList = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null),
});

export const createListItem = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null),
    quantity: Joi.number().optional().default(1).allow(null),
    where: Joi.string().optional().allow(null),
    estimatedCost: Joi.number().optional().allow(null),
    plannedDate: Joi.date().optional().allow(null),
    notes: Joi.string().optional().allow(null),
    link: Joi.string().optional().allow(null),
});
