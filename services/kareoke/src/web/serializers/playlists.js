const fromEnqueueAtFrontRequest = (req) => ({
    songId: req.body.songId,
});
const fromEnqueueAfterItemRequest = (req) => ({
    ...fromEnqueueAtFrontRequest(req),
    afterPosition: req.body.afterPosition,
});

export default {
    fromEnqueueAfterItemRequest,
    fromEnqueueAtFrontRequest,
    fromEnqueueAtEndRequest: fromEnqueueAtFrontRequest,
};
