(() => {
  const callbacks: { [x: string]: Slot } = {};
  registerUserActionsMenu(
    (client: KwinClient) => ({
      checkable: true,
      checked: !!callbacks[client.windowId],
      text: 'Locked',
      triggered: (action: Action) => {
        if (action.checked) {
          callbacks[client.windowId] = ((geometry: WindowGeometry) => (client: KwinClient) => {
            client.geometry = geometry;
          })(client.geometry);
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
    })
  );
})();
