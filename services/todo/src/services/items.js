import { ListService } from '@tbiegner99/ha-backend-common';
import ToDoDatasource from '../datasource/datasource.js';

class ToDoService extends ListService {
    constructor() {
        super(new ToDoDatasource());
    }
}

export default ToDoService;
