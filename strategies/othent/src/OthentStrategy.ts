import type { SignatureOptions } from "arweave/node/lib/crypto/crypto-interface";
import type {
  AppInfo,
  DispatchResult,
  GatewayConfig,
  PermissionType,
  DataItem as ArconnectDataItem,
} from "arconnect";
import { Strategy } from "@arweave-wallet-kit/core/strategy";
import type Transaction from "arweave/web/lib/transaction";
import { Othent, OthentOptions, AppInfo as OthentAppInfo } from "@othent/kms";
import { AoSigner } from "@arweave-wallet-kit/core/src/wallet";
import { DataItem } from "@dha-team/arbundles";

export default class OthentStrategy implements Strategy {
  public id: "othent" = "othent";
  public name = "Othent";
  public description =
    "Othent JS SDK to manage Arweave wallets backed by Auth0 and Google Key Management Service.";
  public theme = "35, 117, 239";
  public logo = "33nBIUNlGK4MnWtJZQy9EzkVJaAd7WoydIKfkJoMvDs";
  public url = "https://othent.io";

  private othent: Othent | null = null;
  private othentOptions: OthentOptions | null = null;
  private addressListeners: ListenerFunction[] = [];

  constructor() {}

  public __overrideOthentOptions(othentOptions: OthentOptions) {
    this.othentOptions = othentOptions;
  }

  private othentInstance() {
    if (this.othent) return this.othent;

    try {
      const appInfo: OthentAppInfo = {
        name: typeof location === "undefined" ? "UNKNOWN" : location.hostname,
        version: "ArweaveWalletKit",
        env: "",
      };

      this.othent = new Othent({
        appInfo,
        persistLocalStorage: true,
        ...this.othentOptions,
      });

      // Note the cleanup function is not used here, which could cause issues with Othent is re-instantiated on the same tab.
      this.othent.addEventListener("auth", (userDetails) => {
        for (const listener of this.addressListeners) {
          listener(
            (userDetails?.walletAddress || undefined) as unknown as string,
          );
        }
      });

      if (this.othentOptions?.persistLocalStorage) {
        // Note the cleanup function is not used here, which could cause issues with Othent is re-instantiated on the same tab.
        this.othent.startTabSynching();
      }
    } catch (err) {
      throw new Error(
        `[Arweave Wallet Kit] ${(err instanceof Error && err.message) || err}`,
      );
    }

    return this.othent;
  }

  /**
   * Advanced function to override the default API ID
   * Othent uses.
   */

  public async isAvailable() {
    try {
      return !!this.othentInstance();
    } catch {
      return false;
    }
  }

  public async connect(
    permissions: PermissionType[],
    appInfo?: AppInfo,
    gateway?: GatewayConfig,
  ) {
    const othent = this.othentInstance();

    if (permissions) {
      console.warn(
        "[Arweave Wallet Kit] Othent implicitly requires all permissions. Your `permissions` parameter will be ignored.",
      );
    }

    return othent
      .connect(
        undefined,
        appInfo
          ? ({ ...othent.appInfo, ...appInfo } as OthentAppInfo)
          : undefined,
        gateway,
      )
      .then(() => undefined);
  }

  public async disconnect() {
    return this.othentInstance().disconnect();
  }

  public decrypt(
    data: BufferSource,
    options: RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
  ): Promise<Uint8Array> {
    if (options) {
      console.warn(
        "[Arweave Wallet Kit] Othent does not support `decrypt()` options",
      );
    }

    return this.othentInstance().decrypt(data);
  }

  public async dispatch(transaction: Transaction): Promise<DispatchResult> {
    return this.othentInstance().dispatch(transaction);
  }

  public signDataItem(p: ArconnectDataItem): Promise<ArrayBuffer> {
    return this.othentInstance().signDataItem(p) as Promise<ArrayBuffer>;
  }

  public encrypt(
    data: BufferSource,
    options: RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams,
  ): Promise<Uint8Array> {
    if (options) {
      console.warn(
        "[Arweave Wallet Kit] Othent does not support `encrypt()` options",
      );
    }

    return this.othentInstance().encrypt(data);
  }

  public async getPermissions() {
    const othent = this.othentInstance();

    return othent.getSyncUserDetails()
      ? othent.getPermissions()
      : Promise.resolve([]);
  }

  public async getActiveAddress() {
    return this.othentInstance().getActiveAddress();
  }

  public async getAllAddresses() {
    return this.othentInstance().getAllAddresses();
  }

  public async addToken(id: string): Promise<void> {
    throw new Error("Not implemented: " + id);
  }

  public getArweaveConfig(): Promise<GatewayConfig> {
    return this.othentInstance().getArweaveConfig();
  }

  public async getActivePublicKey() {
    return this.othentInstance().getActivePublicKey();
  }

  public async getWalletNames() {
    return this.othentInstance().getWalletNames();
  }

  public async sign(transaction: Transaction, options?: SignatureOptions) {
    if (options) {
      console.warn(
        "[Arweave Wallet Kit] Othent does not support transaction signature options",
      );
    }

    return this.othentInstance().sign(transaction);
  }

  public async userDetails() {
    return this.othentInstance().getUserDetails();
  }

  public addAddressEvent(listener: ListenerFunction) {
    this.addressListeners.push(listener);

    // placeholder function
    return listener as any;
  }

  public removeAddressEvent(
    listener: (e: CustomEvent<{ address: string }>) => void,
  ) {
    this.addressListeners.splice(
      this.addressListeners.indexOf(listener as any),
      1,
    );
  }

  public signature(
    data: Uint8Array,
    options: AlgorithmIdentifier | RsaPssParams | EcdsaParams,
  ): Promise<Uint8Array> {
    if (options) {
      console.warn(
        "[Arweave Wallet Kit] Othent does not support `signature()` options",
      );
    }

    return this.othentInstance().signature(data);
  }
  public async createDataItemSigner(): Promise<AoSigner> {
    const othent = this.othentInstance();
    return async function (item: ArconnectDataItem) {
      const res = await othent.signDataItem(item);
      const ArconnectDataItem = new DataItem(Buffer.from(res));
      return {
        id: ArconnectDataItem.id,
        raw: ArconnectDataItem.getRaw() as unknown as ArrayBufferLike,
      };
    };
  }
}

type ListenerFunction = (address: string) => void;
