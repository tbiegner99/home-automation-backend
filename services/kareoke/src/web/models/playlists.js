import Joi from '@hapi/joi';
import { EnqueueTypes } from '@tbiegner99/ha-backend-common';

const moveItemBase = {
    method: Joi.string()
        .required()
        .valid(...Object.values(EnqueueTypes)),
};

const baseEnqueueObject = {
    ...moveItemBase,
    songId: Joi.number().integer().required(),
};

const enqueueAtFront = Joi.object(baseEnqueueObject);

const enqueueAtEnd = enqueueAtFront;

const enqueueAfterItem = Joi.object({
    ...baseEnqueueObject,
    afterPosition: Joi.number().required(),
});

const moveAfterItem = Joi.object({
    ...moveItemBase,
    afterPosition: Joi.number().required(),
});

export default {
    enqueueAtFront,
    enqueueAtEnd,
    enqueueAfterItem,
    moveItemBase: Joi.object(moveItemBase).unknown(true),
    moveAfterItem,
};
