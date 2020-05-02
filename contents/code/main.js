"use strict";
(function () {
    var callbacks = {};
    registerUserActionsMenu(function (client) { return ({
        checkable: true,
        checked: !!callbacks[client.windowId],
        text: 'Locked',
        triggered: function (action) {
            if (action.checked) {
                callbacks[client.windowId] = (function (geometry) { return function (client) {
                    client.geometry = geometry;
                }; })(client.geometry);
                client.clientFinishUserMovedResized.connect(callbacks[client.windowId]);
                client.clientStartUserMovedResized.connect(callbacks[client.windowId]);
                client.clientStepUserMovedResized.connect(callbacks[client.windowId]);
            }
            else {
                client.clientFinishUserMovedResized.disconnect(callbacks[client.windowId]);
                client.clientStartUserMovedResized.disconnect(callbacks[client.windowId]);
                client.clientStepUserMovedResized.disconnect(callbacks[client.windowId]);
                delete callbacks[client.windowId];
            }
        },
    }); });
})();
