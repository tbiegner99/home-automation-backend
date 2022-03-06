import axios from 'axios';

class HttpDatasource {
    constructor(baseUrl, config) {
        this.baseUrl = baseUrl;
        this.httpClient = axios.create(config);
    }

    constructUrl(url) {
        return `${this.baseUrl}${url}`;
    }

    get dbClient() {
        return this.httpClient;
    }
}

export default HttpDatasource;
