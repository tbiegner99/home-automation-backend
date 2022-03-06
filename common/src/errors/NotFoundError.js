import { HttpStatus } from '../config/index.js';
import APIError from './APIError.js';

class NotFoundError extends APIError {
    get statusCode() {
        return HttpStatus.NOT_FOUND;
    }
}

export default NotFoundError;
