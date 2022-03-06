import { Job } from '@tbiegner99/ha-backend-common';
import TVGuideService from '../guide.js';

class TVGuideUpdateJob extends Job {
    constructor(name = 'TV Guide Update Job') {
        super();
        this.guideService = new TVGuideService();
        this.jobName = name;
    }

    async run() {
        try {
            console.log('Starting TV guide update');
            await this.guideService.updateGuide();
            console.log('Finished TV guide update');
        } catch (err) {
            console.log(err);
        }
    }

    get name() {
        return this.jobName;
    }

    get schedule() {
        return '10-59/15 * * * *';
    }
}

export default TVGuideUpdateJob;
