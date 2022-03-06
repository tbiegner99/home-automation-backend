class Job {
    run() {}

    interrupt() {}

    get name() {
        throw new Error('Unimplemented');
    }

    get schedule() {
        throw new Error('unimplemented');
    }
}

export default Job;
