interface Geometry {
  height: number;
  width: number;
  x: number;
  y: number;
}

type SignalCallback = (client: Client) => void;

interface Signal {
  connect: (cb: SignalCallback) => void;
  disconnect: (cb: SignalCallback) => void;
}

interface Client {
  clientFinishUserMovedResized: Signal;
  clientStartUserMovedResized: Signal;
  clientStepUserMovedResized: Signal;
  geometry: Geometry;
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
  cb: (client: Client) => UserActions,
): void;
