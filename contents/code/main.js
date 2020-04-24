var callbacks = {};

function forceGeometryCallback(geometry) {
    return function (client) {
        client.geometry = geometry;
    }
}

registerUserActionsMenu(function (client) {
    return {
        checkable: true,
        checked: !!callbacks[client.windowId],
        text: 'Locked',
        triggered: function (action) {
            if (action.checked) {
                callbacks[client.windowId] = forceGeometryCallback(client.geometry);
                client.clientStartUserMovedResized.connect(callbacks[client.windowId]);
                client.clientStepUserMovedResized.connect(callbacks[client.windowId]);
                client.clientFinishUserMovedResized.connect(callbacks[client.windowId]);
            } else {
                client.clientStartUserMovedResized.disconnect(callbacks[client.windowId]);
                client.clientStepUserMovedResized.disconnect(callbacks[client.windowId]);
                client.clientFinishUserMovedResized.disconnect(callbacks[client.windowId]);
                delete callbacks[client.windowId];
            }
        }
    }
});
