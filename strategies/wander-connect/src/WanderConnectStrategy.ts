import BrowserWalletStrategy from "@arweave-wallet-kit/browser-wallet-strategy";
import {
  AppInfo,
  GatewayConfig,
  PermissionType,
} from "@arweave-wallet-kit/core/wallet";
import { Strategy } from "@arweave-wallet-kit/core/strategy";
import { WanderConnect, WanderConnectOptions } from "@wanderapp/connect";
import Transaction from "arweave/node/lib/transaction";
import { DataItem } from "arconnect";

const CLIENT_ID = "FREE_TRIAL";

export default class WanderConnectStrategy
  extends BrowserWalletStrategy
  implements Strategy
{
  public id = "wander-connect";
  public name = "Wander Connect";
  public description =
    "Secure non-custodial Arweave & AO wallet with social logins";
  //   public theme = "214, 89, 48";
  public theme = "243, 248, 252";
  public logo = "9n0Msz31a0NQc6rbCMqunzDQGzz_TuxyeR5MuCrHsPI";
  public url = "https://www.wander.app/connect";

  private _options;
  private _isAuthenticated;
  private _wanderConnect: any;
  private _arweaveWallet: any;

  constructor(options?: WanderConnectOptions) {
    super();
    this._options = options;
    this._isAuthenticated = false;
    this._wanderConnect = null;
    this._arweaveWallet = null;
  }

  public async isAvailable() {
    return true;
  }

  public async connect(
    permissions: PermissionType[],
    appInfo?: AppInfo,
    gateway?: GatewayConfig,
  ) {
    // If we're already authenticated, just use the existing wallet connection
    if (this._isAuthenticated && this._arweaveWallet) {
      return this._arweaveWallet.connect(permissions, appInfo, gateway);
    }

    // Create a new authentication promise
    const authPromise = new Promise<void>((resolve, reject) => {
      // Only instantiate WanderConnect when connect is called
      this._wanderConnect = new WanderConnect({
        clientId: this._options?.clientId || "FREE_TRIAL",

        /** Hide Wander BE Button */
        hideBE: true,

        /** Hide Wander Connect Button */
        // TODO: use this option when supported
        // button: false,
        button: {
          position: "bottom-right",
          //   customStyles: `
          //         /* Position the button container */
          //         :host {
          //             display:none;
          //         }
          //         `,
        },
        iframe: {
          /** Choose Modal for Iframe Layout */
          routeLayout: {
            auth: "modal",
            default: "popup",
            account: "popup",
            "auth-request": "modal",
          },
          /** Bring iframe on top of AWK */
          customStyles: `
            .iframe-wrapper, .iframe-wrapper.show {
                z-index: 999999 !important;
            }

            .iframe {
                z-index: 999999 !important;
            }
            /*
            .backdrop, .backdrop.show {
                display: none !important;
            }
            */
            `,
        },

        ...this._options,
        onAuth: (authInfo) => {
          // Call the original onAuth if provided in options
          if (this._options?.onAuth) {
            this._options.onAuth(authInfo);
          }

          // Handle authentication result
          if (authInfo.authStatus === "authenticated") {
            this._isAuthenticated = true;
            this._arweaveWallet = window.arweaveWallet;
            resolve();
          } else {
            this._isAuthenticated = false;
            // this._wanderConnect.open();
            // reject(new Error(`Authentication failed: ${authInfo.authStatus}`));
          }
        },
      });
      this._wanderConnect.open();
      // WanderConnect automatically starts authentication when instantiated
    });

    // Wait for authentication to complete
    try {
      await authPromise;
      // Now call the actual wallet connect method
      return this._arweaveWallet.connect(permissions, appInfo, gateway);
    } catch (error) {
      // Clean up if authentication fails
      this._wanderConnect = null;
      this._isAuthenticated = false;
      throw error;
    }
  }

  async _ensureConnected() {
    if (!this._isAuthenticated || !this._arweaveWallet) {
      throw new Error("Not connected. Call connect() first.");
    }
  }

  public async disconnect() {
    // await this._ensureConnected();
    const result = await this._arweaveWallet.disconnect();
    this._isAuthenticated = false;
    this._wanderConnect.destroy();
    this._wanderConnect = null;
    return result;
  }

  public async getActiveAddress() {
    await this._ensureConnected();
    return this._arweaveWallet.getActiveAddress();
  }

  public async getPermissions() {
    if (!this._isAuthenticated || !this._arweaveWallet) return [];
    return this._arweaveWallet.getPermissions();
  }

  public async getAllAddresses() {
    await this._ensureConnected();
    return this._arweaveWallet.getAllAddresses();
  }

  public async sign(transaction: Transaction, options?: any) {
    await this._ensureConnected();
    return this._arweaveWallet.sign(transaction, options);
  }

  public async signDataItem(p: DataItem) {
    await this._ensureConnected();
    return this._arweaveWallet.signDataItem(p);
  }

  public async createDataItemSigner() {
    await this._ensureConnected();
    return this._arweaveWallet.createDataItemSigner();
  }
}
