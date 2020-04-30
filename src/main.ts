interface Geometry {
  width: number;
  height: number;
  x: number;
  y: number;
}

type SignalCallback = (client: Client) => void;

interface Signal {
  connect: (cb: SignalCallback) => void;
  disconnect: (cb: SignalCallback) => void;
}

interface Client {
  geometry: Geometry;
  windowId: string;
  clientStartUserMovedResized: Signal;
  clientStepUserMovedResized: Signal;
  clientFinishUserMovedResized: Signal;
}

interface Action {
  checked: boolean;
}

interface UserActions {
  checkable: boolean;
  checked: boolean;
  text: string;
  triggered: (action: Action) => void;
}

declare function registerUserActionsMenu(
  cb: (client: Client) => UserActions,
): void;

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
          client.clientStartUserMovedResized.connect(
            callbacks[client.windowId],
          );
          client.clientStepUserMovedResized.connect(
            callbacks[client.windowId],
          );
          client.clientFinishUserMovedResized.connect(
            callbacks[client.windowId],
          );
        } else {
          client.clientStartUserMovedResized.disconnect(
            callbacks[client.windowId],
          );
          client.clientStepUserMovedResized.disconnect(
            callbacks[client.windowId],
          );
          client.clientFinishUserMovedResized.disconnect(
            callbacks[client.windowId],
          );
          delete callbacks[client.windowId];
        }
      },
    });
  })(),
);
