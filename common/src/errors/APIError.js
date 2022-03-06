import { HttpStatus } from '../config/index.js';

class APIError extends Error {
    get statusCode() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
export default APIError;
