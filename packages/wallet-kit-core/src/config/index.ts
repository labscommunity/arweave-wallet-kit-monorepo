import { AppInfo, GatewayConfig, PermissionType } from "../wallet";
import { Strategy } from "../strategy";

/** Global config for the kit */
export interface Config {
  /** Strategies used to use in the kit */
  strategies: Strategy[];
  /** The permissions your app requires */
  permissions: PermissionType[];
  /**
   * This will ensure that all required permissions are
   * given to your app. If not, the kit will not
   * consider the strategy "connected"
   */
  ensurePermissions?: boolean;
  /** Information about your application */
  appInfo?: AppInfo;
  /** Custom Arweave gateway configuration */
  gatewayConfig?: GatewayConfig;
}

export const defaultConfig: Config = {
  strategies: [],
  permissions: ["ACCESS_ADDRESS", "ACCESS_ALL_ADDRESSES"],
  ensurePermissions: false
};
