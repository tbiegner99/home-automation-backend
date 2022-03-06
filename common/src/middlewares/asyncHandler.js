import { HttpStatus } from '../config/index.js';
import APIError from '../errors/APIError.js';

export default (func) => async (req, res) => {
    try {
        await func(req, res);
        // next();
    } catch (err) {
        console.log(err);
        if (err instanceof APIError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        }
    }
};
