registerUserActionsMenu(
  (() => {
    const callbacks: { [x: string]: SignalCallback } = {};
    const forceGeometryCallback = (geometry: Geometry) => (client: Client) => {
      client.geometry = geometry;
    };
    return (client: Client) => ({
      checkable: true,
      checked: !!callbacks[client.windowId],
      text: 'Locked',
      triggered: (action: Action) => {
        if (action.checked) {
          callbacks[client.windowId] = forceGeometryCallback(client.geometry);
          client.clientFinishUserMovedResized.connect(
            callbacks[client.windowId],
          );
          client.clientStartUserMovedResized.connect(
            callbacks[client.windowId],
          );
          client.clientStepUserMovedResized.connect(
            callbacks[client.windowId],
          );
        } else {
          client.clientFinishUserMovedResized.disconnect(
            callbacks[client.windowId],
          );
          client.clientStartUserMovedResized.disconnect(
            callbacks[client.windowId],
          );
          client.clientStepUserMovedResized.disconnect(
            callbacks[client.windowId],
          );
          delete callbacks[client.windowId];
        }
      },
    });
  })(),
);
