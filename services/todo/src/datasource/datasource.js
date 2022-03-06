import {
    ListDatasource,
    DBClientFactory,
    Databases,
} from '@tbiegner99/ha-backend-common';

import serializer from './row-mapper.js';
import queryGenerator from './queries.js';

class ToDoListDatasource extends ListDatasource {
    constructor() {
        super(
            serializer,
            queryGenerator,
            DBClientFactory.getClient(Databases.TO_DO_LIST)
        );
    }
}

export default ToDoListDatasource;
