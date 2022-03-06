import { HttpStatus } from '../src/config';

class APIError extends Error {
    get statusCode() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
export default APIError;
