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
    // Use existing connection if user is already authenticated
    if (this._isAuthenticated && this._arweaveWallet) {
      return this._arweaveWallet.connect(permissions, appInfo, gateway);
    }

    // We need a promise to be fulfilled in order to later call connect
    const authPromise = new Promise<void>((resolve, reject) => {
      // Only instance WanderConnect when AWK connect is called
      this._wanderConnect = new WanderConnect({
        clientId: this._options?.clientId || "FREE_TRIAL",
        hideBE: true, // Hide BE button
        button: false, // Hide WC buton
        iframe: {
          routeLayout: {
            auth: "modal", // Use Modal for auth views
            default: "modal", // Use Popup for default views
            account: "modal", // Use Popup for account views
            "auth-request": "modal", // Use Modal for auth request views
          },
          // Put iframe on top of AWK
          customStyles: `
            .iframe-wrapper, .iframe-wrapper.show {
                z-index: 999999 !important;
            }
            .iframe {
                z-index: 999999 !important;
            }
            `,
        },
        ...this._options, // use options passed on Strategy constructor
        onAuth: (authInfo) => {
          if (this._options?.onAuth) {
            // Call original onAuth if provided in options
            this._options.onAuth(authInfo);
          }

          // Handle authentication result
          if (authInfo.authStatus === "authenticated") {
            this._isAuthenticated = true;
            this._arweaveWallet = window.arweaveWallet;
            this._wanderConnect.close();
            resolve();
          } else {
            this._isAuthenticated = false;
            console.log(`[AWK] WC Auth: ${authInfo.authStatus}`);
          }
        },
      });
      // Open Wander Connect once constructor finishes
      this._wanderConnect.open();
    });

    try {
      await authPromise; // Wait for authentication to complete

      return this._arweaveWallet.connect(permissions, appInfo, gateway);
    } catch (error) {
      // Clean up if authentication fails
      try {
        this._wanderConnect.destroy();
      } catch {}
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
