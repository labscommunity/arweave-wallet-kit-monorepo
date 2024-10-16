import type { PermissionType } from "@arweave-wallet-kit/core/wallet";
import type { Config } from "@arweave-wallet-kit/core/config";

/** Basic action */
export interface Action {
  type: string;
  payload?: any;
}

/** All actions */

export interface OpenModalAction extends Action {
  type: "OPEN_MODAL";
  payload: ModalType;
}

export interface CloseModalAction extends Action {
  type: "CLOSE_MODAL";
}

export interface DisconnectAction extends Action {
  type: "DISCONNECT";
}

export interface UpdateStrategyAction extends Action {
  type: "UPDATE_STRATEGY";
  payload: string | false;
}

export interface UpdateConfig extends Action {
  type: "UPDATE_CONFIG";
  payload: Config;
}

export interface UpdateAddress extends Action {
  type: "UPDATE_ADDRESS";
  payload: string;
}

export interface UpdatePermissions extends Action {
  type: "UPDATE_PERMISSIONS";
  payload: PermissionType[];
}

/** Modal types */
export type ModalType = "connect" | "profile";

/** All possible actions for the global state reducer */
export type Actions =
  | OpenModalAction
  | CloseModalAction
  | DisconnectAction
  | UpdateStrategyAction
  | UpdateConfig
  | UpdateAddress
  | UpdatePermissions;

/** Global state type */
export interface GlobalState {
  activeModal: ModalType | false;
  activeStrategy: string | false;
  config: Config;
  activeAddress?: string;
  givenPermissions: PermissionType[];
}
