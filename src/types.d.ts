interface WindowGeometry {
  height: number;
  width: number;
  x: number;
  y: number;
}

type Slot = (client: KwinClient) => void;

interface QObject {
  connect: (cb: Slot) => void;
  disconnect: (cb: Slot) => void;
}

interface KwinClient {
  clientFinishUserMovedResized: QObject;
  clientStartUserMovedResized: QObject;
  clientStepUserMovedResized: QObject;
  geometry: WindowGeometry;
  windowId: string;
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
  cb: (client: KwinClient) => UserActions,
): void;
